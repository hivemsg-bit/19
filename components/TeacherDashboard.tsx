
import React, { useState } from 'react';
import { 
  LayoutDashboard, FileText, LogOut, CheckSquare, MessageCircle, 
  Upload, Eye, Clock, ShieldAlert, X, Save, Loader2, Menu, AlertCircle, RefreshCcw, CheckCircle
} from 'lucide-react';
import { Button } from './Button';
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../lib/firebase';

interface TeacherDashboardProps {
  onLogout: () => void;
  tests: any[];
  onUpdateTest: (test: any) => void;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ onLogout, tests, onUpdateTest }) => {
  const [activeTab, setActiveTab] = useState('tasks');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [evaluatingTest, setEvaluatingTest] = useState<any | null>(null);
  const [evalData, setEvalData] = useState({ marks: '', feedback: '', checkedPdfUrl: '' });
  const [isSaving, setIsSaving] = useState(false);

  const handleStartEvaluation = (test: any) => {
    setEvaluatingTest(test);
    setEvalData({
      marks: test.marks || '',
      feedback: test.feedback || '',
      checkedPdfUrl: test.checkedPdfUrl || ''
    });
  };

  const handleSaveEvaluation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!evalData.marks || !evalData.checkedPdfUrl) { alert("Please fill all details."); return; }
    setIsSaving(true);
    try {
        await updateDoc(doc(db, "tests", evaluatingTest.id), {
            ...evalData,
            assignmentStatus: 'pending_approval',
            evaluatedAt: serverTimestamp()
        });
        setEvaluatingTest(null);
        alert("Evaluation submitted for Admin Review!");
    } catch (err) { console.error(err); }
    setIsSaving(false);
  };

  const pendingTasks = tests.filter(t => t.assignmentStatus === 'assigned' || t.assignmentStatus === 'rejected');
  const finishedTasks = tests.filter(t => t.assignmentStatus === 'pending_approval' || t.assignmentStatus === 'approved');

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-[45] lg:hidden" onClick={() => setIsMobileMenuOpen(false)}></div>
      )}

      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white transform transition-transform duration-300 lg:translate-x-0 lg:static lg:block ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-16 flex items-center px-6 border-b border-white/5">
            <span className="font-display font-bold text-lg text-white">Expert<span className="text-brand-orange">Checker</span></span>
            <button onClick={() => setIsMobileMenuOpen(false)} className="ml-auto lg:hidden p-1 hover:bg-white/10 rounded-lg"><X size={20} /></button>
        </div>
        <nav className="p-4 space-y-1.5">
            {[
                { id: 'tasks', icon: CheckSquare, label: 'My Tasks', badge: pendingTasks.length },
                { id: 'history', icon: Clock, label: 'History' },
            ].map((item) => (
                <button
                    key={item.id}
                    onClick={() => { setActiveTab(item.id); setIsMobileMenuOpen(false); }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === item.id ? 'bg-brand-primary text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                >
                    <item.icon size={18} /> {item.label}
                    {item.badge ? <span className="ml-auto bg-brand-orange text-white text-[10px] px-2 py-0.5 rounded-full">{item.badge}</span> : null}
                </button>
            ))}
        </nav>
        <div className="absolute bottom-6 left-6 right-6">
            <button onClick={onLogout} className="w-full flex items-center gap-2 px-4 py-2 text-red-400 font-bold text-sm hover:bg-red-500/10 rounded-xl transition-colors"><LogOut size={18} /> Sign Out</button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-6 sm:px-10 shrink-0">
            <div className="flex items-center gap-4">
                <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden p-2 bg-slate-50 rounded-lg text-slate-600"><Menu size={20} /></button>
                <h1 className="text-xl font-bold text-slate-800">Assigned Tasks</h1>
            </div>
            <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Expert Account</p>
                    <p className="text-xs font-bold text-slate-800">{auth.currentUser?.displayName}</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-brand-primary flex items-center justify-center text-white font-bold text-sm">EX</div>
            </div>
        </header>

        <main className="flex-1 p-6 sm:p-10 overflow-y-auto">
            {activeTab === 'tasks' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-up">
                    {pendingTasks.map(task => (
                        <div key={task.id} className={`bg-white p-6 rounded-3xl border shadow-sm flex flex-col justify-between ${task.assignmentStatus === 'rejected' ? 'border-red-200 bg-red-50/10' : 'border-slate-200'}`}>
                            <div>
                                <div className="flex justify-between items-start mb-4">
                                    <span className="px-3 py-1 bg-brand-primary/10 text-brand-primary rounded-full text-[10px] font-black uppercase">{task.subject}</span>
                                    {task.assignmentStatus === 'rejected' && <span className="flex items-center gap-1 text-[10px] font-bold text-red-600 animate-pulse"><ShieldAlert size={12} /> ACTION REQUIRED</span>}
                                </div>
                                <h3 className="font-bold text-slate-800 text-lg mb-1">{task.studentName}</h3>
                                <p className="text-[10px] text-slate-400 font-bold uppercase mb-4">{task.testName}</p>
                                
                                {task.assignmentStatus === 'rejected' && (
                                    <div className="bg-red-50 p-4 rounded-2xl border border-red-100 mb-6">
                                        <p className="text-[9px] font-black text-red-600 uppercase mb-1">Admin Rejection Comment:</p>
                                        <p className="text-xs text-red-700 italic">"{task.adminComment}"</p>
                                    </div>
                                )}
                            </div>
                            <Button fullWidth onClick={() => handleStartEvaluation(task)}>
                                {task.assignmentStatus === 'rejected' ? 'Re-Evaluate Paper' : 'Start Evaluation'}
                            </Button>
                        </div>
                    ))}
                    {pendingTasks.length === 0 && <div className="col-span-full py-20 text-center text-slate-400 border-2 border-dashed rounded-3xl bg-white/50 font-bold">Great Job! All assigned copies are checked.</div>}
                </div>
            )}

            {activeTab === 'history' && (
                <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm animate-fade-up">
                    {finishedTasks.length > 0 ? finishedTasks.map(task => (
                        <div key={task.id} className="p-6 flex items-center justify-between border-b last:border-none hover:bg-slate-50 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${task.assignmentStatus === 'approved' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>
                                    {task.assignmentStatus === 'approved' ? <CheckCircle size={22} /> : <RefreshCcw size={22} className="animate-spin-slow" />}
                                </div>
                                <div>
                                    <div className="font-bold text-slate-800">{task.studentName}</div>
                                    <div className="text-[10px] text-slate-400 font-bold uppercase">{task.subject} • {task.testName}</div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className={`text-xs font-black uppercase tracking-widest ${task.assignmentStatus === 'approved' ? 'text-green-600' : 'text-blue-600'}`}>
                                    {task.assignmentStatus.replace('_', ' ')}
                                </div>
                                <div className="text-[10px] text-slate-400 font-bold">{new Date(task.evaluatedAt?.seconds * 1000).toLocaleDateString()}</div>
                            </div>
                        </div>
                    )) : <div className="py-20 text-center text-slate-400 font-bold">No history available yet.</div>}
                </div>
            )}
        </main>
      </div>

      {/* EVALUATION MODAL */}
      {evaluatingTest && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md" onClick={() => setEvaluatingTest(null)}></div>
              <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden animate-fade-up max-h-[95vh] flex flex-col">
                  <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-brand-primary text-white shrink-0">
                      <h3 className="font-bold text-lg">Evaluation Form</h3>
                      <button onClick={() => setEvaluatingTest(null)} className="p-2 hover:bg-white/10 rounded-full"><X size={20} /></button>
                  </div>
                  <form onSubmit={handleSaveEvaluation} className="p-8 space-y-6 overflow-y-auto">
                      <div className="bg-slate-50 p-4 rounded-2xl flex items-center justify-between">
                         <div>
                            <span className="text-[10px] font-black text-slate-400 uppercase">Current Task</span>
                            <div className="font-bold text-slate-800">{evaluatingTest.studentName} - {evaluatingTest.subject}</div>
                         </div>
                         <Button type="button" size="sm" variant="outline" className="h-10 text-[10px]">View Student Sheet</Button>
                      </div>

                      <div className="space-y-4">
                          <div className="space-y-1">
                              <label className="text-[10px] font-bold text-slate-400 uppercase">Awarded Marks (e.g. 82/100)</label>
                              <input type="text" required placeholder="82/100" className="w-full p-4 bg-slate-50 border-none rounded-2xl text-sm font-bold" value={evalData.marks} onChange={e => setEvalData({...evalData, marks: e.target.value})} />
                          </div>
                          <div className="space-y-1">
                              <label className="text-[10px] font-bold text-slate-400 uppercase">Checked PDF Link (Shareable Link)</label>
                              <input type="url" required placeholder="Google Drive / Dropbox Link" className="w-full p-4 bg-slate-50 border-none rounded-2xl text-sm" value={evalData.checkedPdfUrl} onChange={e => setEvalData({...evalData, checkedPdfUrl: e.target.value})} />
                          </div>
                          <div className="space-y-1">
                              <label className="text-[10px] font-bold text-slate-400 uppercase">Corrective Feedback & Tips</label>
                              <textarea rows={5} required placeholder="Be specific about presentation and ICAI keywords..." className="w-full p-4 bg-slate-50 border-none rounded-2xl text-sm resize-none" value={evalData.feedback} onChange={e => setEvalData({...evalData, feedback: e.target.value})}></textarea>
                          </div>
                      </div>

                      <div className="flex gap-4 pt-4 shrink-0">
                          <Button type="submit" fullWidth disabled={isSaving}>
                              {isSaving ? <Loader2 className="animate-spin mr-2" size={18} /> : <Save className="mr-2" size={18} />}
                              Submit to Admin for Review
                          </Button>
                      </div>
                  </form>
              </div>
          </div>
      )}
    </div>
  );
};
