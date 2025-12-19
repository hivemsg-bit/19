
import React, { useState } from 'react';
import { ArrowLeft, ShieldCheck, Smartphone, Lock, CheckCircle, Copy, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from './Button';
import { doc, setDoc, serverTimestamp, addDoc, collection } from 'firebase/firestore';
import { db, auth } from '../lib/firebase';

interface CheckoutProps {
  plan: any;
  onBack: () => void;
  onSuccess: () => void;
  user?: any; 
}

export const Checkout: React.FC<CheckoutProps> = ({ plan, onBack, onSuccess, user }) => {
  const [step, setStep] = useState<'details' | 'payment' | 'success'>('details');
  const [utr, setUtr] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const basePrice = parseInt(plan.price.replace(/[^0-9]/g, '')) || 999;
  const gst = Math.round(basePrice * 0.18);
  const total = basePrice + gst;

  const handleManualPaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (utr.length < 6) {
        alert("Please enter a valid Transaction ID / UTR number.");
        return;
    }
    setIsSubmitting(true);
    
    try {
        const currentUser = auth.currentUser;
        if (currentUser) {
            // Add a record to a new 'payments' collection for admin to verify
            await addDoc(collection(db, "payments"), {
                studentId: currentUser.uid,
                studentName: currentUser.displayName || user?.name || "Unknown",
                studentEmail: currentUser.email,
                planId: plan.id,
                planTitle: plan.title,
                amount: total,
                utr: utr,
                status: 'pending',
                createdAt: serverTimestamp()
            });
        }
        
        setStep('success');
    } catch (e) {
        console.error(e);
        alert("Something went wrong. Please try again.");
    } finally {
        setIsSubmitting(false);
    }
  };

  const copyUpiId = () => {
    navigator.clipboard.writeText("caexam@upi");
    alert("UPI ID Copied!");
  };

  if (step === 'success') {
    return (
      <div className="min-h-screen bg-brand-cream flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-3xl shadow-2xl text-center max-w-md w-full animate-fade-up border border-brand-primary/20">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
            <CheckCircle size={40} />
          </div>
          <h2 className="text-2xl font-display font-black text-slate-900 mb-2">Request Submitted!</h2>
          <p className="text-slate-500 text-sm mb-8">
            Humne aapka payment request receive kar liya hai. <br/>
            Admin verification ke baad (15-30 mins) aapki <span className="font-bold text-slate-800">{plan.title}</span> active ho jayegi.
          </p>
          <div className="bg-slate-50 rounded-2xl p-4 mb-8 border border-slate-100 text-xs">
             <div className="flex justify-between mb-2">
                <span className="text-slate-500 uppercase font-bold tracking-widest">Reference UTR</span>
                <span className="font-mono font-bold text-brand-primary">{utr}</span>
             </div>
             <div className="flex justify-between">
                <span className="text-slate-500 uppercase font-bold tracking-widest">Amount Paid</span>
                <span className="font-bold text-slate-900">₹{total.toLocaleString()}</span>
             </div>
          </div>
          <Button fullWidth onClick={onSuccess} className="py-4 shadow-xl">Back to Dashboard</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-10">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
             <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors">
               <ArrowLeft size={20} />
             </button>
             <h1 className="text-lg font-bold text-slate-800 tracking-tight">Checkout Series</h1>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-green-700 bg-green-50 px-4 py-1.5 rounded-full border border-green-100">
             <Lock size={12} /> Secure Checkout
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
           
           {/* Left Section */}
           <div className="flex-1 space-y-6">
              
              {step === 'details' ? (
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 animate-fade-up">
                    <h2 className="text-xl font-display font-black text-slate-800 mb-6 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-brand-dark text-white flex items-center justify-center text-xs">1</div>
                        Student Details
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Full Name</label>
                            <input type="text" readOnly defaultValue={user?.name || "Demo Student"} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold text-slate-700" />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Contact Number</label>
                            <input type="text" readOnly defaultValue={user?.mobile || "Not Linked"} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold text-slate-700" />
                        </div>
                        <div className="space-y-1.5 md:col-span-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Email Address</label>
                            <input type="email" readOnly defaultValue={user?.email || "demo@student.com"} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold text-slate-700" />
                        </div>
                    </div>
                    <Button fullWidth className="mt-8 py-4 shadow-lg" onClick={() => setStep('payment')}>Proceed to Payment <ArrowLeft className="ml-2 rotate-180" size={18} /></Button>
                </div>
              ) : (
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 animate-fade-up">
                    <h2 className="text-xl font-display font-black text-slate-800 mb-6 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-brand-dark text-white flex items-center justify-center text-xs">2</div>
                        Pay via UPI QR
                    </h2>

                    <div className="bg-brand-cream/50 rounded-2xl p-6 border border-brand-primary/20 flex flex-col items-center mb-8">
                        <div className="w-48 h-48 bg-white p-3 rounded-2xl border border-slate-200 shadow-inner mb-4">
                            {/* Static Placeholder for QR Code */}
                            <img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=caexam@upi%26pn=CA%20Exam%20Online%20Test%20Series%26am=${total}%26cu=INR`} alt="Payment QR" className="w-full h-full" />
                        </div>
                        <div className="text-center">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">UPI ID: caexam@upi</p>
                            <button onClick={copyUpiId} className="text-brand-primary font-bold text-xs flex items-center gap-1 mx-auto hover:underline"><Copy size={12} /> Copy ID</button>
                        </div>
                    </div>

                    <form onSubmit={handleManualPaymentSubmit} className="space-y-6">
                        <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex gap-3">
                            <AlertCircle size={20} className="text-blue-600 shrink-0" />
                            <p className="text-[11px] text-blue-700 font-medium">Payment karne ke baad, niche Transaction ID (UTR) jarur enter karein verification ke liye.</p>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Transaction ID / UTR Number</label>
                            <input 
                                type="text" 
                                required 
                                placeholder="e.g. 412388123456" 
                                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:ring-2 focus:ring-brand-primary/20"
                                value={utr}
                                onChange={(e) => setUtr(e.target.value)}
                            />
                        </div>
                        <Button type="submit" fullWidth disabled={isSubmitting} className="py-4 shadow-xl">
                            {isSubmitting ? <Loader2 size={20} className="animate-spin" /> : "Verify & Complete Enrollment"}
                        </Button>
                    </form>
                </div>
              )}
           </div>

           {/* Right Summary Section */}
           <div className="lg:w-80">
              <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden sticky top-24">
                 <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                    <h3 className="font-display font-black text-slate-800 text-sm uppercase tracking-widest">Order Summary</h3>
                 </div>
                 <div className="p-6 space-y-4">
                    <div className="flex justify-between items-start gap-4">
                        <div>
                            <div className="font-black text-slate-800 text-sm leading-tight">{plan.title}</div>
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{plan.tag}</div>
                        </div>
                        <div className="font-black text-slate-800">₹{basePrice.toLocaleString()}</div>
                    </div>
                    <div className="h-px bg-slate-100 my-2"></div>
                    <div className="flex justify-between text-[11px] font-bold">
                        <span className="text-slate-400 uppercase">Subtotal</span>
                        <span className="text-slate-700">₹{basePrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-[11px] font-bold">
                        <span className="text-slate-400 uppercase">GST (18%)</span>
                        <span className="text-slate-700">₹{gst.toLocaleString()}</span>
                    </div>
                    <div className="h-px bg-slate-100 my-2"></div>
                    <div className="flex justify-between items-end">
                        <span className="font-black text-slate-900 text-sm uppercase tracking-widest">Total Pay</span>
                        <span className="font-display font-black text-3xl text-brand-primary tracking-tighter">₹{total.toLocaleString()}</span>
                    </div>
                    
                    <div className="pt-4 space-y-2">
                        <div className="flex items-center gap-2 text-[9px] font-bold text-slate-400 uppercase">
                            <ShieldCheck size={14} className="text-green-500" /> 100% Satisfaction Guarantee
                        </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </main>
    </div>
  );
};
