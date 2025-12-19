
import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { 
  collection, 
  query, 
  onSnapshot, 
  addDoc, 
  updateDoc, 
  doc, 
  serverTimestamp, 
  setDoc,
  getDoc
} from 'firebase/firestore';
import { auth, db } from './lib/firebase';
import { Layout } from './components/Layout';
import { Hero } from './components/Hero';
import { Benefits } from './components/Benefits';
import { Features } from './components/Features';
import { TestSeries } from './components/TestSeries';
import { NewsAndVideo } from './components/NewsAndVideo';
import { Process } from './components/Process';
import { CopyChecker } from './components/CopyChecker';
import { Mentors } from './components/Mentors';
import { Testimonials } from './components/Testimonials';
import { AuthModal } from './components/AuthModal';
import { StudentDashboard } from './components/StudentDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { TeacherDashboard } from './components/TeacherDashboard';
import { Checkout } from './components/Checkout';

type UserRole = 'student' | 'admin' | 'teacher' | null;

const App: React.FC = () => {
  const [isAuthOpen, setAuthOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [checkoutPlan, setCheckoutPlan] = useState<any>(null);
  const [callbackRequests, setCallbackRequests] = useState<any[]>([]);
  const [allTests, setAllTests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        if (user.email === 'admin@caexam.online') {
          setUserRole('admin');
        } else {
          // Check role from Firestore
          const userDoc = await getDoc(doc(db, "users", user.uid));
          const data = userDoc.data();
          if (data?.role === 'teacher') {
            setUserRole('teacher');
          } else {
            setUserRole('student');
            await setDoc(doc(db, "users", user.uid), {
              name: user.displayName,
              email: user.email,
              lastLogin: serverTimestamp(),
              role: 'student'
            }, { merge: true });
          }
        }
      } else {
        setUserRole(null);
      }
      setLoading(false);
    });

    const qLeads = query(collection(db, "leads"));
    const unsubscribeLeads = onSnapshot(qLeads, (snapshot) => {
      setCallbackRequests(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    const qTests = query(collection(db, "tests"));
    const unsubscribeTests = onSnapshot(qTests, (snapshot) => {
      setAllTests(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    return () => {
      unsubscribeAuth();
      unsubscribeLeads();
      unsubscribeTests();
    };
  }, []);

  const handleLogout = async () => {
    await auth.signOut();
    setUserRole(null);
    setCheckoutPlan(null);
    window.scrollTo(0, 0);
  };

  const handleUpdateTest = async (updatedTest: any) => {
    try {
      const testRef = doc(db, "tests", updatedTest.id);
      await updateDoc(testRef, {
          ...updatedTest,
          updatedAt: serverTimestamp()
      });
    } catch (e) { console.error(e); }
  };

  const handleNewSubmission = async (testData: any) => {
      try {
          await addDoc(collection(db, "tests"), {
              ...testData,
              studentId: currentUser?.uid,
              studentName: currentUser?.displayName,
              studentEmail: currentUser?.email,
              status: 'submitted',
              assignmentStatus: 'unassigned',
              createdAt: serverTimestamp()
          });
      } catch (e) { console.error(e); }
  }

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-brand-cream">
      <div className="flex flex-col items-center gap-4">
         <div className="w-12 h-12 border-4 border-brand-primary border-t-transparent rounded-full animate-spin"></div>
         <p className="font-bold text-slate-600">CA EXAM ONLINE - Loading...</p>
      </div>
    </div>
  );

  if (checkoutPlan) return (
    <Checkout plan={checkoutPlan} onBack={() => setCheckoutPlan(null)} onSuccess={() => setCheckoutPlan(null)} user={currentUser ? { name: currentUser.displayName, email: currentUser.email } : undefined} />
  );

  if (userRole === 'admin') return (
    <AdminDashboard onLogout={handleLogout} callbackRequests={callbackRequests} allSharedTests={allTests} onUpdateTest={handleUpdateTest} />
  );

  if (userRole === 'teacher') return (
    <TeacherDashboard onLogout={handleLogout} tests={allTests.filter(t => t.assignedToId === currentUser?.uid)} onUpdateTest={handleUpdateTest} />
  );

  if (userRole === 'student') {
    const studentTests = allTests.filter(t => t.studentId === currentUser?.uid);
    return (
      <StudentDashboard onLogout={handleLogout} tests={studentTests} onUpdateTest={handleUpdateTest} onNewSubmission={handleNewSubmission} />
    );
  }

  return (
    <div className="App">
      <Layout onOpenAuth={() => setAuthOpen(true)}>
        <Hero onOpenAuth={() => setAuthOpen(true)} onRequestCallback={async (data) => {
          await addDoc(collection(db, "leads"), { ...data, status: 'Pending', createdAt: serverTimestamp() });
          alert("Success! Hum aapko jald hi call karenge.");
        }} />
        <TestSeries onBuyNow={(plan) => setCheckoutPlan(plan)} />
        <Benefits />
        <Features />
        <Process />
        <CopyChecker />
        <Mentors />
        <NewsAndVideo /> 
        <Testimonials />
      </Layout>
      <AuthModal isOpen={isAuthOpen} onClose={() => setAuthOpen(false)} onLoginSuccess={(role) => setUserRole(role)} />
    </div>
  );
};

export default App;
