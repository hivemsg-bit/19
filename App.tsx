
import React, { useState, useEffect, Suspense, lazy } from 'react';
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
import { Process } from './components/Process';
import { CopyChecker } from './components/CopyChecker';
import { AuthModal } from './components/AuthModal';
import { FAQ } from './components/FAQ';

// Lazy load heavy components for performance
const NewsAndVideo = lazy(() => import('./components/NewsAndVideo').then(m => ({ default: m.NewsAndVideo })));
const Mentors = lazy(() => import('./components/Mentors').then(m => ({ default: m.Mentors })));
const Testimonials = lazy(() => import('./components/Testimonials').then(m => ({ default: m.Testimonials })));
const StudentDashboard = lazy(() => import('./components/StudentDashboard').then(m => ({ default: m.StudentDashboard })));
const AdminDashboard = lazy(() => import('./components/AdminDashboard').then(m => ({ default: m.AdminDashboard })));
const TeacherDashboard = lazy(() => import('./components/TeacherDashboard').then(m => ({ default: m.TeacherDashboard })));
const Checkout = lazy(() => import('./components/Checkout').then(m => ({ default: m.Checkout })));

type UserRole = 'student' | 'admin' | 'teacher' | null;

const SectionLoader = () => (
  <div className="py-20 flex justify-center items-center">
    <div className="w-8 h-8 border-4 border-brand-primary border-t-transparent rounded-full animate-spin"></div>
  </div>
);

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
    <Suspense fallback={<SectionLoader />}>
      <Checkout plan={checkoutPlan} onBack={() => setCheckoutPlan(null)} onSuccess={() => setCheckoutPlan(null)} user={currentUser ? { name: currentUser.displayName, email: currentUser.email } : undefined} />
    </Suspense>
  );

  if (userRole === 'admin') return (
    <Suspense fallback={<SectionLoader />}>
      <AdminDashboard onLogout={handleLogout} callbackRequests={callbackRequests} allSharedTests={allTests} onUpdateTest={handleUpdateTest} />
    </Suspense>
  );

  if (userRole === 'teacher') return (
    <Suspense fallback={<SectionLoader />}>
      <TeacherDashboard onLogout={handleLogout} tests={allTests.filter(t => t.assignedToId === currentUser?.uid)} onUpdateTest={handleUpdateTest} />
    </Suspense>
  );

  if (userRole === 'student') {
    const studentTests = allTests.filter(t => t.studentId === currentUser?.uid);
    return (
      <Suspense fallback={<SectionLoader />}>
        <StudentDashboard onLogout={handleLogout} tests={studentTests} onUpdateTest={handleUpdateTest} onNewSubmission={handleNewSubmission} />
      </Suspense>
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
        <Suspense fallback={<SectionLoader />}>
          <Mentors />
          <NewsAndVideo /> 
          <Testimonials />
        </Suspense>
        <FAQ />
      </Layout>
      <AuthModal isOpen={isAuthOpen} onClose={() => setAuthOpen(false)} onLoginSuccess={(role) => setUserRole(role)} />
    </div>
  );
};

export default App;
