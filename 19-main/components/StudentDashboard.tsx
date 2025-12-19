
import React, { useState, useEffect, useRef } from 'react';
import { 
  LayoutDashboard, FileText, LogOut, Upload, Download, CheckCircle, 
  Clock, AlertCircle, Menu, X, ShoppingBag, Loader2, Plus, ArrowRight, 
  MessageCircle, Award, Eye, FileSearch, Globe, Check, Lock, BarChart3, TrendingUp, Bell, Share2, Trash2, ExternalLink, FileWarning, HelpCircle, Megaphone, UserCircle, Calendar, Target, SearchX, BookOpen, CheckSquare, Sparkles, Filter, Book, Bookmark, Timer, PlayCircle, AlertTriangle, ChevronRight, Zap,
  // Added Bot icon import to fix the error on line 479
  Bot
} from 'lucide-react';
import { Button } from './Button';
import { TestSeries } from './TestSeries';
import { AICoach } from './AICoach';
import { 
  doc, 
  onSnapshot, 
  collection, 
  query, 
  orderBy,
  deleteDoc,
  addDoc,
  serverTimestamp,
  updateDoc
} from 'firebase/firestore';
import { db, auth } from '../lib/firebase';

interface StudentDashboardProps {
  onLogout: () => void;
  onBuyPlan?: (plan: any) => void;
  tests: any[];
  onUpdateTest: (test: any) => void;
  onNewSubmission: (test: any) => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({ onLogout, onBuyPlan, tests, onNewSubmission }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedResult, setSelectedResult] = useState<any | null>(null);
  const [viewPdfUrl, setViewPdfUrl] = useState<string | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [availPapers, setAvailPapers] = useState<any[]>([]);
  const [announcements, setAnnouncements] = useState<any[]>([]);
  
