import React, { useState } from 'react';
import { ArrowLeft, ShieldCheck, CreditCard, Lock, CheckCircle, Smartphone, Globe, AlertCircle } from 'lucide-react';
import { Button } from './Button';

interface CheckoutProps {
  plan: any;
  onBack: () => void;
  onSuccess: () => void;
  user?: any; // Optional user data if logged in
}

export const Checkout: React.FC<CheckoutProps> = ({ plan, onBack, onSuccess, user }) => {
  const [step, setStep] = useState<'details' | 'payment' | 'processing' | 'success'>('details');
  const [paymentMethod, setPaymentMethod] = useState('upi');
  
  // Parse price string to number for calculation (e.g., "₹2,999" -> 2999)
  const basePrice = parseInt(plan.price.replace(/[^0-9]/g, '')) || 999;
  const gst = Math.round(basePrice * 0.18);
  const total = basePrice + gst;

  const handlePayment = () => {
    setStep('processing');
    setTimeout(() => {
      setStep('success');
    }, 2500);
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
      {/* Header */}
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
           
           {/* LEFT COLUMN: Billing Details */}
           <div className="flex-1 space-y-6">
              
              {/* Step 1: User Details */}
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
                    <div className="space-y-1">
                       <label className="text-xs font-bold text-slate-600">State</label>
                       <select className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20">
                          <option>Maharashtra</option>
                          <option>Delhi</option>
                          <option>Karnataka</option>
                          <option>Other</option>
                       </select>
                    </div>
                    <div className="space-y-1">
                       <label className="text-xs font-bold text-slate-600">City</label>
                       <input type="text" placeholder="e.g. Mumbai" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20" />
                    </div>
                 </form>
              </div>

              {/* Step 2: Payment Method */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                 <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs">2</span>
                    Payment Method
                 </h2>
                 
                 <div className="space-y-3">
                    {/* UPI Option */}
                    <div 
                        onClick={() => setPaymentMethod('upi')}
                        className={`p-4 rounded-xl border-2 cursor-pointer flex items-center justify-between transition-all ${paymentMethod === 'upi' ? 'border-brand-orange bg-brand-orange/5' : 'border-slate-100 hover:border-slate-300'}`}
                    >
                        <div className="flex items-center gap-3">
                           <div className="w-10 h-10 bg-white rounded-lg border border-slate-200 flex items-center justify-center">
                              <Smartphone size={20} className="text-slate-700" />
                           </div>
                           <div>
                              <div className="font-bold text-slate-800 text-sm">UPI / QR Code</div>
                              <div className="text-xs text-slate-500">GooglePay, PhonePe, Paytm</div>
                           </div>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'upi' ? 'border-brand-orange' : 'border-slate-300'}`}>
                           {paymentMethod === 'upi' && <div className="w-2.5 h-2.5 rounded-full bg-brand-orange"></div>}
                        </div>
                    </div>

                    {/* Card Option */}
                    <div 
                        onClick={() => setPaymentMethod('card')}
                        className={`p-4 rounded-xl border-2 cursor-pointer flex items-center justify-between transition-all ${paymentMethod === 'card' ? 'border-brand-orange bg-brand-orange/5' : 'border-slate-100 hover:border-slate-300'}`}
                    >
                        <div className="flex items-center gap-3">
                           <div className="w-10 h-10 bg-white rounded-lg border border-slate-200 flex items-center justify-center">
                              <CreditCard size={20} className="text-slate-700" />
                           </div>
                           <div>
                              <div className="font-bold text-slate-800 text-sm">Credit / Debit Card</div>
                              <div className="text-xs text-slate-500">Visa, Mastercard, Rupay</div>
                           </div>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'card' ? 'border-brand-orange' : 'border-slate-300'}`}>
                           {paymentMethod === 'card' && <div className="w-2.5 h-2.5 rounded-full bg-brand-orange"></div>}
                        </div>
                    </div>

                    {/* NetBanking Option */}
                    <div 
                        onClick={() => setPaymentMethod('netbanking')}
                        className={`p-4 rounded-xl border-2 cursor-pointer flex items-center justify-between transition-all ${paymentMethod === 'netbanking' ? 'border-brand-orange bg-brand-orange/5' : 'border-slate-100 hover:border-slate-300'}`}
                    >
                        <div className="flex items-center gap-3">
                           <div className="w-10 h-10 bg-white rounded-lg border border-slate-200 flex items-center justify-center">
                              <Globe size={20} className="text-slate-700" />
                           </div>
                           <div>
                              <div className="font-bold text-slate-800 text-sm">Net Banking</div>
                              <div className="text-xs text-slate-500">All Indian Banks</div>
                           </div>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'netbanking' ? 'border-brand-orange' : 'border-slate-300'}`}>
                           {paymentMethod === 'netbanking' && <div className="w-2.5 h-2.5 rounded-full bg-brand-orange"></div>}
                        </div>
                    </div>
                 </div>

                 {/* Payment Form (Conditional) */}
                 {paymentMethod === 'card' && (
                     <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-200 animate-fade-up">
                        <div className="space-y-3">
                            <input type="text" placeholder="Card Number" className="w-full p-3 bg-white border border-slate-200 rounded-lg text-sm" />
                            <div className="flex gap-3">
                                <input type="text" placeholder="MM/YY" className="w-1/2 p-3 bg-white border border-slate-200 rounded-lg text-sm" />
                                <input type="text" placeholder="CVV" className="w-1/2 p-3 bg-white border border-slate-200 rounded-lg text-sm" />
                            </div>
                        </div>
                     </div>
                 )}
              </div>
           </div>

           {/* RIGHT COLUMN: Order Summary */}
           <div className="lg:w-96">
              <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden sticky top-24">
                 <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                    <h3 className="font-bold text-slate-800">Order Summary</h3>
                 </div>
                 
                 <div className="p-6 space-y-4">
                    <div className="flex justify-between items-start gap-4">
                        <div>
                            <div className="font-bold text-slate-800 text-sm">{plan.title}</div>
                            <div className="text-xs text-slate-500 mt-0.5">{plan.period}</div>
                        </div>
                        <div className="font-bold text-slate-800">₹{basePrice.toLocaleString()}</div>
                    </div>

                    <div className="h-px bg-slate-100 my-2"></div>

                    <div className="flex justify-between text-sm">
                        <span className="text-slate-500">Subtotal</span>
                        <span className="font-medium text-slate-700">₹{basePrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-slate-500">GST (18%)</span>
                        <span className="font-medium text-slate-700">₹{gst.toLocaleString()}</span>
                    </div>

                    <div className="bg-green-50 rounded-lg p-3 flex items-start gap-2 border border-green-100">
                        <CheckCircle size={16} className="text-green-600 mt-0.5 shrink-0" />
                        <div>
                            <div className="text-xs font-bold text-green-700">JAN2026 Applied</div>
                            <div className="text-[10px] text-green-600">Processing fees waived off</div>
                        </div>
                    </div>

                    <div className="h-px bg-slate-100 my-2"></div>

                    <div className="flex justify-between items-end">
                        <span className="font-bold text-slate-800">Total Pay</span>
                        <span className="font-display font-bold text-2xl text-slate-900">₹{total.toLocaleString()}</span>
                    </div>

                    <Button 
                        fullWidth 
                        size="lg" 
                        onClick={handlePayment} 
                        disabled={step === 'processing'}
                        className="mt-4 shadow-xl shadow-brand-orange/20"
                    >
                        {step === 'processing' ? 'Processing...' : `Pay ₹${total.toLocaleString()}`}
                    </Button>

                    <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400 mt-4">
                        <ShieldCheck size={12} /> Secure Razorpay / Stripe Payment
                    </div>
                 </div>
              </div>

              {/* Trust Badge */}
              <div className="mt-6 bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3">
                 <AlertCircle size={20} className="text-blue-600 shrink-0" />
                 <div>
                    <div className="font-bold text-blue-800 text-xs mb-1">100% Money Back Guarantee</div>
                    <p className="text-[10px] text-blue-600/80 leading-relaxed">
                        If you don't receive your checked copy within 48 hours, we refund the full amount for that paper. No questions asked.
                    </p>
                 </div>
              </div>
           </div>

        </div>
      </main>
    </div>
  );
};