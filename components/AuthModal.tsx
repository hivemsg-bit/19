import React, { useState } from 'react';
import { X, Mail, Lock, User, Phone, ArrowRight, Facebook, ShieldCheck, KeyRound } from 'lucide-react';
import { Button } from './Button';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess?: (role: 'student' | 'admin') => void;
  initialMode?: 'login' | 'signup';
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLoginSuccess, initialMode = 'login' }) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [isLoading, setIsLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); // Toggle for Admin Login
  
  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    // Simulate API call and Validation
    setTimeout(() => {
        setIsLoading(false);
        
        // Validation Logic
        if (mode === 'login') {
            if (isAdmin) {
                if (email === 'admin@caexam.online' && password === 'admin123') {
                    if (onLoginSuccess) onLoginSuccess('admin');
                } else {
                    setError('Invalid Admin Password. Try: admin123');
                }
            } else {
                // Check for Demo Student
                if (email === 'demo@student.com' && password === 'demo123') {
                    if (onLoginSuccess) onLoginSuccess('student');
                } else {
                    // Allow generic login for visitors who sign up, but specific check for demo
                    if (email && password) {
                         if (onLoginSuccess) onLoginSuccess('student');
                    } else {
                        setError('Please enter valid credentials.');
                    }
                }
            }
        } else {
            // Sign Up Flow (Always Success for Demo)
            if (onLoginSuccess) onLoginSuccess('student');
        }
    }, 800);
  };

  const fillDemoCredentials = (role: 'student' | 'admin') => {
      setError('');
      if (role === 'admin') {
          setIsAdmin(true);
          setMode('login');
          setEmail('admin@caexam.online');
          setPassword('admin123');
      } else {
          setIsAdmin(false);
          setMode('login');
          setEmail('demo@student.com');
          setPassword('demo123');
      }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop with Blur */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Card */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col md:flex-row animate-fade-up">
        
        {/* Close Button (Mobile Only) */}
        <button 
          onClick={onClose}
          className="md:hidden absolute top-4 right-4 p-2 bg-slate-100 rounded-full text-slate-500 z-20"
        >
          <X size={20} />
        </button>

        {/* LEFT SIDE: Visuals (Hidden on Mobile) */}
        <div className={`hidden md:flex w-5/12 relative flex-col justify-between p-10 text-white overflow-hidden transition-colors duration-500 ${isAdmin ? 'bg-slate-900' : 'bg-brand-dark'}`}>
           {/* Background Decor */}
           <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent to-black/30 z-0"></div>
           <div className="absolute -top-20 -left-20 w-60 h-60 bg-white/10 rounded-full blur-3xl"></div>
           
           <div className="relative z-10">
              <span className={`font-bold tracking-wider uppercase text-xs mb-2 block ${isAdmin ? 'text-red-400' : 'text-brand-orange'}`}>
                {isAdmin ? 'Admin Portal' : (mode === 'login' ? 'Welcome Back' : 'Join Us')}
              </span>
              <h2 className="text-4xl font-display font-bold mb-4">
                 {isAdmin ? 'Control Center.' : (mode === 'login' ? 'Continue your Journey.' : 'Start your Success Story.')}
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                 {isAdmin 
                    ? 'Manage students, upload tests, and evaluate copies from one place.'
                    : (mode === 'login' ? 'Access your dashboard, mock tests, and performance analytics.' : 'Join 10,000+ CA students who are practicing their way to a rank.')}
              </p>
              
              {/* Quick Demo Login Helper */}
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur-md border border-white/10">
                  <div className="text-xs font-bold text-white/70 mb-2 flex items-center gap-2">
                      <KeyRound size={12} /> Quick Demo Access
                  </div>
                  <div className="flex flex-col gap-2">
                      <button 
                        onClick={() => fillDemoCredentials('student')}
                        className="text-left text-xs bg-white/10 hover:bg-white/20 p-2 rounded transition-colors flex justify-between items-center group"
                      >
                          <span><span className="font-bold text-brand-orange">Student:</span> demo@student.com</span>
                          <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                      </button>
                      <button 
                        onClick={() => fillDemoCredentials('admin')}
                        className="text-left text-xs bg-white/10 hover:bg-white/20 p-2 rounded transition-colors flex justify-between items-center group"
                      >
                          <span><span className="font-bold text-red-400">Admin:</span> admin@caexam.online</span>
                          <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                      </button>
                  </div>
              </div>
           </div>
        </div>

        {/* RIGHT SIDE: Form */}
        <div className="w-full md:w-7/12 p-8 md:p-12 bg-white relative">
           {/* Close Button (Desktop) */}
           <button 
             onClick={onClose}
             className="hidden md:block absolute top-6 right-6 p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors"
           >
             <X size={24} />
           </button>

           {/* Tabs */}
           <div className="flex justify-between border-b border-slate-100 mb-8">
              <div className="flex gap-6">
                <button 
                    onClick={() => { setMode('login'); setError(''); }}
                    className={`pb-3 text-sm font-bold transition-all ${
                    mode === 'login' 
                        ? (isAdmin ? 'text-red-500 border-b-2 border-red-500' : 'text-brand-orange border-b-2 border-brand-orange') 
                        : 'text-slate-400 hover:text-slate-600'
                    }`}
                >
                    Log In
                </button>
                {!isAdmin && (
                    <button 
                        onClick={() => { setMode('signup'); setError(''); }}
                        className={`pb-3 text-sm font-bold transition-all ${
                        mode === 'signup' 
                            ? 'text-brand-orange border-b-2 border-brand-orange' 
                            : 'text-slate-400 hover:text-slate-600'
                        }`}
                    >
                        Sign Up
                    </button>
                )}
              </div>

              {/* Toggle Admin */}
              <button 
                onClick={() => { setIsAdmin(!isAdmin); setEmail(''); setPassword(''); setError(''); }} 
                className={`text-xs font-bold flex items-center gap-1 mb-2 ${isAdmin ? 'text-red-500' : 'text-slate-400 hover:text-slate-600'}`}
              >
                {isAdmin ? <ShieldCheck size={14} /> : <User size={14} />}
                {isAdmin ? 'Admin Mode' : 'Admin Login'}
              </button>
           </div>

           {/* Error Message */}
           {error && (
               <div className="mb-4 p-3 bg-red-50 border border-red-100 text-red-600 text-xs rounded-lg flex items-center gap-2">
                   <div className="w-1 h-1 bg-red-500 rounded-full"></div> {error}
               </div>
           )}

           {/* Form Content */}
           <form className="space-y-4" onSubmit={handleSubmit}>
              
              {mode === 'signup' && !isAdmin && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 text-slate-400" size={16} />
                      <input type="text" placeholder="John Doe" className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-brand-primary" required={mode === 'signup'} />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Mobile</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 text-slate-400" size={16} />
                      <input type="tel" placeholder="98765..." className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-brand-primary" />
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 text-slate-400" size={16} />
                  <input 
                    type="email" 
                    placeholder={isAdmin ? "admin@caexam.online" : "student@example.com"} 
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-brand-primary" 
                    required 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 text-slate-400" size={16} />
                  <input 
                    type="password" 
                    placeholder="••••••••" 
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-brand-primary" 
                    required 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {/* Mobile Quick Fill Helper */}
                <div className="md:hidden flex gap-2 mt-2 overflow-x-auto pb-1">
                    <button type="button" onClick={() => fillDemoCredentials('student')} className="text-[10px] bg-slate-100 px-2 py-1 rounded-full whitespace-nowrap text-brand-dark">Demo Student</button>
                    <button type="button" onClick={() => fillDemoCredentials('admin')} className="text-[10px] bg-red-50 px-2 py-1 rounded-full whitespace-nowrap text-red-600">Demo Admin</button>
                </div>
              </div>

              <Button 
                type="submit" 
                fullWidth 
                size="md" 
                className={`mt-2 font-bold shadow-lg text-white ${isAdmin ? 'bg-slate-900 hover:bg-slate-800 shadow-slate-900/20' : 'bg-brand-orange hover:bg-brand-orange/90 shadow-brand-orange/20'}`}
                disabled={isLoading}
              >
                {isLoading 
                  ? 'Verifying...' 
                  : (mode === 'login' ? (isAdmin ? 'Login as Admin' : 'Log In') : 'Create Account')
                } 
                {!isLoading && <ArrowRight size={16} className="ml-2" />}
              </Button>
           </form>

           {/* Social Login (Only for Students) */}
           {!isAdmin && (
               <div className="mt-8">
                  <div className="relative flex justify-center text-xs mb-4">
                     <div className="absolute inset-x-0 top-1/2 bg-slate-100 h-px"></div>
                     <span className="relative bg-white px-2 text-slate-400">Or continue with</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                     <button className="flex items-center justify-center gap-2 py-2.5 border border-slate-200 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">
                        <span className="font-serif">G</span> Google
                     </button>
                     <button className="flex items-center justify-center gap-2 py-2.5 border border-slate-200 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">
                        <Facebook size={16} className="text-blue-600" /> Facebook
                     </button>
                  </div>
               </div>
           )}

           {/* Footer Toggle */}
           <div className="mt-6 text-center text-sm text-slate-500">
              {isAdmin ? (
                  <button onClick={() => { setIsAdmin(false); setEmail(''); setPassword(''); }} className="text-slate-500 hover:underline">Back to Student Login</button>
              ) : (
                  <>
                    {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
                    <button 
                        onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                        className="text-brand-primary font-bold hover:underline"
                    >
                        {mode === 'login' ? 'Sign Up' : 'Log In'}
                    </button>
                  </>
              )}
           </div>
        </div>
      </div>
    </div>
  );
};