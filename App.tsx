import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { collection, query, onSnapshot, addDoc, updateDoc, doc, serverTimestamp } from 'firebase/firestore';
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
import { Checkout } from './components/Checkout';

type UserRole = 'student' | 'admin' | null;

const App: React.FC = () => {
  const [isAuthOpen, setAuthOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [checkoutPlan, setCheckoutPlan] = useState<any>(null);
  const [callbackRequests, setCallbackRequests] = useState<any[]>([]);
  const [allTests, setAllTests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen for Auth Changes
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user) {
        // Simple Logic: If email is admin, set role admin
        setUserRole(user.email === 'admin@caexam.online' ? 'admin' : 'student');
      } else {
        setUserRole(null);
      }
      setLoading(false);
    });

    // Listen for Firestore Leads (Real-time)
    const qLeads = query(collection(db, "leads"));
    const unsubscribeLeads = onSnapshot(qLeads, (snapshot) => {
      const leads = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCallbackRequests(leads);
    });

    // Listen for Shared Tests
    const qTests = query(collection(db, "tests"));
    const unsubscribeTests = onSnapshot(qTests, (snapshot) => {
      const tests = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAllTests(tests);
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

  const handleCallbackRequest = async (data: any) => {
    try {
      await addDoc(collection(db, "leads"), {
        ...data,
        status: 'Pending',
        createdAt: serverTimestamp()
      });
      alert("Request Sent! We will call you soon.");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const handleUpdateTest = async (updatedTest: any) => {
    try {
      const testRef = doc(db, "tests", updatedTest.id);
      await updateDoc(testRef, updatedTest);
    } catch (e) {
      console.error("Error updating test: ", e);
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-brand-cream">
        <div className="flex flex-col items-center gap-4">
           <div className="w-12 h-12 border-4 border-brand-primary border-t-transparent rounded-full animate-spin"></div>
           <p className="font-bold text-slate-600">Connecting to Cloud...</p>
        </div>
      </div>
    );
  }

  if (checkoutPlan) {
     return (
        <Checkout 
            plan={checkoutPlan} 
            onBack={() => setCheckoutPlan(null)} 
            onSuccess={() => { setCheckoutPlan(null); }}
            user={currentUser ? { name: currentUser.displayName || "Student", email: currentUser.email } : undefined}
        />
     );
  }

  if (userRole === 'admin') {
    return <AdminDashboard onLogout={handleLogout} callbackRequests={callbackRequests} allSharedTests={allTests} onUpdateTest={handleUpdateTest} />;
  }

  if (userRole === 'student') {
    return <StudentDashboard onLogout={handleLogout} tests={allTests} onUpdateTest={handleUpdateTest} />;
  }

  return (
    <div className="App">
      <Layout onOpenAuth={() => setAuthOpen(true)}>
        <Hero onOpenAuth={() => setAuthOpen(true)} onRequestCallback={handleCallbackRequest} />
        <TestSeries onBuyNow={(plan) => setCheckoutPlan(plan)} />
        <Benefits />
        <Features />
        <Process />
        <CopyChecker />
        <Mentors />
        <NewsAndVideo /> 
        <Testimonials />
      </Layout>

      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setAuthOpen(false)} 
        onLoginSuccess={(role) => setUserRole(role)}
      />
    </div>
  );
};

export default App;