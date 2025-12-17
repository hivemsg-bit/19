import React from 'react';
import { Star, Quote, CheckCircle } from 'lucide-react';

const reviewsData = [
  { id: 1, name: "Priya Sharma", level: "CA Final", content: "Scored Exemption in Audit! The 48hr feedback is a game changer.", rating: 5, stamp: "Exemption!" },
  { id: 2, name: "Rahul Verma", level: "CA Inter", content: "From 180 to 240 marks. Detailed analysis helped me improve.", rating: 5, stamp: "Both Grp Pass" },
  { id: 3, name: "Anjali Gupta", level: "Foundation", content: "Best platform for writing practice. Mentorship is great.", rating: 4, stamp: "Cleared!" },
  { id: 4, name: "Dev Patel", level: "CA Final", content: "AIR 45 this attempt! The tough questions prepared me well.", rating: 5, stamp: "AIR 45" },
  { id: 5, name: "Sneha Reddy", level: "CA Inter", content: "Costing was my weak point, now it's my strength.", rating: 5, stamp: "Grp 1 Clear" },
  { id: 6, name: "Amit Kumar", level: "Foundation", content: "Passed with distinction. Thank you team!", rating: 5, stamp: "300+ Marks" },
  { id: 7, name: "Vikram Singh", level: "CA Final", content: "FR and SFM test series are must-do before exams.", rating: 4, stamp: "CA Qualified" },
  { id: 8, name: "Neha Joshi", level: "CA Inter", content: "I realized my presentation mistakes early.", rating: 5, stamp: "Exemption" },
  { id: 9, name: "Rohan Das", level: "Foundation", content: "Maths stats tricks in solution were helpful.", rating: 4, stamp: "Pass" },
  { id: 10, name: "Kavita M", level: "CA Final", content: "Became CA this attempt. Practice is key!", rating: 5, stamp: "Now CA" },
  { id: 11, name: "Siddarth R", level: "CA Inter", content: "Law keywords guidance was spot on.", rating: 5, stamp: "Grp 2 Clear" },
  { id: 12, name: "Pooja B", level: "Foundation", content: "Eco and BCR writing practice improved my speed.", rating: 4, stamp: "Cleared" },
  { id: 13, name: "Arjun K", level: "CA Final", content: "Direct Tax amendments were covered perfectly.", rating: 5, stamp: "Exemption" },
  { id: 14, name: "Meera S", level: "CA Inter", content: "Audit retention techniques shared by mentor worked.", rating: 5, stamp: "Both Grp Pass" },
  { id: 15, name: "Varun T", level: "Foundation", content: "Simple interface, fast checking. Recommended.", rating: 4, stamp: "Pass" },
];

// Duplicate data to create seamless loop
const reviews = [...reviewsData, ...reviewsData];

const ReviewCard: React.FC<{ review: typeof reviewsData[0], delay: number }> = ({ review, delay }) => (
  <div className="flex-shrink-0 w-72 md:w-80 p-5 mx-3 bg-white rounded-xl shadow-sm border border-slate-100 relative overflow-hidden group hover:shadow-md transition-shadow">
    
    {/* User Header */}
    <div className="flex items-center gap-3 mb-3">
       <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-dark font-bold text-sm border border-brand-primary/20">
          {review.name.charAt(0)}
       </div>
       <div>
          <h4 className="font-bold text-slate-800 text-sm">{review.name}</h4>
          <span className="text-xs text-slate-500 font-medium block">{review.level}</span>
       </div>
       <div className="ml-auto flex text-yellow-400">
           <Star size={12} fill="currentColor" />
           <span className="text-xs text-slate-600 font-bold ml-1">{review.rating}.0</span>
       </div>
    </div>

    {/* Content */}
    <p className="text-slate-600 text-xs leading-relaxed mb-2 line-clamp-3">
       "{review.content}"
    </p>

    {/* STAMP ANIMATION - Appears from above */}
    <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-4 border-red-600/40 text-red-600/40 font-stamp text-2xl font-black uppercase tracking-widest px-4 py-2 rounded-lg z-10 opacity-0 pointer-events-none whitespace-nowrap"
        style={{
            animation: `stampDrop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards`,
            animationDelay: `${delay}s` // Random delay for natural feel
        }}
    >
        {review.stamp}
    </div>

    {/* Quote Icon BG */}
    <Quote size={40} className="absolute bottom-2 right-2 text-slate-100 -rotate-12" />
  </div>
);

export const Testimonials: React.FC = () => {
  return (
    <section className="py-16 bg-brand-cream overflow-hidden">
      
      {/* Header */}
      <div className="text-center mb-10 px-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-2">
            Hall of <span className="text-brand-primary">Fame</span>
          </h2>
          <p className="text-slate-500 text-sm md:text-base">
             See what happens when you practice right. Real results.
          </p>
      </div>

      {/* Row 1 - Marquee Left */}
      <div className="flex overflow-hidden mb-6 relative w-full">
         <div className="flex animate-marquee hover:[animation-play-state:paused]">
            {reviews.map((review, index) => (
               <ReviewCard key={`row1-${index}`} review={review} delay={Math.random() * 2 + 0.5} />
            ))}
         </div>
      </div>

      {/* Row 2 - Marquee Right (Reverse) */}
      <div className="flex overflow-hidden relative w-full">
         <div className="flex animate-marquee-reverse hover:[animation-play-state:paused]">
            {reviews.slice().reverse().map((review, index) => (
               <ReviewCard key={`row2-${index}`} review={review} delay={Math.random() * 2 + 0.5} />
            ))}
         </div>
      </div>

    </section>
  );
};