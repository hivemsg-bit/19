import React, { useState } from 'react';
import { Award, Linkedin, Briefcase, BookOpen, X, Star, Users, CheckCircle, GraduationCap } from 'lucide-react';
import { Button } from './Button';

// Define Interface for Type Safety
interface Mentor {
  id: number;
  name: string;
  title: string;
  rank: string;
  image: string;
  bio: string;
  fullBio: string;
  specialty: string;
  experience: string;
  color: string;
  students: string;
  rating: string;
  achievements: string[];
}

export const Mentors: React.FC = () => {
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);

  const mentors: Mentor[] = [
    {
      id: 1,
      name: "CA Rohit Verma",
      title: "Audit & Assurance Expert",
      rank: "AIR 4 (Nov '19)",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop",
      bio: "Ex-Deloitte. Known for his 'Audit Mnemonics' that help students retain 100% of the syllabus.",
      fullBio: "Rohit has mentored over 5000+ students specifically for Audit. His unique approach involves breaking down complex Standards on Auditing (SAs) into simple, relatable stories. He previously worked with Deloitte India in Statutory Audit.",
      specialty: "Audit & Law",
      experience: "5+ Years",
      color: "border-brand-primary",
      students: "5,200+",
      rating: "4.9",
      achievements: ["Deloitte High Performer Award", "Author of 'Audit Made Easy'", "Produced 15+ Rankers"]
    },
    {
      id: 2,
      name: "CA Neha Gupta",
      title: "Financial Reporting Lead",
      rank: "AIR 12 (May '20)",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
      bio: "Scored 92 in FR. She decodes complex IndAS into simple, logical stories.",
      fullBio: "Neha is a favorite among CA Final students for her conceptual clarity in Financial Reporting. She believes in logic over rote learning. She secured All India Rank 12 in her first attempt and scored an exemption in all practical subjects.",
      specialty: "Accounts & FR",
      experience: "4 Years",
      color: "border-brand-orange",
      students: "3,800+",
      rating: "5.0",
      achievements: ["Gold Medalist in FR", "Ex-EY Consultant", "Guest Speaker at ICAI Chapters"]
    },
    {
      id: 3,
      name: "CA Arjun Mehta",
      title: "Strategic Management",
      rank: "Merit Holder",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800&auto=format&fit=crop",
      bio: "Helps you master the art of writing 'ICAI-style' answers for theory subjects.",
      fullBio: "Arjun specializes in theory subjects like EIS-SM and Audit. He emphasizes keyword retention and presentation skills. His mentorship sessions are focused on how to impress the examiner within the first 3 lines of an answer.",
      specialty: "EIS-SM & Audit",
      experience: "6+ Years",
      color: "border-blue-500",
      students: "6,000+",
      rating: "4.8",
      achievements: ["Corporate Trainer", "Strategy Consultant", "Best Faculty Award 2023"]
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
            <div key={mentor.id} className="group relative bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col h-full">
              
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
              <div className={`p-6 border-t-4 ${mentor.color} flex flex-col flex-grow`}>
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

                <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow">
                  "{mentor.bio}"
                </p>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50">
                   <a href="#" className="text-slate-400 hover:text-[#0077b5] transition-colors p-2 hover:bg-slate-50 rounded-full">
                      <Linkedin size={20} />
                   </a>
                   <Button 
                      variant="outline" 
                      size="sm" 
                      className="rounded-full text-xs px-4 border-slate-200 text-slate-600 hover:border-brand-primary hover:text-white hover:bg-brand-primary"
                      onClick={() => setSelectedMentor(mentor)}
                   >
                      View Profile
                   </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* MENTOR PROFILE MODAL */}
      {selectedMentor && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              {/* Backdrop */}
              <div 
                  className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm transition-opacity" 
                  onClick={() => setSelectedMentor(null)}
              ></div>
              
              {/* Modal Content */}
              <div className="relative bg-white rounded-[2rem] shadow-2xl w-full max-w-3xl overflow-hidden animate-fade-up max-h-[90vh] overflow-y-auto">
                  
                  {/* Close Button */}
                  <button 
                      onClick={() => setSelectedMentor(null)} 
                      className="absolute top-4 right-4 z-20 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full transition-colors"
                  >
                      <X size={20} />
                  </button>

                  {/* Modal Header: Image & Basic Info */}
                  <div className="relative h-48 sm:h-64 bg-slate-900">
                      <img src={selectedMentor.image} alt={selectedMentor.name} className="w-full h-full object-cover opacity-60" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                      
                      <div className="absolute -bottom-12 sm:-bottom-16 left-6 sm:left-10 flex items-end">
                          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl border-4 border-white shadow-xl overflow-hidden bg-white">
                              <img src={selectedMentor.image} alt={selectedMentor.name} className="w-full h-full object-cover" />
                          </div>
                      </div>
                  </div>

                  {/* Modal Body */}
                  <div className="pt-16 sm:pt-20 px-6 sm:px-10 pb-8 sm:pb-10">
                      
                      {/* Name & Title */}
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                          <div>
                              <h3 className="text-3xl font-display font-bold text-slate-900">{selectedMentor.name}</h3>
                              <p className="text-brand-primary font-bold text-lg">{selectedMentor.title}</p>
                          </div>
                          <div className="bg-brand-orange/10 text-brand-orange px-4 py-2 rounded-xl font-bold flex items-center gap-2 border border-brand-orange/20 shadow-sm whitespace-nowrap">
                              <Award size={20} /> {selectedMentor.rank}
                          </div>
                      </div>

                      {/* Stats Grid */}
                      <div className="grid grid-cols-3 gap-4 mb-8">
                          <div className="bg-slate-50 p-4 rounded-2xl text-center border border-slate-100">
                              <div className="text-xl sm:text-2xl font-bold text-slate-800 flex items-center justify-center gap-1">
                                  {selectedMentor.rating} <Star size={18} className="fill-brand-orange text-brand-orange" />
                              </div>
                              <div className="text-[10px] sm:text-xs text-slate-500 uppercase tracking-wide font-bold mt-1">Student Rating</div>
                          </div>
                          <div className="bg-slate-50 p-4 rounded-2xl text-center border border-slate-100">
                              <div className="text-xl sm:text-2xl font-bold text-slate-800">
                                  {selectedMentor.students}
                              </div>
                              <div className="text-[10px] sm:text-xs text-slate-500 uppercase tracking-wide font-bold mt-1">Mentored</div>
                          </div>
                          <div className="bg-slate-50 p-4 rounded-2xl text-center border border-slate-100">
                              <div className="text-xl sm:text-2xl font-bold text-slate-800">
                                  {selectedMentor.experience}
                              </div>
                              <div className="text-[10px] sm:text-xs text-slate-500 uppercase tracking-wide font-bold mt-1">Experience</div>
                          </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                          {/* Bio Column */}
                          <div className="md:col-span-2 space-y-6">
                              <div>
                                  <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                                      <Users size={18} className="text-brand-primary" /> About Mentor
                                  </h4>
                                  <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                                      {selectedMentor.fullBio}
                                  </p>
                              </div>
                              
                              <div>
                                  <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                                      <GraduationCap size={18} className="text-brand-primary" /> Specialization
                                  </h4>
                                  <div className="flex flex-wrap gap-2">
                                      {selectedMentor.specialty.split('&').map(s => (
                                          <span key={s} className="px-3 py-1 bg-brand-primary/10 text-brand-dark rounded-lg text-sm font-bold">
                                              {s.trim()}
                                          </span>
                                      ))}
                                      <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-sm font-medium">Exam Strategy</span>
                                      <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-sm font-medium">Concept Clarity</span>
                                  </div>
                              </div>
                          </div>

                          {/* Achievements Column */}
                          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 h-fit">
                              <h4 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wide">Key Achievements</h4>
                              <ul className="space-y-3">
                                  {selectedMentor.achievements.map((ach, index) => (
                                      <li key={index} className="flex items-start gap-3 text-sm text-slate-600">
                                          <CheckCircle size={16} className="text-green-500 shrink-0 mt-0.5" />
                                          <span className="leading-snug">{ach}</span>
                                      </li>
                                  ))}
                              </ul>
                          </div>
                      </div>

                      {/* Footer Actions */}
                      <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row gap-4">
                          <Button fullWidth onClick={() => setSelectedMentor(null)} className="shadow-lg shadow-brand-orange/20">
                              Book 1:1 Session with {selectedMentor.name.split(' ')[1]}
                          </Button>
                          <Button fullWidth variant="outline" onClick={() => setSelectedMentor(null)}>
                              Close Profile
                          </Button>
                      </div>
                  </div>
              </div>
          </div>
      )}
    </section>
  );
};