
import React, { useState } from 'react';
import { Plus, Minus, HelpCircle, MessageCircle } from 'lucide-react';
import { Button } from './Button';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "Who will evaluate my answer sheets?",
    answer: "Every single sheet is checked only by qualified Chartered Accountants who have secured a Rank or high marks in that specific subject. We do not use interns for checking."
  },
  {
    question: "When will I get my results?",
    answer: "We guarantee evaluation within 48-72 hours. You will receive an SMS and Email notification as soon as your checked PDF is ready in the dashboard."
  },
  {
    question: "Is the test series based on the NEW ICAI scheme?",
    answer: "Yes, 100%. All our question papers are updated as per the Jan 2026 attempt requirements and follow the latest ICAI marking scheme."
  },
  {
    question: "Can I discuss my mistakes with the teacher?",
    answer: "Absolutely! Every 'Detailed' and 'Mentorship' plan includes a doubt-clearing facility. In Mentorship Pro, you also get a 1-on-1 strategy call with a Ranker."
  },
  {
    question: "Do you provide suggested answers?",
    answer: "Yes, you get high-quality suggested answers with keyword highlighting for every test, so you can compare and learn better."
  }
];

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-primary/10 text-brand-primary rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
            <HelpCircle size={14} /> Common Doubts
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-black text-slate-900">Still Have <span className="text-brand-orange">Questions?</span></h2>
          <p className="text-slate-500 mt-4 font-medium">Everything you need to know about India's most accurate CA test series.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`border-2 rounded-3xl transition-all duration-300 overflow-hidden ${openIndex === index ? 'border-brand-primary bg-brand-cream/30 shadow-lg' : 'border-slate-100 hover:border-brand-primary/30'}`}
            >
              <button 
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className={`font-bold text-sm md:text-lg transition-colors ${openIndex === index ? 'text-brand-dark' : 'text-slate-700'}`}>
                  {faq.question}
                </span>
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${openIndex === index ? 'bg-brand-primary text-white rotate-180' : 'bg-slate-50 text-slate-400'}`}>
                  {openIndex === index ? <Minus size={18} /> : <Plus size={18} />}
                </div>
              </button>
              
              <div 
                className={`transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className="px-6 pb-6 text-slate-600 text-sm leading-relaxed font-medium">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-brand-dark rounded-[2.5rem] p-8 md:p-12 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/10 rounded-full translate-x-16 -translate-y-16"></div>
            <h3 className="text-2xl font-bold mb-4">Didn't find your answer?</h3>
            <p className="text-slate-400 text-sm mb-8">Chat with our CA mentor directly on WhatsApp and get your doubts resolved in minutes.</p>
            <Button size="lg" className="bg-green-600 hover:bg-green-700 border-none rounded-2xl px-10">
                <MessageCircle size={20} className="mr-2 fill-current" /> Chat on WhatsApp
            </Button>
        </div>
      </div>
    </section>
  );
};
