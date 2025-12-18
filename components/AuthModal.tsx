import React, { useState } from 'react';
import { X, Mail, Lock, User, Phone, ArrowRight, Facebook, ShieldCheck, KeyRound } from 'lucide-react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  updateProfile 
} from 'firebase/auth';
import { auth } from '../lib/firebase';
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
  const [isAdmin, setIsAdmin] = useState(false);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  
  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
        if (mode === 'login') {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const role = userCredential.user.email === 'admin@caexam.online' ? 'admin' : 'student';
            if (onLoginSuccess) onLoginSuccess(role);
        } else {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredential.user, { displayName: name });
            if (onLoginSuccess) onLoginSuccess('student');
        }
        onClose();
    } catch (err: any) {
        console.error(err);
        setError(err.message || 'Authentication failed. Please check your credentials.');
    } finally {
        setIsLoading(false);
    }
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
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose}></div>

      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col md:flex-row animate-fade-up">
        <button onClick={onClose} className="md:hidden absolute top-4 right-4 p-2 bg-slate-100 rounded-full text-slate-500 z-20">
          <X size={20} />
        </button>

        <div className={`hidden md:flex w-5/12 relative flex-col justify-between p-10 text-white overflow-hidden transition-colors duration-500 ${isAdmin ? 'bg-slate-900' : 'bg-brand-dark'}`}>
           <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent to-black/30 z-0"></div>
           <div className="relative z-10">
              <span className={`font-bold tracking-wider uppercase text-xs mb-2 block ${isAdmin ? 'text-red-400' : 'text-brand-orange'}`}>
                {isAdmin ? 'Admin Portal' : (mode === 'login' ? 'Welcome Back' : 'Join Us')}
              </span>
              <h2 className="text-4xl font-display font-bold mb-4">
                 {isAdmin ? 'Control Center.' : (mode === 'login' ? 'Continue your Journey.' : 'Start your Success Story.')}
              </h2>
              
              <div className="mt-8 bg-white/10 rounded-xl p-4 backdrop-blur-md border border-white/10">
                  <div className="text-xs font-bold text-white/70 mb-2 flex items-center gap-2">
                      <KeyRound size={12} /> Quick Access Note
                  </div>
                  <p className="text-[10px] text-slate-300">New users should 'Sign Up' first. Admin account is restricted.</p>
              </div>
           </div>
        </div>

        <div className="w-full md:w-7/12 p-8 md:p-12 bg-white relative">
           <button onClick={onClose} className="hidden md:block absolute top-6 right-6 p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors">
             <X size={24} />
           </button>

           <div className="flex justify-between border-b border-slate-100 mb-8">
              <div className="flex gap-6">
                <button onClick={() => setMode('login')} className={`pb-3 text-sm font-bold transition-all ${mode === 'login' ? 'text-brand-orange border-b-2 border-brand-orange' : 'text-slate-400'}`}>Log In</button>
                {!isAdmin && <button onClick={() => setMode('signup')} className={`pb-3 text-sm font-bold transition-all ${mode === 'signup' ? 'text-brand-orange border-b-2 border-brand-orange' : 'text-slate-400'}`}>Sign Up</button>}
              </div>
              <button onClick={() => setIsAdmin(!isAdmin)} className={`text-xs font-bold flex items-center gap-1 ${isAdmin ? 'text-red-500' : 'text-slate-400'}`}>
                {isAdmin ? <ShieldCheck size={14} /> : <User size={14} />} {isAdmin ? 'Admin Mode' : 'Admin Login'}
              </button>
           </div>

           {error && <div className="mb-4 p-3 bg-red-50 border border-red-100 text-red-600 text-xs rounded-lg">{error}</div>}

           <form className="space-y-4" onSubmit={handleSubmit}>
              {mode === 'signup' && (
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 text-slate-400" size={16} />
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm" required />
                  </div>
                </div>
              )}

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 text-slate-400" size={16} />
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@example.com" className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm" required />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 text-slate-400" size={16} />
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm" required />
                </div>
              </div>

              <Button type="submit" fullWidth size="md" className="mt-2 font-bold shadow-lg" disabled={isLoading}>
                {isLoading ? 'Processing...' : (mode === 'login' ? 'Log In' : 'Create Account')}
                {!isLoading && <ArrowRight size={16} className="ml-2" />}
              </Button>
           </form>

           <div className="mt-6 text-center text-sm text-slate-500">
              {isAdmin ? (
                  <button onClick={() => setIsAdmin(false)} className="hover:underline">Back to Student Login</button>
              ) : (
                  <button onClick={() => setMode(mode === 'login' ? 'signup' : 'login')} className="text-brand-primary font-bold hover:underline">
                    {mode === 'login' ? 'Need an account? Sign Up' : 'Already have an account? Log In'}
                  </button>
              )}
           </div>
        </div>
      </div>
    </div>
  );
};