  // Mock Test Timer States
  const [activeExam, setActiveExam] = useState<any | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isExamFinished, setIsExamFinished] = useState(false);

  // Material Library Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Mock Test', 'RTP (ICAI)', 'MTP (ICAI)', 'Past Paper', 'Revision Notes'];

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
        onSnapshot(doc(db, "users", user.uid), (doc) => setUserData(doc.data()));
        
        const qPapers = query(collection(db, "availablePapers"), orderBy("createdAt", "desc"));
        onSnapshot(qPapers, (snapshot) => {
            setAvailPapers(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
        });

        const qAnnounce = query(collection(db, "announcements"), orderBy("createdAt", "desc"));
        onSnapshot(qAnnounce, (snapshot) => {
            setAnnouncements(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
        });

        // Recovery logic for active exam if tab was closed
        const savedExam = localStorage.getItem('activeExam');
        const savedStartTime = localStorage.getItem('examStartTime');
        if (savedExam && savedStartTime) {
            const exam = JSON.parse(savedExam);
            const startTime = parseInt(savedStartTime);
            const now = Date.now();
            const elapsed = Math.floor((now - startTime) / 1000);
            const remaining = (exam.durationMinutes * 60) - elapsed;
            
            if (remaining > 0) {
                setActiveExam(exam);
                setTimeLeft(remaining);
            } else {
                localStorage.removeItem('activeExam');
                localStorage.removeItem('examStartTime');
            }
        }
    }
  }, []);

  // Timer Effect
  useEffect(() => {
    let timer: any;
    if (activeExam && timeLeft > 0) {
        timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    setIsExamFinished(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    }
    return () => clearInterval(timer);
  }, [activeExam, timeLeft]);

  const handleStartExam = (test: any) => {
    const confirmStart = window.confirm("Ek baar test start hone ke baad timer pause nahi hoga. Kya aap ready hain?");
    if (confirmStart) {
        const duration = 180; // Default 3 hours for CA exams
        const examData = { ...test, durationMinutes: duration };
        setActiveExam(examData);
        setTimeLeft(duration * 60);
        setIsExamFinished(false);
        localStorage.setItem('activeExam', JSON.stringify(examData));
        localStorage.setItem('examStartTime', Date.now().toString());
    }
  };

  const handleFinishExam = async (pdfLink?: string) => {
      setIsSubmitting(true);
      const submissionData = {
          subject: activeExam.subject,
          testName: activeExam.title,
          submittedAt: new Date().toISOString(),
          status: 'submitted',
          answerSheetUrl: pdfLink || 'manual_upload_pending'
      };
      
      await onNewSubmission(submissionData);
      
      localStorage.removeItem('activeExam');
      localStorage.removeItem('examStartTime');
      setActiveExam(null);
      setIsExamFinished(false);
      setIsSubmitting(false);
      setActiveTab('tests');
      alert("Test Successfully Submitted!");
  };

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const openPdfViewer = (url: string | undefined) => {
    if (url) setViewPdfUrl(url);
  };

  const handleWhatsAppShare = (result: any) => {
    const text = `I just got my results for ${result.subject} test on caexam.online and I scored ${result.marks}! The feedback from rankers is amazing.`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const filteredMaterials = availPapers.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // Analytics Calculation Logic
  const checkedTests = tests.filter(t => t.status === 'checked');
  const avgScore = checkedTests.length > 0 
    ? Math.round(checkedTests.reduce((acc, t) => acc + (parseInt(t.marks.split('/')[0]) || 0), 0) / checkedTests.length)
    : 0;

  // Simple Line Chart SVG logic
  const chartPoints = checkedTests.slice(-5).map((t, i) => {
    const score = parseInt(t.marks.split('/')[0]) || 0;
    const x = (i / 4) * 100;
    const y = 100 - score;
    return `${x},${y}`;
  }).join(' ');

  // Exam Room Component
  if (activeExam) {
      return (
          <div className="fixed inset-0 z-[200] bg-slate-900 flex flex-col font-sans select-none">
              <header className="h-16 bg-brand-dark border-b border-white/10 flex items-center justify-between px-6 shrink-0">
                  <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-brand-orange rounded-xl flex items-center justify-center text-white shadow-lg">
                          <Timer size={22} className={timeLeft < 900 ? "animate-pulse" : ""} />
                      </div>
                      <div>
                          <h2 className="text-white font-bold text-sm tracking-tight">{activeExam.title}</h2>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{activeExam.subject}</p>
                      </div>
                  </div>
                  <div className={`flex flex-col items-center px-8 py-1 rounded-xl border transition-colors ${timeLeft < 900 ? 'bg-red-500/20 border-red-500 text-red-500' : 'bg-white/5 border-white/10 text-brand-orange'}`}>
                      <span className="text-[9px] font-black uppercase tracking-widest mb-0.5">Time Remaining</span>
                      <span className="text-2xl font-mono font-black tabular-nums">{formatTime(timeLeft)}</span>
                  </div>
                  <div className="flex gap-3">
                      <Button variant="outline" size="sm" onClick={() => window.confirm("Exit Exam? Aapki progress save nahi hogi.") && setActiveExam(null)} className="border-white/20 text-white hover:bg-white/10 px-4">Exit</Button>
                      <Button variant="primary" size="sm" onClick={() => handleFinishExam()} disabled={isSubmitting} className="px-6">Submit Paper</Button>
                  </div>
              </header>
              <main className="flex-1 flex overflow-hidden">
                  <div className="flex-1 bg-slate-800 p-4 border-r border-white/5">
                      <div className="w-full h-full bg-white rounded-2xl overflow-hidden shadow-2xl relative">
                          <iframe src={`https://docs.google.com/viewer?url=${encodeURIComponent(activeExam.pdfUrl)}&embedded=true`} className="w-full h-full" title="Question Paper" />
                          <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.03] rotate-[-45deg] select-none">
                              <span className="text-9xl font-black">{userData?.name || 'STUDENT'}</span>
                          </div>
                      </div>
                  </div>
                  <div className="w-80 bg-slate-900 p-6 flex flex-col gap-6 overflow-y-auto">
                      <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
                          <h3 className="text-white font-bold text-xs uppercase tracking-widest mb-4 flex items-center gap-2"><AlertCircle size={14} className="text-brand-orange" /> Instructions</h3>
                          <ul className="space-y-3 text-[11px] text-slate-400 font-medium">
                              <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-brand-orange shrink-0 mt-1"></div> Write answers on plain A4 sheets.</li>
                              <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-brand-orange shrink-0 mt-1"></div> Use black ball point pen as per ICAI norms.</li>
                          </ul>
                      </div>
                      <div className="bg-brand-primary/10 rounded-2xl p-6 border border-brand-primary/20 text-center">
                          <Award size={32} className="text-brand-primary mx-auto mb-3" />
                          <h4 className="text-white font-bold text-sm">Focus Mode Active</h4>
                      </div>
                  </div>
              </main>
              {isExamFinished && (
                  <div className="fixed inset-0 z-[210] bg-slate-900/95 backdrop-blur-xl flex items-center justify-center p-4">
                      <div className="bg-white rounded-[3rem] p-10 max-w-md w-full text-center shadow-2xl animate-stamp-drop">
                          <div className="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6"><Clock size={40} /></div>
                          <h2 className="text-3xl font-black text-slate-900 mb-2">Time's Up!</h2>
                          <Button fullWidth onClick={() => handleFinishExam()} className="py-4">Confirm Submission</Button>
                      </div>
                  </div>
              )}
          </div>
      );
  }

  return (
    <div className="min-h-screen bg-slate-100 flex font-sans">
      <AICoach />
      {isMobileMenuOpen && <div className="fixed inset-0 bg-black/50 z-[45] lg:hidden" onClick={() => setIsMobileMenuOpen(false)}></div>}

      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white transform transition-transform duration-300 lg:translate-x-0 lg:static lg:block ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-16 flex items-center px-6 border-b border-white/5">
            <span className="font-display font-bold text-xl tracking-tight text-white">Student<span className="text-brand-orange">Portal</span></span>
            <button onClick={() => setIsMobileMenuOpen(false)} className="ml-auto lg:hidden p-1 hover:bg-white/10 rounded-lg"><X size={20} /></button>
        </div>
        <nav className="p-4 space-y-1.5 overflow-y-auto no-scrollbar" style={{ height: 'calc(100vh - 120px)' }}>
            {[
                { id: 'dashboard', icon: LayoutDashboard, label: 'Overview' },
                { id: 'exam-center', icon: PlayCircle, label: 'Test Center' },
                { id: 'tests', icon: FileText, label: 'My Submissions', badge: tests.length },
                { id: 'papers', icon: BookOpen, label: 'Material Library', badge: availPapers.length },
                { id: 'analytics', icon: BarChart3, label: 'Performance' },
                { id: 'plans', icon: ShoppingBag, label: 'Buy Series' },
            ].map((item) => (
                <button
                    key={item.id}
                    onClick={() => { setActiveTab(item.id); setIsMobileMenuOpen(false); }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === item.id ? 'bg-brand-orange text-white shadow-lg shadow-brand-orange/20' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                >
                    <item.icon size={18} /> {item.label}
                    {item.badge ? <span className="ml-auto bg-brand-primary text-white text-[10px] px-2 py-0.5 rounded-full">{item.badge}</span> : null}
                </button>
            ))}
        </nav>
        <div className="absolute bottom-6 left-6 right-6">
            <button onClick={onLogout} className="w-full flex items-center gap-2 px-4 py-2 text-red-400 font-bold text-sm hover:bg-red-500/10 rounded-xl transition-colors"><LogOut size={18} /> Logout</button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-6 sm:px-10 shrink-0">
            <div className="flex items-center gap-4">
                <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden p-2 bg-slate-50 rounded-lg text-slate-600"><Menu size={20} /></button>
                <div className="hidden sm:block">
                    <h1 className="text-lg font-bold text-slate-800">Hello, {userData?.name?.split(' ')[0] || 'Student'}</h1>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Performance Insights Active</p>
                </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white text-sm font-bold border-2 border-white">
                {userData?.name?.charAt(0) || 'S'}
            </div>
        </header>

        <main className="flex-1 p-4 sm:p-8 overflow-y-auto bg-slate-50/50">
            {/* PERFORMANCE ANALYTICS TAB */}
            {activeTab === 'analytics' && (
                <div className="max-w-6xl mx-auto space-y-8 animate-fade-up">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-4">
                        <div>
                            <h2 className="text-3xl font-black text-slate-900">Performance Dashboard</h2>
                            <p className="text-slate-500 text-sm mt-1">Detailed analysis of your mock test results and preparation level.</p>
                        </div>
                        <div className="flex gap-2">
                             <div className="px-4 py-2 bg-white rounded-xl border border-slate-200 text-xs font-bold text-slate-600 flex items-center gap-2 shadow-sm">
                                <Calendar size={14} className="text-brand-orange" /> Last 30 Days
                             </div>
                             <Button size="sm" variant="outline" className="text-[10px] border-slate-200">Export Report</Button>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-10 h-10 bg-brand-cream text-brand-orange rounded-xl flex items-center justify-center"><Award size={20} /></div>
                                <span className="text-[9px] font-black text-green-600 bg-green-50 px-2 py-0.5 rounded-full">+12% vs Toppers</span>
                            </div>
                            <div className="text-3xl font-black text-slate-900">{avgScore}%</div>
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Average Mock Score</div>
                        </div>
                        <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center"><CheckSquare size={20} /></div>
                                <span className="text-[9px] font-black text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">Target 10</span>
                            </div>
                            <div className="text-3xl font-black text-slate-900">{checkedTests.length}</div>
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Mock Tests Completed</div>
                        </div>
                        <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center"><Timer size={20} /></div>
                                <span className="text-[9px] font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">ICAI Norms</span>
                            </div>
                            <div className="text-3xl font-black text-slate-900">2.8h</div>
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Avg. Attempt Time</div>
                        </div>
                        <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-10 h-10 bg-green-50 text-green-600 rounded-xl flex items-center justify-center"><Zap size={20} /></div>
                                <span className="text-[9px] font-black text-brand-orange bg-brand-cream px-2 py-0.5 rounded-full">Pro Coach</span>
                            </div>
                            <div className="text-3xl font-black text-slate-900">A+</div>
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Presentation Grade</div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Score Trend Card */}
                        <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h3 className="font-black text-slate-800 text-lg">Score Progression</h3>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Growth across last 5 tests</p>
                                </div>
                                <div className="flex gap-4">
                                    <div className="flex items-center gap-2 text-[10px] font-bold text-slate-600">
                                        <div className="w-2 h-2 rounded-full bg-brand-primary"></div> You
                                    </div>
                                    <div className="flex items-center gap-2 text-[10px] font-bold text-slate-300">
                                        <div className="w-2 h-2 rounded-full bg-slate-200"></div> ICAI Threshold
                                    </div>
                                </div>
                            </div>
                            
                            <div className="h-48 w-full relative group">
                                <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full overflow-visible">
                                    {/* Grid Lines */}
                                    <line x1="0" y1="50" x2="100" y2="50" stroke="#f1f5f9" strokeWidth="0.5" />
                                    <line x1="0" y1="20" x2="100" y2="20" stroke="#f1f5f9" strokeWidth="0.5" />
                                    <line x1="0" y1="80" x2="100" y2="80" stroke="#f1f5f9" strokeWidth="0.5" />
                                    
                                    {/* Topper/ICAI line (constant 60) */}
                                    <line x1="0" y1="40" x2="100" y2="40" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="2" />
                                    
                                    {/* Score Path */}
                                    {checkedTests.length > 1 ? (
                                        <polyline
                                            fill="none"
                                            stroke="#97A87A"
                                            strokeWidth="2.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            points={chartPoints}
                                            className="animate-fade-up"
                                        />
                                    ) : (
                                        <circle cx="50" cy="50" r="1" fill="#97A87A" />
                                    )}

                                    {/* Data points */}
                                    {checkedTests.slice(-5).map((t, i) => {
                                        const score = parseInt(t.marks.split('/')[0]) || 0;
                                        const x = (i / 4) * 100;
                                        const y = 100 - score;
                                        return (
                                            <g key={i}>
                                                <circle cx={x} cy={y} r="3" fill="white" stroke="#97A87A" strokeWidth="2" className="cursor-pointer hover:r-4 transition-all" />
                                                <text x={x} y={y - 8} fontSize="4" fontWeight="bold" fill="#97A87A" textAnchor="middle">{score}</text>
                                            </g>
                                        );
                                    })}
                                </svg>
                                {checkedTests.length === 0 && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-2xl">
                                        <p className="text-xs font-bold text-slate-400">Complete more tests to see trends</p>
                                    </div>
                                )}
                            </div>
                            <div className="flex justify-between mt-6 px-1">
                                {['Test 1', 'Test 2', 'Test 3', 'Test 4', 'Test 5'].map(l => (
                                    <span key={l} className="text-[9px] font-black text-slate-300 uppercase tracking-tighter">{l}</span>
                                ))}
                            </div>
                        </div>

                        {/* Subject Mastery Radar (Simplified) */}
                        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col justify-between">
                            <div>
                                <h3 className="font-black text-slate-800 text-lg">Subject Mastery</h3>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Confidence level by subject</p>
                            </div>
                            <div className="space-y-5 mt-8">
                                {[
                                    { name: 'Financial Reporting', score: 85, color: 'bg-brand-primary' },
                                    { name: 'Audit & Assurance', score: 42, color: 'bg-brand-orange' },
                                    { name: 'Direct Taxation', score: 78, color: 'bg-blue-500' },
                                    { name: 'Corporate Laws', score: 65, color: 'bg-purple-500' },
                                ].map((sub, i) => (
                                    <div key={i} className="space-y-1.5">
                                        <div className="flex justify-between items-center text-[10px] font-bold">
                                            <span className="text-slate-700">{sub.name}</span>
                                            <span className={sub.score < 50 ? 'text-brand-orange' : 'text-slate-400'}>{sub.score}%</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                            <div className={`h-full ${sub.color} rounded-full transition-all duration-1000`} style={{ width: `${sub.score}%` }}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <AlertTriangle size={14} className="text-brand-orange" />
                                    <span className="text-[10px] font-bold text-slate-500">Weak Area: Audit</span>
                                </div>
                                <Button size="sm" variant="ghost" className="text-[10px] h-auto p-0 text-brand-primary">View Strategy</Button>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Preparation Milestones */}
                        <div className="bg-brand-dark rounded-[2.5rem] p-8 text-white relative overflow-hidden group">
                            <div className="relative z-10">
                                <h3 className="font-black text-xl mb-6">Preparation Roadmap</h3>
                                <div className="space-y-8">
                                    {[
                                        { label: 'Conceptual Basics', status: 'Completed', icon: CheckCircle, active: true },
                                        { label: 'Chapterwise Mock Tests', status: 'In Progress', icon: Loader2, active: true, progress: 60 },
                                        { label: 'RTP/MTP Solving', status: 'Locked', icon: Lock, active: false },
                                        { label: 'Full Syllabus Exam Simulation', status: 'Locked', icon: Lock, active: false },
                                    ].map((step, i) => (
                                        <div key={i} className="flex gap-4 relative">
                                            {i < 3 && <div className={`absolute left-4 top-10 w-0.5 h-6 ${step.active ? 'bg-brand-primary' : 'bg-white/10'}`}></div>}
                                            <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${step.active ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/20' : 'bg-white/5 text-white/20'}`}>
                                                <step.icon size={16} className={step.status === 'In Progress' ? 'animate-spin' : ''} />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex justify-between items-center mb-1">
                                                    <span className={`text-xs font-bold ${step.active ? 'text-white' : 'text-white/30'}`}>{step.label}</span>
                                                    <span className="text-[9px] font-black uppercase tracking-widest text-brand-orange">{step.status}</span>
                                                </div>
                                                {step.progress && (
                                                    <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                                                        <div className="h-full bg-brand-orange" style={{ width: `${step.progress}%` }}></div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <Sparkles className="absolute -bottom-10 -right-10 w-40 h-40 text-white/5 rotate-12 group-hover:scale-110 transition-transform" />
                        </div>

                        {/* Recent AI Feedback Highlights */}
                        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
                            <h3 className="font-black text-slate-800 text-lg mb-6 flex items-center gap-2">
                                <Bot size={22} className="text-brand-primary" /> AI Mentor Insights
                            </h3>
                            <div className="space-y-4">
                                {[
                                    { title: 'Technical Keywords', text: 'Audit tests mein "Professional Skepticism" aur "Internal Control" jaise terms use karein marks badhane ke liye.', type: 'tip' },
                                    { title: 'Time Allocation', text: 'FR section mein balance sheet tally karne mein zyada time waste ho raha hai. Try skipping to Q2 if stuck.', type: 'warning' },
                                    { title: 'Presentation Style', text: 'Law answers ko "Bullet points" mein likhne se examiner ka focus technical points par jaata hai. Keep it up!', type: 'success' },
                                ].map((insight, i) => (
                                    <div key={i} className={`p-5 rounded-2xl border ${insight.type === 'tip' ? 'bg-blue-50 border-blue-100' : insight.type === 'warning' ? 'bg-orange-50 border-orange-100' : 'bg-green-50 border-green-100'}`}>
                                        <div className="flex items-center gap-2 mb-2">
                                            {insight.type === 'tip' && <Globe size={14} className="text-blue-600" />}
                                            {insight.type === 'warning' && <AlertTriangle size={14} className="text-orange-600" />}
                                            {insight.type === 'success' && <CheckCircle size={14} className="text-green-600" />}
                                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-700">{insight.title}</span>
                                        </div>
                                        <p className="text-[11px] leading-relaxed text-slate-600 font-medium">"{insight.text}"</p>
                                    </div>
                                ))}
                            </div>
                            <Button fullWidth variant="ghost" className="mt-6 text-[10px] font-black uppercase tracking-widest">Ask AI Coach for more help</Button>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'dashboard' && (
                <div className="max-w-6xl mx-auto space-y-8 animate-fade-up">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="bg-brand-dark text-white p-8 rounded-3xl flex flex-col justify-between shadow-xl relative overflow-hidden group col-span-1 md:col-span-2 lg:col-span-1">
                            <div className="relative z-10">
                                <h3 className="text-brand-secondary font-bold text-xs uppercase tracking-widest mb-2">Preparation Status</h3>
                                <div className="text-5xl font-black mb-4">68%</div>
                                <div className="space-y-2">
                                    <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden">
                                        <div className="h-full bg-brand-orange transition-all duration-1000 w-[68%]"></div>
                                    </div>
                                    <p className="text-[10px] text-slate-400 font-medium">Keep practicing mock tests</p>
                                </div>
                            </div>
                            <Award className="absolute -bottom-6 -right-6 text-white/5 w-40 h-40 group-hover:text-white/10 transition-all" />
                        </div>
                        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-center gap-2">
                            <div className="w-12 h-12 rounded-2xl bg-orange-50 text-brand-orange flex items-center justify-center mb-2"><Target size={24} /></div>
                            <div className="text-3xl font-black text-slate-900">AIR Goal</div>
                            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Aiming Top 50 Rank</div>
                        </div>
                        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-center gap-2">
                            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-2"><CheckCircle size={24} /></div>
                            <div className="text-3xl font-black text-slate-900">{tests.filter(t => t.status === 'checked').length}</div>
                            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Tests Evaluated</div>
                        </div>
                    </div>
                </div>
            )}

            {/* Rest of the tabs (tests, papers, exam-center) remain the same... */}
            {activeTab === 'exam-center' && (
                <div className="max-w-6xl mx-auto space-y-8 animate-fade-up">
                    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col md:flex-row items-center gap-8">
                        <div className="w-24 h-24 bg-brand-cream rounded-3xl flex items-center justify-center text-brand-orange shadow-inner border border-brand-orange/10">
                            <PlayCircle size={48} />
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <h2 className="text-2xl font-black text-slate-900">Active Test Center</h2>
                            <p className="text-sm text-slate-500 mt-1">Niche diye gaye Mock Tests mein se koi bhi start karein. Be ready with your answer sheets.</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {availPapers.filter(p => p.category === 'Mock Test').map(test => (
                            <div key={test.id} className="bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-sm hover:border-brand-orange transition-all group">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-brand-orange/10 group-hover:text-brand-orange transition-colors">
                                        <FileText size={24} />
                                    </div>
                                    <div className="px-3 py-1 bg-slate-100 text-slate-500 rounded-full text-[9px] font-black uppercase tracking-widest">3 Hours</div>
                                </div>
                                <h3 className="font-black text-slate-800 text-lg mb-1">{test.title}</h3>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">{test.subject}</p>
                                <Button fullWidth onClick={() => handleStartExam(test)} className="py-3 shadow-lg shadow-brand-orange/10">Start Mock Test</Button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Material Library & Submission tabs hidden for brevity, logic exists in original file */}
            {activeTab === 'papers' && (
                <div className="max-w-6xl mx-auto space-y-8 animate-fade-up">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900">Material Library</h2>
                            <p className="text-sm text-slate-500">Official ICAI Resources & Expert Revision Notes.</p>
                        </div>
                        <div className="relative w-full md:w-80">
                            <SearchX size={18} className="absolute left-4 top-3.5 text-slate-400" />
                            <input type="text" placeholder="Search by subject or title..." className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white border border-slate-200 text-sm shadow-sm" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredMaterials.map((p) => (
                            <div key={p.id} className="bg-white p-6 rounded-[2.5rem] border border-slate-200 flex flex-col justify-between group hover:border-brand-primary transition-all shadow-sm">
                                <h3 className="font-black text-slate-800 text-lg leading-tight mb-2">{p.title}</h3>
                                <p className="text-[10px] font-bold text-slate-400 uppercase mb-6">{p.subject} • {p.level}</p>
                                <div className="flex gap-2">
                                    <button onClick={() => openPdfViewer(p.pdfUrl)} className="flex-1 py-3 bg-slate-50 text-slate-600 rounded-xl text-[10px] font-black uppercase">Preview</button>
                                    <a href={p.pdfUrl} target="_blank" rel="noopener noreferrer" className="flex-1 py-3 bg-brand-primary text-white text-center rounded-xl text-[10px] font-black uppercase">Download</a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === 'tests' && (
                <div className="max-w-6xl mx-auto space-y-6 animate-fade-up">
                    <h2 className="text-2xl font-bold text-slate-900 mb-8">Submission History</h2>
                    <div className="bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden shadow-sm">
                        {tests.length > 0 ? tests.map(test => (
                            <div key={test.id} className="p-8 flex items-center justify-between border-b last:border-none hover:bg-slate-50/50 transition-colors">
                                <div className="flex items-center gap-6">
                                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${test.status === 'checked' ? 'bg-green-50 text-green-600' : 'bg-slate-50 text-slate-400'}`}>
                                        <FileText size={32} />
                                    </div>
                                    <div>
                                        <div className="font-black text-slate-900 text-lg leading-tight">{test.subject}</div>
                                        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">{test.testName}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    {test.status === 'checked' ? (
                                        <div className="flex items-center gap-4">
                                            <div className="text-3xl font-black text-brand-primary">{test.marks}</div>
                                            <button onClick={() => setSelectedResult(test)} className="p-4 bg-brand-primary/10 text-brand-primary rounded-2xl hover:bg-brand-primary hover:text-white transition-all"><MessageCircle size={24} /></button>
                                        </div>
                                    ) : (
                                        <span className="px-4 py-2 bg-slate-100 text-slate-400 rounded-xl text-[10px] font-black uppercase tracking-widest">Evaluating</span>
                                    )}
                                </div>
                            </div>
                        )) : <div className="py-24 text-center">No submissions yet.</div>}
                    </div>
                </div>
            )}
        </main>
      </div>

      {/* MODALS (PDF Viewer, Result Modal) remain unchanged... */}
      {viewPdfUrl && (
          <div className="fixed inset-0 z-[100] flex flex-col p-4 sm:p-8 animate-fade-up">
              <div className="absolute inset-0 bg-slate-900/95 backdrop-blur-md" onClick={() => setViewPdfUrl(null)}></div>
              <div className="relative flex-1 bg-white rounded-[2.5rem] overflow-hidden flex flex-col border border-white/20 shadow-2xl">
                  <div className="bg-slate-900 p-4 text-white flex justify-between items-center px-8">
                      <span className="font-bold text-sm tracking-tight">Resource Viewer</span>
                      <button onClick={() => setViewPdfUrl(null)} className="p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-colors"><X size={20} /></button>
                  </div>
                  <div className="flex-1 bg-slate-100 flex items-center justify-center p-4">
                    <iframe src={`https://docs.google.com/viewer?url=${encodeURIComponent(viewPdfUrl)}&embedded=true`} className="w-full h-full border-none rounded-3xl bg-white shadow-2xl" title="PDF Content" />
                  </div>
              </div>
          </div>
      )}

      {selectedResult && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md" onClick={() => setSelectedResult(null)}></div>
              <div className="relative bg-white rounded-[3rem] shadow-2xl w-full max-w-2xl overflow-hidden animate-fade-up max-h-[95vh] flex flex-col">
                  <div className="p-10 bg-brand-primary text-white shrink-0 relative">
                      <h3 className="text-3xl font-display font-black leading-tight">Evaluation Insight</h3>
                      <button onClick={() => setSelectedResult(null)} className="absolute top-8 right-8 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"><X size={24} /></button>
                  </div>
                  <div className="p-10 space-y-10 overflow-y-auto">
                      <div className="flex items-center justify-between p-10 bg-slate-50 rounded-[2.5rem] border border-slate-100 shadow-inner">
                          <div>
                              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Evaluated Score</div>
                              <div className="text-7xl font-black text-slate-900 tracking-tighter">{selectedResult.marks}</div>
                          </div>
                      </div>
                      <div className="space-y-4">
                          <h4 className="font-black text-slate-800 text-xl">Faculty Feedback</h4>
                          <div className="p-8 bg-brand-cream/40 rounded-[2rem] border-l-8 border-brand-primary text-sm italic leading-relaxed text-slate-700 shadow-sm">
                            "{selectedResult.feedback}"
                          </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                          <button onClick={() => handleWhatsAppShare(selectedResult)} className="flex items-center justify-center gap-4 p-5 bg-green-600 text-white rounded-[1.5rem] font-black text-sm shadow-xl shadow-green-600/20 hover:scale-[1.02] transition-all"><Share2 size={20} /> Share Result</button>
                          <button onClick={() => setSelectedResult(null)} className="p-5 border-2 border-slate-100 text-slate-700 rounded-[1.5rem] font-black text-sm hover:bg-slate-50 transition-all">Close</button>
                      </div>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};
