
import React, { useState } from 'react';
import { X, Mail, Lock, User, Phone, ArrowRight, Facebook, ShieldCheck, KeyRound, BookOpen } from 'lucide-react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  updateProfile 
} from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { Button } from './Button';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess?: (role: 'student' | 'admin' | 'teacher') => void;
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
            const user = userCredential.user;
            
            // Default role is student, check admin email or Firestore for teacher
            let role: 'student' | 'admin' | 'teacher' = 'student';
            if (user.email === 'admin@caexam.online') {
                role = 'admin';
            } else {
                const userDoc = await getDoc(doc(db, "users", user.uid));
                const data = userDoc.data();
                if (data?.role === 'teacher') role = 'teacher';
            }
            
            if (onLoginSuccess) onLoginSuccess(role);
        } else {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredential.user, { displayName: name });
            
            // New signups are students by default unless their email matches an authorized teacher entry
            // For simplicity in this demo, new signups are students.
            if (onLoginSuccess) onLoginSuccess('student');
        }
        onClose();
    } catch (err: any) {
        console.error("Auth Error:", err.code);
        if (err.code === 'auth/invalid-credential') {
            setError('Invalid email or password. Please try again.');
        } else if (err.code === 'auth/email-already-in-use') {
            setError('This email is already registered.');
        } else {
            setError('Authentication failed. Please try again.');
        }
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose}></div>

      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col md:flex-row animate-fade-up">
        <div className={`hidden md:flex w-5/12 relative flex-col justify-between p-10 text-white overflow-hidden transition-colors duration-500 ${isAdmin ? 'bg-slate-900' : 'bg-brand-dark'}`}>
           <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent to-black/30 z-0"></div>
           <div className="relative z-10">
              <span className={`font-bold tracking-wider uppercase text-xs mb-2 block ${isAdmin ? 'text-red-400' : 'text-brand-orange'}`}>
                {isAdmin ? 'Management' : (mode === 'login' ? 'Welcome Back' : 'Start Preparation')}
              </span>
              <h2 className="text-4xl font-display font-bold mb-4">
                 {isAdmin ? 'Exam Portal Access.' : (mode === 'login' ? 'Practice. Improve. Succeed.' : 'Your AIR Journey Starts.')}
              </h2>
              <div className="mt-8 flex items-center gap-3 text-white/60 text-xs">
                <ShieldCheck size={16} /> Certified Evaluation Platform
              </div>
           </div>
        </div>

        <div className="w-full md:w-7/12 p-8 md:p-12 bg-white relative">
           <button onClick={onClose} className="absolute top-6 right-6 p-2 hover:bg-slate-100 rounded-full text-slate-400">
             <X size={24} />
           </button>

           <div className="flex justify-between border-b border-slate-100 mb-8">
              <div className="flex gap-6">
                <button onClick={() => setMode('login')} className={`pb-3 text-sm font-bold transition-all ${mode === 'login' ? 'text-brand-orange border-b-2 border-brand-orange' : 'text-slate-400'}`}>Log In</button>
                {!isAdmin && <button onClick={() => setMode('signup')} className={`pb-3 text-sm font-bold transition-all ${mode === 'signup' ? 'text-brand-orange border-b-2 border-brand-orange' : 'text-slate-400'}`}>Sign Up</button>}
              </div>
              <button onClick={() => { setIsAdmin(!isAdmin); setMode('login'); }} className={`text-xs font-bold flex items-center gap-1 ${isAdmin ? 'text-red-500' : 'text-slate-400'}`}>
                {isAdmin ? <ShieldCheck size={14} /> : <User size={14} />} {isAdmin ? 'Admin/Faculty Mode' : 'Admin/Faculty Login'}
              </button>
           </div>

           {error && <div className="mb-4 p-3 bg-red-50 border border-red-100 text-red-600 text-xs rounded-lg animate-wiggle-slow">{error}</div>}

           <form className="space-y-4" onSubmit={handleSubmit}>
              {mode === 'signup' && (
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 text-slate-400" size={16} />
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm" required />
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
                  <p className="flex items-center justify-center gap-2"><BookOpen size={14} className="text-brand-orange" /> Faculty & Staff Login Only</p>
              ) : (
                  <button onClick={() => setMode(mode === 'login' ? 'signup' : 'login')} className="text-brand-primary font-bold hover:underline">
                    {mode === 'login' ? 'New Student? Sign Up' : 'Already registered? Log In'}
                  </button>
              )}
           </div>
        </div>
      </div>
    </div>
  );
};
