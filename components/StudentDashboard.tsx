
import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, FileText, LogOut, Upload, Download, CheckCircle, 
  Clock, AlertCircle, Menu, X, ShoppingBag, Loader2, Plus, ArrowRight, 
  MessageCircle, Award, Eye, FileSearch, Globe, Check, Lock, BarChart3, TrendingUp, Bell, Share2, Trash2, ExternalLink, FileWarning, HelpCircle, Megaphone, UserCircle, Calendar, Target, SearchX, BookOpen, CheckSquare, Sparkles, Filter, Book, Bookmark
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
  const [showSubmitForm, setShowSubmitForm] = useState(false);
  const [selectedResult, setSelectedResult] = useState<any | null>(null);
  const [viewPdfUrl, setViewPdfUrl] = useState<string | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [availPapers, setAvailPapers] = useState<any[]>([]);
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [doubts, setDoubts] = useState<any[]>([]);
  const [newDoubt, setNewDoubt] = useState({ subject: 'Financial Reporting', query: '' });
  const [isSendingDoubt, setIsSendingDoubt] = useState(false);
  const [newSub, setNewSub] = useState({ subject: 'Financial Reporting', testName: '' });

  // Material Library Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Mock Test', 'RTP (ICAI)', 'MTP (ICAI)', 'Past Paper', 'Revision Notes'];

  const openPdfViewer = (url: string | undefined) => {
    if (url) setViewPdfUrl(url);
  };

  const handleWhatsAppShare = (result: any) => {
    const text = `I just got my results for ${result.subject} test on caexam.online and I scored ${result.marks}! The feedback from rankers is amazing.`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const [studyGoals, setStudyGoals] = useState([
    { id: 1, task: 'Complete IndAS 115 Practice', done: false },
    { id: 2, task: 'Audit Ethics Case Studies', done: true },
    { id: 3, task: 'Direct Tax - PGBP Revision', done: false },
  ]);

  const [daysLeft, setDaysLeft] = useState(0);

  useEffect(() => {
    const targetDate = new Date('2026-01-01').getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      setDaysLeft(Math.floor(distance / (1000 * 60 * 60 * 24)));
    }, 1000);

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

        const qDoubts = query(collection(db, "doubts"), orderBy("createdAt", "desc"));
        onSnapshot(qDoubts, (snapshot) => {
            setDoubts(snapshot.docs.filter(d => d.data().studentId === user.uid).map(d => ({ id: d.id, ...d.data() })));
        });

        return () => clearInterval(interval);
    }
  }, []);

  const handleFakeUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!newSub.testName) return;
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    onNewSubmission({ ...newSub, status: 'submitted', submittedAt: new Date().toISOString() });
    setIsSubmitting(false);
    setShowSubmitForm(false);
    setNewSub({ subject: 'Financial Reporting', testName: '' });
  };

  const handlePostDoubt = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDoubt.query) return;
    setIsSendingDoubt(true);
    await addDoc(collection(db, "doubts"), {
        ...newDoubt,
        studentId: auth.currentUser?.uid,
        studentName: userData?.name,
        status: 'pending',
        createdAt: serverTimestamp()
    });
    setNewDoubt({ ...newDoubt, query: '' });
    setIsSendingDoubt(false);
  };

  const filteredMaterials = availPapers.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-100 flex font-sans">
      <AICoach />
      
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-[45] lg:hidden" onClick={() => setIsMobileMenuOpen(false)}></div>
      )}

      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white transform transition-transform duration-300 lg:translate-x-0 lg:static lg:block ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-16 flex items-center px-6 border-b border-white/5">
            <span className="font-display font-bold text-xl tracking-tight text-white">Student<span className="text-brand-orange">Portal</span></span>
            <button onClick={() => setIsMobileMenuOpen(false)} className="ml-auto lg:hidden p-1 hover:bg-white/10 rounded-lg"><X size={20} /></button>
        </div>
        <nav className="p-4 space-y-1.5 overflow-y-auto no-scrollbar" style={{ height: 'calc(100vh - 120px)' }}>
            {[
                { id: 'dashboard', icon: LayoutDashboard, label: 'Overview' },
                { id: 'tests', icon: FileText, label: 'My Submissions', badge: tests.length },
                { id: 'papers', icon: BookOpen, label: 'Material Library', badge: availPapers.length },
                { id: 'analytics', icon: BarChart3, label: 'Performance' },
                { id: 'planner', icon: Calendar, label: 'Study Planner' },
                { id: 'doubts', icon: HelpCircle, label: 'Doubt Portal' },
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
                    <h1 className="text-lg font-bold text-slate-800">Welcome, {userData?.name?.split(' ')[0] || 'Student'}</h1>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Target: Jan 2026 Attempt</p>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <div className="hidden md:flex items-center gap-3 bg-brand-cream/50 px-4 py-1.5 rounded-full border border-brand-primary/20">
                    <Clock size={14} className="text-brand-orange" />
                    <span className="text-[10px] font-black text-brand-dark uppercase tracking-tighter">{daysLeft} Days to Exams</span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white text-sm font-bold border-2 border-white shadow-md">
                    {userData?.name?.charAt(0) || 'S'}
                </div>
            </div>
        </header>

        <main className="flex-1 p-4 sm:p-8 overflow-y-auto bg-slate-50/50">
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

            {/* MATERIAL LIBRARY TAB */}
            {activeTab === 'papers' && (
                <div className="max-w-6xl mx-auto space-y-8 animate-fade-up">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900">Material Library</h2>
                            <p className="text-sm text-slate-500">Official ICAI Resources & Expert Revision Notes.</p>
                        </div>
                        <div className="relative w-full md:w-80">
                            <SearchX size={18} className="absolute left-4 top-3.5 text-slate-400" />
                            <input 
                              type="text" 
                              placeholder="Search by subject or title..." 
                              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white border border-slate-200 text-sm shadow-sm focus:ring-2 focus:ring-brand-primary/20"
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Category Tabs */}
                    <div className="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${activeCategory === cat ? 'bg-brand-primary text-white border-brand-primary shadow-lg shadow-brand-primary/20' : 'bg-white text-slate-500 border-slate-200 hover:border-brand-primary'}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {filteredMaterials.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredMaterials.map((p) => (
                                <div key={p.id} className="bg-white p-6 rounded-[2.5rem] border border-slate-200 flex flex-col justify-between group hover:border-brand-primary transition-all shadow-sm relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-4">
                                        <div className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${p.category === 'Mock Test' ? 'bg-orange-50 text-brand-orange' : 'bg-blue-50 text-blue-600'}`}>
                                            {p.category}
                                        </div>
                                    </div>
                                    <div className="mb-6">
                                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform ${p.category === 'Revision Notes' ? 'bg-purple-50 text-purple-600' : 'bg-slate-50 text-slate-400'}`}>
                                            {p.category === 'Revision Notes' ? <Book size={28} /> : <FileSearch size={28} />}
                                        </div>
                                        <div>
                                            <h3 className="font-black text-slate-800 text-lg leading-tight mb-2 group-hover:text-brand-primary transition-colors">{p.title}</h3>
                                            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                                <Bookmark size={12} className="text-brand-orange" />
                                                {p.subject} • {p.level}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button 
                                            onClick={() => openPdfViewer(p.pdfUrl)} 
                                            className="flex-1 flex items-center justify-center gap-2 py-3 bg-slate-50 text-slate-600 hover:bg-brand-primary/10 hover:text-brand-primary rounded-xl transition-all text-[10px] font-black uppercase tracking-wider"
                                        >
                                            <Eye size={16} /> Preview
                                        </button>
                                        <a 
                                            href={p.pdfUrl} 
                                            target="_blank" 
                                            rel="noopener noreferrer" 
                                            className="flex-1 flex items-center justify-center gap-2 py-3 bg-brand-primary text-white hover:bg-brand-dark rounded-xl transition-all text-[10px] font-black uppercase tracking-wider shadow-lg shadow-brand-primary/10"
                                        >
                                            <Download size={16} /> Download
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="py-32 text-center bg-white rounded-[3rem] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center">
                            <SearchX size={60} className="text-slate-100 mb-6" />
                            <h3 className="font-bold text-slate-800 text-xl">No resources found</h3>
                            <p className="text-sm text-slate-500 max-w-xs mt-2">Try searching for a different keyword or change your category filter.</p>
                            <Button variant="ghost" onClick={() => { setSearchQuery(''); setActiveCategory('All'); }} className="mt-4 text-brand-primary">Clear all filters</Button>
                        </div>
                    )}
                </div>
            )}

            {/* Other tabs logic... */}
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

      {/* PDF VIEWER MODAL */}
      {viewPdfUrl && (
          <div className="fixed inset-0 z-[100] flex flex-col p-4 sm:p-8 animate-fade-up">
              <div className="absolute inset-0 bg-slate-900/95 backdrop-blur-md" onClick={() => setViewPdfUrl(null)}></div>
              <div className="relative flex-1 bg-white rounded-[2.5rem] overflow-hidden flex flex-col border border-white/20 shadow-2xl">
                  <div className="bg-slate-900 p-4 text-white flex justify-between items-center px-8">
                      <div className="flex items-center gap-3">
                        <FileText size={20} className="text-brand-orange" />
                        <span className="font-bold text-sm tracking-tight">Resource Viewer</span>
                      </div>
                      <div className="flex gap-4">
                        <a href={viewPdfUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-2 bg-brand-primary text-white hover:bg-brand-primary/80 rounded-xl text-xs font-black uppercase transition-all shadow-lg shadow-brand-primary/20">
                            <ExternalLink size={16} /> Open Full
                        </a>
                        <button onClick={() => setViewPdfUrl(null)} className="p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-colors"><X size={20} /></button>
                      </div>
                  </div>
                  <div className="flex-1 bg-slate-100 flex items-center justify-center p-4">
                    <iframe 
                        src={`https://docs.google.com/viewer?url=${encodeURIComponent(viewPdfUrl)}&embedded=true`} 
                        className="w-full h-full border-none rounded-3xl bg-white shadow-2xl" 
                        title="PDF Content" 
                    />
                  </div>
              </div>
          </div>
      )}

      {/* RESULT MODAL */}
      {selectedResult && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md" onClick={() => setSelectedResult(null)}></div>
              <div className="relative bg-white rounded-[3rem] shadow-2xl w-full max-w-2xl overflow-hidden animate-fade-up max-h-[95vh] flex flex-col">
                  <div className="p-10 bg-brand-primary text-white shrink-0 relative">
                      <div className="flex items-center gap-8 relative z-10">
                          <div className="w-24 h-24 bg-white/20 rounded-[2rem] flex items-center justify-center shadow-inner shrink-0 border border-white/10"><Award size={48} /></div>
                          <div>
                            <h3 className="text-3xl font-display font-black leading-tight">Evaluation Insight</h3>
                            <p className="text-white/80 font-black uppercase tracking-widest text-[10px] mt-2">{selectedResult.subject} • {selectedResult.testName}</p>
                          </div>
                      </div>
                      <button onClick={() => setSelectedResult(null)} className="absolute top-8 right-8 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"><X size={24} /></button>
                  </div>
                  <div className="p-10 space-y-10 overflow-y-auto">
                      <div className="flex items-center justify-between p-10 bg-slate-50 rounded-[2.5rem] border border-slate-100 shadow-inner">
                          <div>
                              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Evaluated Score</div>
                              <div className="text-7xl font-black text-slate-900 tracking-tighter">{selectedResult.marks}</div>
                          </div>
                          <div className="text-center">
                              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg"><CheckCircle size={32} /></div>
                              <div className="text-xs font-black text-green-600 uppercase tracking-widest">Verified by Expert</div>
                          </div>
                      </div>
                      <div className="space-y-4">
                          <h4 className="font-black text-slate-800 text-xl flex items-center gap-3"><MessageCircle size={24} className="text-brand-primary" /> Faculty Feedback</h4>
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
