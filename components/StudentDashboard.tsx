
import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, FileText, LogOut, Upload, Download, CheckCircle, 
  Clock, AlertCircle, Menu, X, ShoppingBag, Loader2, Plus, ArrowRight, 
  MessageCircle, Award, Eye, FileSearch
} from 'lucide-react';
import { Button } from './Button';
import { TestSeries } from './TestSeries';
import { doc, onSnapshot } from 'firebase/firestore';
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

  const [newSub, setNewSub] = useState({ subject: 'FR', testName: 'Full Mock 1' });

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
        const unsub = onSnapshot(doc(db, "users", user.uid), (doc) => {
            setUserData(doc.data());
        });
        return () => unsub();
    }
  }, []);

  const handleFakeUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    onNewSubmission({
        ...newSub,
        status: 'submitted',
        fileNote: "PDF Uploaded via Firestore Metadata"
    });
    
    setIsSubmitting(false);
    setShowSubmitForm(false);
    alert("Paper Submitted Successfully!");
  };

  // Mock available question papers based on common ICAI subjects
  const availableQuestionPapers = [
    { id: 'q1', subject: 'Financial Reporting', name: 'Mock 1 (ICAI Pattern)', url: 'https://www.icai.org/post.html?post_id=17783' }, // Placeholder links
    { id: 'q2', subject: 'Advanced Auditing', name: 'Mock 1 (ICAI Pattern)', url: 'https://www.icai.org/post.html?post_id=17784' },
    { id: 'q3', subject: 'Direct Tax', name: 'Full Syllabus', url: 'https://www.icai.org/post.html?post_id=17785' },
  ];

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'checked':
        return <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold bg-green-100 text-green-800 shadow-sm border border-green-200"><CheckCircle size={10} /> Evaluated</span>;
      case 'submitted':
        return <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold bg-yellow-100 text-yellow-800 shadow-sm border border-yellow-200"><Clock size={10} /> Under Review</span>;
      default:
        return <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-200"><AlertCircle size={10} /> Draft</span>;
    }
  };

  const openPdfViewer = (url: string) => {
    // Google Docs Viewer integration
    const viewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true`;
    setViewPdfUrl(viewerUrl);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-brand-dark text-white transform transition-transform lg:translate-x-0 lg:static lg:block ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-16 flex items-center px-6 border-b border-white/5">
            <span className="font-display font-bold text-xl tracking-tight">Student<span className="text-brand-orange">Hub</span></span>
            <button onClick={() => setIsMobileMenuOpen(false)} className="ml-auto lg:hidden"><X size={20} /></button>
        </div>
        <nav className="p-4 space-y-1.5">
            {[
                { id: 'dashboard', icon: LayoutDashboard, label: 'Performance' },
                { id: 'papers', icon: FileSearch, label: 'Question Papers' },
                { id: 'tests', icon: FileText, label: 'My Submissions' },
                { id: 'plans', icon: ShoppingBag, label: 'Browse Plans' },
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
        <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-6 sm:px-10">
            <div className="flex items-center gap-4">
                <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden p-2 bg-slate-50 rounded-lg"><Menu size={20} /></button>
                <h1 className="text-xl font-bold text-slate-800">Welcome, {userData?.name || 'Student'}</h1>
            </div>
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand-orange flex items-center justify-center text-white text-sm font-bold border-2 border-white shadow-md">
                    {userData?.name?.charAt(0) || 'S'}
                </div>
            </div>
        </header>

        <main className="flex-1 p-6 sm:p-10 overflow-y-auto bg-slate-50/50">
            {activeTab === 'dashboard' && (
                <div className="max-w-6xl mx-auto space-y-10 animate-fade-up">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div>
                            <h2 className="text-2xl font-display font-bold text-slate-900">Your Progress</h2>
                            <p className="text-sm text-slate-500">Track your mock test results and feedback.</p>
                        </div>
                        <Button onClick={() => setShowSubmitForm(true)} className="gap-2 px-6 h-12 shadow-lg shadow-brand-orange/20"><Plus size={20} /> Submit New Paper</Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { label: "Total Papers", value: tests.length, icon: FileText, color: "text-blue-600", bg: "bg-blue-50" },
                            { label: "Checked", value: tests.filter(t => t.status === 'checked').length, icon: CheckCircle, color: "text-green-600", bg: "bg-green-50" },
                            { label: "Pending", value: tests.filter(t => t.status === 'submitted').length, icon: Clock, color: "text-orange-600", bg: "bg-orange-50" },
                        ].map((stat, i) => (
                            <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 flex items-center gap-5 shadow-sm">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${stat.bg} ${stat.color}`}><stat.icon size={28} /></div>
                                <div><div className="text-2xl font-black text-slate-900">{stat.value}</div><div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</div></div>
                            </div>
                        ))}
                    </div>

                    {showSubmitForm && (
                        <div className="bg-white p-8 rounded-3xl border-2 border-brand-primary shadow-2xl animate-fade-up relative overflow-hidden">
                            <h3 className="font-bold text-slate-800 text-lg mb-6 flex items-center gap-2"><Upload size={22} className="text-brand-primary" /> Submit Answer Sheet</h3>
                            <form onSubmit={handleFakeUpload} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Subject</label>
                                    <select className="w-full p-3 rounded-xl border-2 border-slate-100 text-sm" value={newSub.subject} onChange={(e) => setNewSub({...newSub, subject: e.target.value})}>
                                        <option>Financial Reporting</option>
                                        <option>Advanced Auditing</option>
                                        <option>Direct Tax</option>
                                        <option>Indirect Tax</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Test Name</label>
                                    <input type="text" placeholder="e.g. Mock 1" className="w-full p-3 rounded-xl border-2 border-slate-100 text-sm" value={newSub.testName} onChange={(e) => setNewSub({...newSub, testName: e.target.value})} />
                                </div>
                                <div className="flex items-end gap-3">
                                    <Button type="submit" fullWidth h-12 disabled={isSubmitting}>{isSubmitting ? <Loader2 size={18} className="animate-spin" /> : 'Submit'}</Button>
                                    <button type="button" onClick={() => setShowSubmitForm(false)} className="h-12 w-12 bg-slate-100 rounded-xl text-slate-400"><X size={20} /></button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            )}

            {activeTab === 'papers' && (
                <div className="max-w-6xl mx-auto space-y-6 animate-fade-up">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-display font-bold text-slate-900">Download Question Papers</h2>
                        {userData?.purchasedPlans?.length > 0 && <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">Plan Active</span>}
                    </div>

                    {userData?.purchasedPlans?.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {availableQuestionPapers.map(paper => (
                                <div key={paper.id} className="bg-white p-6 rounded-2xl border border-slate-200 flex items-center justify-between group hover:border-brand-primary transition-all shadow-sm">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:text-brand-primary transition-colors"><FileText size={24} /></div>
                                        <div>
                                            <div className="font-bold text-slate-800 text-sm">{paper.subject}</div>
                                            <div className="text-xs text-slate-400">{paper.name}</div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button onClick={() => openPdfViewer(paper.url)} className="p-2 text-slate-400 hover:text-brand-primary hover:bg-brand-primary/10 rounded-lg transition-all" title="View Online"><Eye size={18} /></button>
                                        <a href={paper.url} target="_blank" rel="noopener noreferrer" className="p-2 text-slate-400 hover:text-brand-orange hover:bg-brand-orange/10 rounded-lg transition-all" title="Download"><Download size={18} /></a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white p-16 rounded-[2rem] border-2 border-dashed border-slate-200 text-center">
                            <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-6 text-slate-400"><Lock size={40} /></div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-2">Access Locked</h3>
                            <p className="text-slate-500 mb-8 max-w-sm mx-auto">Question papers dekhne ke liye sabase pehle ek plan khareedein.</p>
                            <Button onClick={() => setActiveTab('plans')} size="lg">Explore Plans</Button>
                        </div>
                    )}
                </div>
            )}

            {activeTab === 'tests' && (
                <div className="max-w-6xl mx-auto animate-fade-up">
                    <h2 className="text-2xl font-display font-bold text-slate-900 mb-6">Submission History</h2>
                    <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
                        {tests.map((test) => (
                            <div key={test.id} className="p-6 flex flex-col sm:flex-row items-center justify-between hover:bg-slate-50 transition-colors gap-4 border-b last:border-none">
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${test.status === 'checked' ? 'bg-green-50 text-green-600' : 'bg-slate-50 text-slate-400'}`}><FileText size={20} /></div>
                                    <div><div className="font-bold text-slate-900 text-sm">{test.subject}</div><div className="text-slate-500 text-xs">{test.testName}</div></div>
                                </div>
                                <div className="flex items-center gap-6">
                                    {getStatusBadge(test.status)}
                                    {test.status === 'checked' ? (
                                        <div className="flex items-center gap-4">
                                            <div className="text-right">
                                                <div className="text-lg font-black text-brand-primary leading-none">{test.marks}</div>
                                            </div>
                                            <button onClick={() => setSelectedResult(test)} className="p-3 bg-brand-primary/10 text-brand-primary rounded-xl hover:bg-brand-primary hover:text-white"><Eye size={18} /></button>
                                        </div>
                                    ) : <span className="text-[10px] text-slate-400">Review in progress</span>}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            
            {activeTab === 'plans' && <div className="animate-fade-up max-w-6xl mx-auto"><TestSeries onBuyNow={onBuyPlan} /></div>}
        </main>
      </div>

      {/* PDF VIEWER MODAL */}
      {viewPdfUrl && (
          <div className="fixed inset-0 z-[100] flex flex-col p-4 md:p-8">
              <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-md" onClick={() => setViewPdfUrl(null)}></div>
              <div className="relative flex-1 bg-white rounded-2xl overflow-hidden flex flex-col animate-fade-up">
                  <div className="bg-slate-900 p-4 text-white flex justify-between items-center">
                      <span className="font-bold text-sm">Online Paper Viewer (via Google Docs)</span>
                      <button onClick={() => setViewPdfUrl(null)} className="p-2 hover:bg-white/10 rounded-full transition-colors"><X size={20} /></button>
                  </div>
                  <iframe src={viewPdfUrl} className="w-full h-full border-none" />
              </div>
          </div>
      )}

      {/* RESULT DETAIL MODAL */}
      {selectedResult && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md" onClick={() => setSelectedResult(null)}></div>
              <div className="relative bg-white rounded-[2rem] shadow-2xl w-full max-w-2xl overflow-hidden animate-fade-up max-h-[90vh] overflow-y-auto">
                  <div className="p-8 bg-brand-primary text-white">
                      <div className="flex items-center gap-4">
                          <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center"><Award size={32} /></div>
                          <div><h3 className="text-2xl font-display font-bold">Evaluation Report</h3><p className="text-white/70 text-sm">{selectedResult.subject}</p></div>
                      </div>
                  </div>
                  <div className="p-8 space-y-10">
                      <div className="flex items-center justify-between p-6 bg-slate-50 rounded-[1.5rem]">
                          <div><div className="text-[10px] font-black text-slate-400 uppercase mb-1">Score</div><div className="text-5xl font-black text-slate-900">{selectedResult.marks}</div></div>
                          <div className="text-xl font-bold text-green-600 flex items-center gap-2"><CheckCircle size={20} /> PASSED</div>
                      </div>
                      <div className="space-y-4">
                          <h4 className="font-bold text-slate-900 flex items-center gap-2"><MessageCircle size={20} className="text-brand-primary" /> Expert Feedback</h4>
                          <div className="p-6 bg-brand-cream/50 rounded-2xl border-l-4 border-brand-primary text-sm italic">"{selectedResult.feedback}"</div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <button onClick={() => openPdfViewer('https://www.icai.org/post.html?post_id=17783')} className="flex items-center justify-center gap-2 p-4 bg-slate-900 text-white rounded-2xl font-bold text-sm shadow-lg"><Eye size={18} /> View Checked Copy</button>
                          <button onClick={() => setViewPdfUrl(null)} className="p-4 border-2 border-slate-100 text-slate-700 rounded-2xl font-bold text-sm">Close</button>
                      </div>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};
