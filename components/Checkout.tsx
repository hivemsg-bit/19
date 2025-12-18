
import React, { useState } from 'react';
import { ArrowLeft, ShieldCheck, CreditCard, Lock, CheckCircle, Smartphone, Globe, AlertCircle } from 'lucide-react';
import { Button } from './Button';
import { doc, updateDoc, arrayUnion, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../lib/firebase';

interface CheckoutProps {
  plan: any;
  onBack: () => void;
  onSuccess: () => void;
  user?: any; 
}

export const Checkout: React.FC<CheckoutProps> = ({ plan, onBack, onSuccess, user }) => {
  const [step, setStep] = useState<'details' | 'payment' | 'processing' | 'success'>('details');
  const [paymentMethod, setPaymentMethod] = useState('upi');
  
  const basePrice = parseInt(plan.price.replace(/[^0-9]/g, '')) || 999;
  const gst = Math.round(basePrice * 0.18);
  const total = basePrice + gst;

  const handlePayment = async () => {
    setStep('processing');
    
    // In a real app, integrate Razorpay here. 
    // For now, we simulate success and save plan to user's profile
    try {
        const currentUser = auth.currentUser;
        if (currentUser) {
            const userRef = doc(db, "users", currentUser.uid);
            await updateDoc(userRef, {
                purchasedPlans: arrayUnion({
                    planId: plan.id,
                    title: plan.title,
                    purchasedAt: new Date().toISOString(),
                    level: plan.tag // e.g. "Best Seller"
                }),
                updatedAt: serverTimestamp()
            });
        }
        
        setTimeout(() => {
          setStep('success');
        }, 1500);
    } catch (e) {
        console.error(e);
        alert("Payment failed to sync with profile.");
        setStep('details');
    }
  };

  if (step === 'success') {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-3xl shadow-xl text-center max-w-md w-full animate-fade-up">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
            <CheckCircle size={40} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Payment Successful!</h2>
          <p className="text-slate-500 mb-8">
            You have successfully enrolled in <br/> <span className="font-bold text-slate-800">{plan.title}</span>.
          </p>
          <div className="bg-slate-50 rounded-xl p-4 mb-8 border border-slate-100 text-sm">
             <div className="flex justify-between mb-2">
                <span className="text-slate-500">Transaction ID</span>
                <span className="font-mono font-bold text-slate-700">TXN_{Math.floor(Math.random() * 1000000)}</span>
             </div>
             <div className="flex justify-between">
                <span className="text-slate-500">Amount Paid</span>
                <span className="font-bold text-slate-700">₹{total.toLocaleString()}</span>
             </div>
          </div>
          <Button fullWidth onClick={onSuccess}>Go to Dashboard</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
             <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors">
               <ArrowLeft size={20} />
             </button>
             <h1 className="text-lg font-bold text-slate-800">Secure Checkout</h1>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-green-700 bg-green-50 px-3 py-1.5 rounded-full">
             <Lock size={12} /> 256-bit SSL Encrypted
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
           <div className="flex-1 space-y-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                 <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs">1</span>
                    Billing Information
                 </h2>
                 <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                       <label className="text-xs font-bold text-slate-600">Full Name</label>
                       <input type="text" defaultValue={user?.name || "Demo Student"} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20" />
                    </div>
                    <div className="space-y-1">
                       <label className="text-xs font-bold text-slate-600">Mobile Number</label>
                       <input type="text" defaultValue={user?.mobile || "9999999999"} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20" />
                    </div>
                    <div className="space-y-1 md:col-span-2">
                       <label className="text-xs font-bold text-slate-600">Email Address</label>
                       <input type="email" defaultValue={user?.email || "demo@student.com"} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20" />
                    </div>
                 </form>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                 <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs">2</span>
                    Payment Method
                 </h2>
                 <div className="space-y-3">
                    <div onClick={() => setPaymentMethod('upi')} className={`p-4 rounded-xl border-2 cursor-pointer flex items-center justify-between transition-all ${paymentMethod === 'upi' ? 'border-brand-orange bg-brand-orange/5' : 'border-slate-100 hover:border-slate-300'}`}>
                        <div className="flex items-center gap-3">
                           <div className="w-10 h-10 bg-white rounded-lg border border-slate-200 flex items-center justify-center"><Smartphone size={20} className="text-slate-700" /></div>
                           <div><div className="font-bold text-slate-800 text-sm">UPI / QR Code</div><div className="text-xs text-slate-500">GooglePay, PhonePe, Paytm</div></div>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'upi' ? 'border-brand-orange' : 'border-slate-300'}`}>{paymentMethod === 'upi' && <div className="w-2.5 h-2.5 rounded-full bg-brand-orange"></div>}</div>
                    </div>
                 </div>
              </div>
           </div>

           <div className="lg:w-96">
              <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden sticky top-24">
                 <div className="p-6 border-b border-slate-100 bg-slate-50/50"><h3 className="font-bold text-slate-800">Order Summary</h3></div>
                 <div className="p-6 space-y-4">
                    <div className="flex justify-between items-start gap-4">
                        <div><div className="font-bold text-slate-800 text-sm">{plan.title}</div><div className="text-xs text-slate-500 mt-0.5">{plan.period}</div></div>
                        <div className="font-bold text-slate-800">₹{basePrice.toLocaleString()}</div>
                    </div>
                    <div className="h-px bg-slate-100 my-2"></div>
                    <div className="flex justify-between text-sm"><span className="text-slate-500">Subtotal</span><span className="font-medium text-slate-700">₹{basePrice.toLocaleString()}</span></div>
                    <div className="flex justify-between text-sm"><span className="text-slate-500">GST (18%)</span><span className="font-medium text-slate-700">₹{gst.toLocaleString()}</span></div>
                    <div className="h-px bg-slate-100 my-2"></div>
                    <div className="flex justify-between items-end"><span className="font-bold text-slate-800">Total Pay</span><span className="font-display font-bold text-2xl text-slate-900">₹{total.toLocaleString()}</span></div>
                    <Button fullWidth size="lg" onClick={handlePayment} disabled={step === 'processing'} className="mt-4 shadow-xl shadow-brand-orange/20">{step === 'processing' ? 'Processing...' : `Pay ₹${total.toLocaleString()}`}</Button>
                 </div>
              </div>
           </div>
        </div>
      </main>
    </div>
  );
};
