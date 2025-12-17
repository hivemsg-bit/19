import React, { useState } from 'react';
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
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [checkoutPlan, setCheckoutPlan] = useState<any>(null);

  // State for Admin Callback Requests
  const [callbackRequests, setCallbackRequests] = useState([
    { id: 101, name: "Rohan Gupta", mobile: "9876543210", course: "CA Inter", date: "24 Oct", status: "Pending" },
    { id: 102, name: "Sriya Patel", mobile: "9988776655", course: "CA Final", date: "23 Oct", status: "Called" }
  ]);

  const openAuth = () => setAuthOpen(true);
  const closeAuth = () => setAuthOpen(false);

  const handleLoginSuccess = (role: UserRole) => {
    setUserRole(role);
    setAuthOpen(false);
    window.scrollTo(0, 0);
  };

  const handleLogout = () => {
    setUserRole(null);
    setCheckoutPlan(null);
    window.scrollTo(0, 0);
  };

  const handleBuyNow = (plan: any) => {
    setCheckoutPlan(plan);
    window.scrollTo(0, 0);
  };

  const handleCheckoutSuccess = () => {
     if (!userRole) {
        setUserRole('student');
     }
     setCheckoutPlan(null);
     window.scrollTo(0, 0);
  };

  // Handler for Hero Form Submission
  const handleCallbackRequest = (data: any) => {
    const newRequest = {
      id: Date.now(),
      ...data,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }),
      status: "Pending"
    };
    setCallbackRequests(prev => [newRequest, ...prev]);
  };

  // CHECKOUT FLOW (Global)
  if (checkoutPlan) {
     return (
        <Checkout 
            plan={checkoutPlan} 
            onBack={() => setCheckoutPlan(null)} 
            onSuccess={handleCheckoutSuccess}
            user={userRole === 'student' ? { name: "Demo Student", email: "demo@student.com", mobile: "9999999999" } : undefined}
        />
     );
  }

  // 1. If Admin Logged In
  if (userRole === 'admin') {
    return <AdminDashboard onLogout={handleLogout} callbackRequests={callbackRequests} />;
  }

  // 2. If Student Logged In
  if (userRole === 'student') {
    return <StudentDashboard onLogout={handleLogout} onBuyPlan={handleBuyNow} />;
  }

  // 3. Landing Page (Public)
  return (
    <div className="App">
      <Layout onOpenAuth={openAuth}>
        <Hero onOpenAuth={openAuth} onRequestCallback={handleCallbackRequest} />
        <TestSeries onBuyNow={handleBuyNow} />
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
        onClose={closeAuth} 
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
};

export default App;