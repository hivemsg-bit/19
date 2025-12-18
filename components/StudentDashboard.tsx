
import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, FileText, LogOut, Upload, Download, CheckCircle, 
  Clock, AlertCircle, Menu, X, ShoppingBag, Loader2, Plus, ArrowRight, 
  MessageCircle, Award, Eye, FileSearch, Globe, Check, Lock, BarChart3, TrendingUp, Bell, Share2, Trash2, ExternalLink, FileWarning
} from 'lucide-react';
import { Button } from './Button';
import { TestSeries } from './TestSeries';
import { 
  doc, 
  onSnapshot, 
  collection, 
  query, 
  orderBy,
  deleteDoc
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
  const [showNotifications, setShowNotifications] = useState(false);

  const [newSub, setNewSub] = useState({ subject: 'Financial Reporting', testName: 'Full Mock 1' });

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
        const unsubUser = onSnapshot(doc(db, "users", user.uid), (doc) => {
            const data = doc.data();
            if (data?.status === 'inactive') {
                alert("Your account is inactive. Please contact admin.");
                onLogout();
            }
            setUserData(data);
        });
        
        const qPapers = query(collection(db, "availablePapers"), orderBy("createdAt", "desc"));
        const unsubPapers = onSnapshot(qPapers, (snapshot) => {
            setAvailPapers(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
        });

        return () => { unsubUser(); unsubPapers(); };
    }
  }, []);

  const handleFakeUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Adding student info for admin to verify
    await new Promise(resolve => setTimeout(resolve, 2000));
    onNewSubmission({
        ...newSub,
        status: 'submitted',
        fileNote: "PDF Answer Sheet Submitted",
        submittedAt: new Date().toISOString()
    });
    setIsSubmitting(false);
    setShowSubmitForm(false);
    alert("Paper Submitted Successfully! Our team will evaluate it within 48 hours.");
  };

  const handleWhatsAppShare = (result: any) => {
    const message = `Hey! I scored ${result.marks} in my ${result.subject} Mock Test on caexam.online! 🎯 The detailed evaluation really helped me find my mistakes. Check out their test series for Jan 2026!`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const deleteTestRecord = async (testId: string) => {
      if (window.confirm("Are you sure you want to delete this submission record? This will remove it from your list permanently.")) {
          try {
              await deleteDoc(doc(db, "tests", testId));
          } catch (e) {
              console.error(e);
          }
      }
  };

  const openPdfViewer = (url: string) => {
    if (!url) { 
        alert("Link not available. Please contact support."); 
        return; 
    }
    // Set URL and open modal
    setViewPdfUrl(url);
  };

  const getSubjectStats = () => {
    const checkedTests = tests.filter(t => t.status === 'checked' && t.marks);
    const subjects = ['Financial Reporting', 'Advanced Auditing', 'Direct Tax', 'Indirect Tax', 'Law'];
    return subjects.map(sub => {
        const subTests = checkedTests.filter(t => t.subject === sub);
        if (subTests.length === 0) return { name: sub, avg: 0, count: 0 };
        const total = subTests.reduce((acc, curr) => {
            const marksMatch = curr.marks.match(/^(\d+)/);
            const val = marksMatch ? parseInt(marksMatch[1]) : 0;
            return acc + val;
        }, 0);
        return { name: sub, avg: Math.round(total / subTests.length), count: subTests.length };
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'checked':
        return (
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-[10px] font-bold uppercase tracking-wider">
            Evaluated
          </span>
        );
      case 'submitted':
        return (
          <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-[10px] font-bold uppercase tracking-wider">
            In Review
          </span>
        );
      default:
        return (
          <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-[10px] font-bold uppercase tracking-wider">
            {status}
          </span>
        );
    }
  };

  const stats = getSubjectStats();
  const checkedCount = tests.filter(t => t.status === 'checked').length;
  const avgPerformance = stats.filter(s => s.count > 0).reduce((acc, curr) => acc + curr.avg, 0) / (stats.filter(s => s.count > 0).length || 1);

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-brand-dark text-white transform transition-transform lg:translate-x-0 lg:static lg:block ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-16 flex items-center px-6 border-b border-white/5">
            <span className="font-display font-bold text-xl tracking-tight">Student<span className="text-brand-orange">Hub</span></span>
            <button onClick={() => setIsMobileMenuOpen(false)} className="ml-auto lg:hidden"><X size={20} /></button>
        </div>
        <nav className="p-4 space-y-1.5">
            {[
                { id: 'dashboard', icon: LayoutDashboard, label: 'Control Center' },
                { id: 'analytics', icon: BarChart3, label: 'Analytics' },
                { id: 'papers', icon: FileSearch, label: 'Test Series Inventory' },
                { id: 'tests', icon: FileText, label: 'Evaluation Reports' },
                { id: 'plans', icon: ShoppingBag, label: 'Browse New Plans' },
            ].map((item) => (
                <button
                    key={item.id}
                    onClick={() => { setActiveTab(item.id); setIsMobileMenuOpen(false); }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === item.id ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/20' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                >
                    <item.icon size={18} /> {item.label}
                </button>
            ))}
        </nav>
        <div className="absolute bottom-6 left-6 right-6">
            <button onClick={onLogout} className="w-full flex items-center gap-2 px-4 py-2 text-red-400 font-bold text-sm hover:bg-red-500/10 rounded-xl transition-colors"><LogOut size={18} /> Sign Out</button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-6 sm:px-10 shrink-0">
            <div className="flex items-center gap-4">
                <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden p-2 bg-slate-50 rounded-lg"><Menu size={20} /></button>
                <h1 className="text-xl font-bold text-slate-800 truncate">Welcome, {userData?.name || 'Student'}</h1>
            </div>
            <div className="flex items-center gap-4">
                <button 
                  onClick={() => setShowNotifications(!showNotifications)} 
                  className="p-2.5 bg-slate-50 rounded-xl text-slate-500 hover:text-brand-orange transition-all relative"
                >
                    <Bell size={20} />
                    {checkedCount > 0 && <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>}
                </button>
                <div className="w-10 h-10 rounded-xl bg-brand-orange flex items-center justify-center text-white text-sm font-bold border-2 border-white shadow-md">
                    {userData?.name?.charAt(0) || 'S'}
                </div>
            </div>
        </header>

        {showNotifications && (
            <div className="absolute top-16 right-10 z-50 w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 p-4 animate-fade-up">
                <h4 className="font-bold text-sm mb-3">Recent Notifications</h4>
                <div className="space-y-3">
                    {tests.filter(t => t.status === 'checked').slice(0, 3).map((n, i) => (
                        <div key={i} className="flex gap-3 p-2 hover:bg-slate-50 rounded-lg cursor-pointer">
                            <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0"><CheckCircle size={14} /></div>
                            <div>
                                <p className="text-[11px] font-bold text-slate-800">Result Published: {n.subject}</p>
                                <p className="text-[10px] text-slate-500">Marks: {n.marks}</p>
                            </div>
                        </div>
                    ))}
                    {tests.filter(t => t.status === 'checked').length === 0 && <p className="text-[11px] text-center text-slate-400 py-4">No new updates.</p>}
                </div>
            </div>
        )}

        <main className="flex-1 p-6 sm:p-10 overflow-y-auto bg-slate-50/50">
            {activeTab === 'dashboard' && (
                <div className="max-w-6xl mx-auto space-y-10 animate-fade-up">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div>
                            <h2 className="text-2xl font-display font-bold text-slate-900">Training Progress</h2>
                            <p className="text-sm text-slate-500">Submit your papers and view evaluated reports.</p>
                        </div>
                        <Button onClick={() => setShowSubmitForm(true)} className="gap-2 px-6 h-12 shadow-lg shadow-brand-orange/20 font-black"><Plus size={20} /> Submit Solved Paper</Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { label: "Total Papers", value: tests.length, icon: FileText, color: "text-blue-600", bg: "bg-blue-50" },
                            { label: "Checked", value: checkedCount, icon: CheckCircle, color: "text-green-600", bg: "bg-green-50" },
                            { label: "In Review", value: tests.filter(t => t.status === 'submitted').length, icon: Clock, color: "text-orange-600", bg: "bg-orange-50" },
                        ].map((stat, i) => (
                            <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200 flex items-center gap-5 shadow-sm">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${stat.bg} ${stat.color}`}><stat.icon size={28} /></div>
                                <div><div className="text-2xl font-black text-slate-900">{stat.value}</div><div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</div></div>
                            </div>
                        ))}
                    </div>

                    {showSubmitForm && (
                        <div className="bg-white p-8 rounded-3xl border-2 border-brand-primary shadow-2xl animate-fade-up relative overflow-hidden">
                            <h3 className="font-bold text-slate-800 text-lg mb-6 flex items-center gap-2"><Upload size={22} className="text-brand-primary" /> Submit Your Answer Sheet</h3>
                            <form onSubmit={handleFakeUpload} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Subject</label>
                                    <select required className="w-full p-3 rounded-xl border-2 border-slate-100 text-sm focus:border-brand-primary outline-none" value={newSub.subject} onChange={(e) => setNewSub({...newSub, subject: e.target.value})}>
                                        <option>Financial Reporting</option>
                                        <option>Advanced Auditing</option>
                                        <option>Direct Tax</option>
                                        <option>Indirect Tax</option>
                                        <option>Law / Corporate</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Mock Version</label>
                                    <input type="text" required placeholder="e.g. Mock 1, Unit Test 2" className="w-full p-3 rounded-xl border-2 border-slate-100 text-sm focus:border-brand-primary outline-none" value={newSub.testName} onChange={(e) => setNewSub({...newSub, testName: e.target.value})} />
                                </div>
                                <div className="flex items-end gap-3">
                                    <Button type="submit" fullWidth className="h-12 font-bold shadow-md" disabled={isSubmitting}>{isSubmitting ? <Loader2 size={18} className="animate-spin" /> : 'Confirm Submission'}</Button>
                                    <button type="button" onClick={() => setShowSubmitForm(false)} className="h-12 w-12 flex items-center justify-center bg-slate-100 rounded-xl text-slate-400 hover:bg-slate-200 transition-colors"><X size={20} /></button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            )}

            {activeTab === 'analytics' && (
                <div className="max-w-6xl mx-auto space-y-8 animate-fade-up">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-display font-bold text-slate-900">Performance Analytics</h2>
                            <p className="text-sm text-slate-500">Visual breakdown of your strengths and exam readiness.</p>
                        </div>
                        <div className="px-4 py-2 bg-brand-primary/10 rounded-xl text-brand-primary font-bold text-sm flex items-center gap-2">
                            <TrendingUp size={18} /> Avg Score: {Math.round(avgPerformance)}%
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
                            <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">Subject-wise Proficiency</h3>
                            <div className="space-y-6">
                                {stats.map((s, i) => (
                                    <div key={i} className="space-y-2">
                                        <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-slate-500">
                                            <span>{s.name}</span>
                                            <span>{s.avg}%</span>
                                        </div>
                                        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                            <div 
                                                className={`h-full transition-all duration-1000 ${s.avg >= 60 ? 'bg-green-500' : s.avg >= 40 ? 'bg-orange-500' : 'bg-red-500'}`}
                                                style={{ width: `${s.avg}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-brand-dark text-white p-8 rounded-[2rem] shadow-xl relative overflow-hidden">
                            <div className="relative z-10">
                                <h3 className="font-bold text-xl mb-4 flex items-center gap-2 text-brand-orange"><AlertCircle size={22} /> Smart Insights</h3>
                                <div className="space-y-4">
                                    <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                                        <p className="text-xs text-brand-secondary font-bold uppercase mb-1">Target Focus</p>
                                        <p className="text-sm">Aapka <b>Audit</b> score pichle 2 tests se drop ho raha hai. Is par dhyaan dein.</p>
                                    </div>
                                    <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                                        <p className="text-xs text-brand-secondary font-bold uppercase mb-1">Strong Area</p>
                                        <p className="text-sm"><b>Financial Reporting</b> mein aap consistently 70+ score kar rahe hain. Keep it up!</p>
                                    </div>
                                    <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                                        <p className="text-xs text-brand-secondary font-bold uppercase mb-1">Presentation Tip</p>
                                        <p className="text-sm">Exam mein Section numbers likhne se aapka score 5-10 marks badh sakta hai.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute -bottom-10 -right-10 opacity-10">
                                <TrendingUp size={240} />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'papers' && (
                <div className="max-w-6xl mx-auto space-y-8 animate-fade-up">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-display font-bold text-slate-900">Question Paper Inventory</h2>
                            <p className="text-sm text-slate-500">Papers available for your current course/level.</p>
                        </div>
                    </div>

                    {userData?.purchasedPlans?.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                            {availPapers.length > 0 ? availPapers.map(paper => (
                                <div key={paper.id} className="bg-white p-6 rounded-3xl border border-slate-200 flex items-center justify-between group hover:border-brand-primary hover:shadow-lg transition-all shadow-sm">
                                    <div className="flex items-center gap-5">
                                        <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-brand-primary/10 group-hover:text-brand-primary transition-all"><FileSearch size={28} /></div>
                                        <div>
                                            <div className="font-bold text-slate-800 text-base leading-tight">{paper.subject}</div>
                                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 flex items-center gap-2">
                                              <span>{paper.title}</span>
                                              <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                                              <span className="text-brand-primary">{paper.level}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button onClick={() => openPdfViewer(paper.pdfUrl)} className="p-3 text-slate-400 hover:text-brand-primary hover:bg-brand-primary/10 rounded-xl transition-all" title="Direct Preview"><Eye size={20} /></button>
                                        <a href={paper.pdfUrl} target="_blank" rel="noopener noreferrer" className="p-3 text-slate-400 hover:text-brand-orange hover:bg-brand-orange/10 rounded-xl transition-all" title="Download PDF"><Download size={20} /></a>
                                    </div>
                                </div>
                            )) : (
                                <div className="col-span-full py-32 text-center bg-white rounded-3xl border-2 border-dashed flex flex-col items-center justify-center gap-4 text-slate-400">
                                    <Globe size={48} className="opacity-20" />
                                    <h4 className="font-bold uppercase tracking-widest text-xs">Waiting for Admin to publish new papers...</h4>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="bg-white p-20 rounded-[3rem] border-2 border-dashed border-slate-200 text-center shadow-inner">
                            <div className="w-24 h-24 bg-slate-50 rounded-[2rem] flex items-center justify-center mx-auto mb-8 text-slate-400"><Lock size={48} /></div>
                            <h3 className="text-3xl font-bold text-slate-900 mb-4">Course Content Locked</h3>
                            <p className="text-slate-500 mb-10 max-w-sm mx-auto leading-relaxed">Please enroll in a test series plan to unlock access to ICAI-pattern mock papers and detailed evaluation.</p>
                            <Button onClick={() => setActiveTab('plans')} size="lg" className="px-10 font-black shadow-xl shadow-brand-orange/20">Enroll Now</Button>
                        </div>
                    )}
                </div>
            )}

            {activeTab === 'tests' && (
                <div className="max-w-6xl mx-auto animate-fade-up">
                    <h2 className="text-2xl font-display font-bold text-slate-900 mb-8">Evaluation Reports</h2>
                    <div className="bg-white rounded-[2rem] border border-slate-200 overflow-hidden shadow-sm">
                        {tests.length > 0 ? tests.map((test) => (
                            <div key={test.id} className="p-8 flex flex-col sm:flex-row items-center justify-between hover:bg-slate-50/50 transition-colors gap-6 border-b last:border-none">
                                <div className="flex items-center gap-5">
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${test.status === 'checked' ? 'bg-green-50 text-green-600' : 'bg-slate-50 text-slate-400'}`}><FileText size={24} /></div>
                                    <div>
                                      <div className="font-bold text-slate-900 text-base">{test.subject}</div>
                                      <div className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-0.5">{test.testName}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6">
                                    {getStatusBadge(test.status)}
                                    {test.status === 'checked' ? (
                                        <div className="flex items-center gap-4">
                                            <div className="text-right">
                                                <div className="text-2xl font-black text-brand-primary leading-none">{test.marks}</div>
                                            </div>
                                            <button onClick={() => setSelectedResult(test)} className="p-3 bg-brand-primary/10 text-brand-primary rounded-xl hover:bg-brand-primary hover:text-white transition-all" title="View Detailed Feedback"><MessageCircle size={20} /></button>
                                            {test.checkedPdfUrl && (
                                                <button onClick={() => openPdfViewer(test.checkedPdfUrl)} className="p-3 bg-brand-orange/10 text-brand-orange rounded-xl hover:bg-brand-orange hover:text-white transition-all" title="Open Evaluated Paper"><Eye size={20} /></button>
                                            )}
                                        </div>
                                    ) : (
                                      <div className="flex items-center gap-2 text-slate-400 italic text-[11px] bg-slate-50 px-4 py-2 rounded-xl">
                                        <Loader2 size={12} className="animate-spin" /> Evaluating within 48h
                                      </div>
                                    )}
                                    <button onClick={() => deleteTestRecord(test.id)} className="p-3 text-slate-300 hover:text-red-500 transition-colors" title="Delete Entry"><Trash2 size={20} /></button>
                                </div>
                            </div>
                        )) : (
                          <div className="py-24 text-center text-slate-400 flex flex-col items-center gap-4">
                            <FileText size={48} className="opacity-10" />
                            <p className="font-bold">No submissions yet.</p>
                            <Button size="sm" onClick={() => setActiveTab('dashboard')} variant="outline">Submit your first paper</Button>
                          </div>
                        )}
                    </div>
                </div>
            )}
            
            {activeTab === 'plans' && <div className="animate-fade-up max-w-6xl mx-auto"><TestSeries onBuyNow={onBuyPlan} /></div>}
        </main>
      </div>

      {/* RE-ENGINEERED PDF VIEWER MODAL */}
      {viewPdfUrl && (
          <div className="fixed inset-0 z-[100] flex flex-col p-4 md:p-8">
              <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-md" onClick={() => setViewPdfUrl(null)}></div>
              <div className="relative flex-1 bg-white rounded-3xl overflow-hidden flex flex-col animate-fade-up border border-white/20 shadow-2xl">
                  <div className="bg-slate-900 p-4 text-white flex justify-between items-center px-6 shrink-0">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-brand-orange/20 rounded-lg"><FileText size={18} className="text-brand-orange" /></div>
                        <div>
                          <span className="font-bold text-sm block leading-none">PDF Viewer</span>
                          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Secure Document Access</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <a href={viewPdfUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-brand-primary text-white hover:bg-brand-primary/80 rounded-xl text-xs font-bold transition-all shadow-lg">
                            <ExternalLink size={14} /> Open Full / Download
                        </a>
                        <button onClick={() => setViewPdfUrl(null)} className="p-2.5 bg-white/10 hover:bg-white/20 rounded-xl transition-all"><X size={20} /></button>
                      </div>
                  </div>
                  <div className="flex-1 bg-slate-100 flex flex-col items-center justify-center p-4">
                    {/* Embedded Viewer with Fallback Message */}
                    <div className="w-full h-full bg-white rounded-xl shadow-inner overflow-hidden border border-slate-200 relative">
                        <iframe 
                            src={viewPdfUrl.includes('google.com') ? viewPdfUrl : `https://docs.google.com/viewer?url=${encodeURIComponent(viewPdfUrl)}&embedded=true`} 
                            className="w-full h-full border-none" 
                            title="Paper Content" 
                        />
                        {/* Hidden underlying support info for mobile/restricted browsers */}
                        <div className="absolute inset-0 z-[-1] flex flex-col items-center justify-center text-center p-8 text-slate-400">
                             <FileWarning size={48} className="mb-4 opacity-20" />
                             <p className="font-bold text-slate-500 mb-2">If you cannot see the PDF content above</p>
                             <p className="text-xs">Your browser might be blocking the embedded viewer. Please click the <b>"Open Full / Download"</b> button at the top right.</p>
                        </div>
                    </div>
                  </div>
              </div>
          </div>
      )}

      {selectedResult && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md" onClick={() => setSelectedResult(null)}></div>
              <div className="relative bg-white rounded-[3rem] shadow-2xl w-full max-w-2xl overflow-hidden animate-fade-up max-h-[90vh] flex flex-col">
                  <div className="p-10 bg-brand-primary text-white shrink-0">
                      <div className="flex items-center gap-6">
                          <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center shadow-inner"><Award size={48} /></div>
                          <div>
                            <h3 className="text-3xl font-display font-bold">Evaluation Summary</h3>
                            <p className="text-white/80 font-bold uppercase tracking-widest text-[11px] mt-1">{selectedResult.subject} • {selectedResult.testName}</p>
                          </div>
                      </div>
                  </div>
                  <div className="p-10 space-y-8 overflow-y-auto">
                      <div className="flex items-center justify-between p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100">
                          <div><div className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1">Marks Awarded</div><div className="text-6xl font-black text-slate-900 tracking-tighter">{selectedResult.marks}</div></div>
                          <div className="text-center">
                            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-2"><CheckCircle size={32} /></div>
                            <div className="text-xl font-black text-green-600">PASSED</div>
                          </div>
                      </div>
                      <div className="space-y-4">
                          <h4 className="font-bold text-slate-900 text-lg flex items-center gap-2"><MessageCircle size={22} className="text-brand-primary" /> Examiner Feedback</h4>
                          <div className="p-8 bg-brand-cream/40 rounded-[2rem] border-l-8 border-brand-primary text-sm italic leading-relaxed text-slate-700 shadow-sm">
                            "{selectedResult.feedback}"
                          </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                          <button 
                            onClick={() => handleWhatsAppShare(selectedResult)} 
                            className="flex items-center justify-center gap-3 p-5 bg-green-600 text-white rounded-[1.5rem] font-black text-sm shadow-xl hover:bg-green-700 transition-all"
                          >
                            <Share2 size={20} /> Share Result on WhatsApp
                          </button>
                          {selectedResult.checkedPdfUrl && (
                              <button onClick={() => openPdfViewer(selectedResult.checkedPdfUrl)} className="flex items-center justify-center gap-3 p-5 bg-slate-900 text-white rounded-[1.5rem] font-black text-sm shadow-xl hover:bg-slate-800 transition-all"><Eye size={20} /> View Evaluated Copy</button>
                          )}
                      </div>
                      <button onClick={() => setSelectedResult(null)} className="mt-4 p-5 border-2 border-slate-100 text-slate-700 rounded-[1.5rem] font-bold text-sm hover:bg-slate-50 transition-all w-full">Close Report</button>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};
