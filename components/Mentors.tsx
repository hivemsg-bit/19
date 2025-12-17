import React from 'react';
import { Award, Linkedin, Briefcase, BookOpen } from 'lucide-react';
import { Button } from './Button';

export const Mentors: React.FC = () => {
  const mentors = [
    {
      id: 1,
      name: "CA Rohit Verma",
      title: "Audit & Assurance Expert",
      rank: "AIR 4 (Nov '19)",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop",
      bio: "Ex-Deloitte. Known for his 'Audit Mnemonics' that help students retain 100% of the syllabus.",
      specialty: "Audit & Law",
      experience: "5+ Years",
      color: "border-brand-primary"
    },
    {
      id: 2,
      name: "CA Neha Gupta",
      title: "Financial Reporting Lead",
      rank: "AIR 12 (May '20)",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
      bio: "Scored 92 in FR. She decodes complex IndAS into simple, logical stories.",
      specialty: "Accounts & FR",
      experience: "4 Years",
      color: "border-brand-orange"
    },
    {
      id: 3,
      name: "CA Arjun Mehta",
      title: "Strategic Management",
      rank: "Merit Holder",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800&auto=format&fit=crop",
      bio: "Helps you master the art of writing 'ICAI-style' answers for theory subjects.",
      specialty: "EIS-SM & Audit",
      experience: "6+ Years",
      color: "border-blue-500"
    }
  ];

  return (
    <section className="py-20 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-brand-orange font-bold tracking-wider uppercase text-[10px] mb-2 block">
            Expert Guidance
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 mb-6">
            Learn from the <span className="text-brand-primary">Rankers</span>
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Your copies aren't checked by interns. They are evaluated by qualified CAs who have cracked the code.
          </p>
        </div>

        {/* Mentors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {mentors.map((mentor) => (
            <div key={mentor.id} className="group relative bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              
              {/* Top Image Section */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={mentor.image} 
                  alt={mentor.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                
                {/* Floating Rank Badge */}
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg flex items-center gap-1.5 animate-fade-up">
                  <Award size={14} className="text-brand-orange" />
                  <span className="text-xs font-bold text-slate-800">{mentor.rank}</span>
                </div>

                {/* Name Overlay */}
                <div className="absolute bottom-0 left-0 p-6 text-white w-full">
                   <h3 className="text-2xl font-display font-bold">{mentor.name}</h3>
                   <p className="text-brand-secondary text-sm font-medium">{mentor.title}</p>
                </div>
              </div>

              {/* Bottom Content */}
              <div className={`p-6 border-t-4 ${mentor.color}`}>
                <div className="flex items-center justify-between mb-4 text-xs font-bold text-slate-500 uppercase tracking-wide">
                   <div className="flex items-center gap-1">
                      <BookOpen size={14} className="text-brand-primary" />
                      {mentor.specialty}
                   </div>
                   <div className="flex items-center gap-1">
                      <Briefcase size={14} className="text-brand-primary" />
                      {mentor.experience}
                   </div>
                </div>

                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  "{mentor.bio}"
                </p>

                <div className="flex items-center justify-between">
                   <a href="#" className="text-slate-400 hover:text-[#0077b5] transition-colors">
                      <Linkedin size={20} />
                   </a>
                   <Button variant="outline" size="sm" className="rounded-full text-xs px-4 border-slate-200 text-slate-600 hover:border-brand-primary hover:text-white">
                      View Profile
                   </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};