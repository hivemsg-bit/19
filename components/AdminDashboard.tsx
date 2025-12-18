import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Users, FileText, CheckSquare, LogOut, Search, Plus, 
  Upload, Download, Trash2, DollarSign, Menu, X, Pencil, Save, 
  PhoneIncoming, Check, Loader2, MessageSquare, Award, CheckCircle, Eye, Globe
} from 'lucide-react';
import { Button } from './Button';
import { doc, updateDoc, serverTimestamp, collection, addDoc, onSnapshot, deleteDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface AdminDashboardProps {
  onLogout: () => void;
  callbackRequests?: any[];
  allSharedTests: any[];
  onUpdateTest: (test: any) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout, callbackRequests = [], allSharedTests, onUpdateTest }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [evaluatingTest, setEvaluatingTest] = useState<any | null>(null);
  const [evalData, setEvalData] = useState({ marks: '', feedback: '', checkedPdfUrl: '' });
  const [isSaving, setIsSaving] = useState(false);
  
  // Manage Papers State
  const [availPapers, setAvailPapers] = useState<any[]>([]);
  const [newPaper, setNewPaper] = useState({ subject: 'Financial Reporting', title: 'Mock Test 1', level: 'Inter', pdfUrl: '' });
  const [isAddingPaper, setIsAddingPaper] = useState(false);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "availablePapers"), (snapshot) => {
      setAvailPapers(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return () => unsub();
  }, []);

  const pendingCopies = allSharedTests.filter(t => t.status === 'submitted');
  const checkedCopies = allSharedTests.filter(t => t.status === 'checked');

  const handleStartEvaluation = (test: any) => {
    setEvaluatingTest(test);
    setEvalData({ marks: '', feedback: '', checkedPdfUrl: '' });
  };

  const submitEvaluation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!evaluatingTest) return;
    
    setIsSaving(true);
    try {
        await onUpdateTest({
            ...evaluatingTest,
            status: 'checked',
            marks: evalData.marks,
            feedback: evalData.feedback,
            checkedPdfUrl: evalData.checkedPdfUrl,
            checkedAt: new Date().toISOString()
        });
        setEvaluatingTest(null);
        alert("Paper Checked & Sent to Student Dashboard!");
    } catch (err) {
        console.error(err);
    } finally {
        setIsSaving(false);
    }
  };

  const handleAddPaper = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        await addDoc(collection(db, "availablePapers"), { ...newPaper, createdAt: serverTimestamp() });
        setIsAddingPaper(false);
        setNewPaper({ subject: 'Financial Reporting', title: 'Mock Test 1', level: 'Inter', pdfUrl: '' });
    } catch (e) { console.error(e); }
  };

  const deletePaper = async (id: string) => {
      if(confirm("Delete this question paper?")) {
          await deleteDoc(doc(db, "availablePapers", id));
      }
  };

  const updateLeadStatus = async (leadId: string, newStatus: string) => {
      try {
          const leadRef = doc(db, "leads", leadId);
          await updateDoc(leadRef, { status: newStatus, updatedAt: serverTimestamp() });
      } catch (e) { console.error(e); }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex font-sans">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white transform transition-transform lg:translate-x-0 lg:static lg:block ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-16 flex items-center px-6 border-b border-slate-800">
           <span className="font-display font-bold text-lg">Admin<span className="text-brand-orange">Panel</span></span>
           <button onClick={() => setIsMobileMenuOpen(false)} className="ml-auto lg:hidden"><X size={20} /></button>
        </div>
        <nav className="p-3 space-y-1">
            {[
                { id: 'overview', icon: LayoutDashboard, label: 'Control Center' },
                { id: 'checking', icon: CheckSquare, label: 'Pending Evaluations' },
                { id: 'manage-papers', icon: Globe, label: 'Manage Papers' },
                { id: 'results', icon: Award, label: 'Checked Archive' },
                { id: 'callbacks', icon: PhoneIncoming, label: 'Leads' },
            ].map((item) => (
                <button
                    key={item.id}
                    onClick={() => { setActiveTab(item.id); setIsMobileMenuOpen(false); }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === item.id ? 'bg-brand-orange text-white' : 'text-slate-400 hover:bg-slate-800'}`}
                >
                    <item.icon size={18} /> {item.label}
                    {item.id === 'checking' && pendingCopies.length > 0 && <span className="ml-auto bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full">{pendingCopies.length}</span>}
                </button>
            ))}
        </nav>
        <div className="absolute bottom-6 left-6 right-6">
            <button onClick={onLogout} className="w-full flex items-center gap-2 px-4 py-2 text-red-400 font-bold text-sm hover:bg-red-500/10 rounded-lg transition-all"><LogOut size={16} /> Logout</button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-8">
            <div className="flex items-center gap-4">
                <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden"><Menu size={20} /></button>
                <h1 className="text-lg font-bold text-slate-800 capitalize">{activeTab.replace('-', ' ')}</h1>
            </div>
            <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block"><div className="text-xs font-bold text-slate-900">Team Admin</div></div>
                <div className="w-10 h-10 rounded-full bg-brand-dark flex items-center justify-center text-white font-bold text-sm border-2 border-white shadow-sm">AD</div>
            </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 bg-slate-50/50">
            {activeTab === 'overview' && (
                <div className="space-y-6 animate-fade-up">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            { label: "Pending Evaluations", value: pendingCopies.length, icon: FileText, bg: "bg-orange-50", color: "text-orange-600" },
                            { label: "Active Papers", value: availPapers.length, icon: Globe, bg: "bg-blue-50", color: "text-blue-600" },
                        ].map((stat, i) => (
                            <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 flex items-center gap-4 shadow-sm">
                                <div className={`p-4 rounded-xl ${stat.bg} ${stat.color}`}><stat.icon size={24} /></div>
                                <div><div className="text-2xl font-black text-slate-900">{stat.value}</div><div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</div></div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === 'manage-papers' && (
                <div className="space-y-6 animate-fade-up">
                    <div className="flex justify-between items-center">
                        <h3 className="font-bold text-slate-800">Upload New Question Papers</h3>
                        <Button onClick={() => setIsAddingPaper(true)} size="sm"><Plus size={16} /> Add New Paper</Button>
                    </div>

                    {isAddingPaper && (
                        <div className="bg-white p-6 rounded-2xl border-2 border-brand-primary shadow-lg mb-6">
                            <form onSubmit={handleAddPaper} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold uppercase text-slate-400">Subject</label>
                                    <input type="text" className="w-full p-2 bg-slate-50 border rounded-lg text-sm" value={newPaper.subject} onChange={(e) => setNewPaper({...newPaper, subject: e.target.value})} />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold uppercase text-slate-400">PDF URL (Google Drive/Link)</label>
                                    <input type="text" className="w-full p-2 bg-slate-50 border rounded-lg text-sm" placeholder="Paste PDF Link here" value={newPaper.pdfUrl} onChange={(e) => setNewPaper({...newPaper, pdfUrl: e.target.value})} />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold uppercase text-slate-400">Target Level</label>
                                    <select className="w-full p-2 bg-slate-50 border rounded-lg text-sm" value={newPaper.level} onChange={(e) => setNewPaper({...newPaper, level: e.target.value})}>
                                        <option>Inter</option>
                                        <option>Final</option>
                                        <option>Foundation</option>
                                    </select>
                                </div>
                                <div className="flex items-end gap-2">
                                    <Button type="submit" fullWidth>Save Paper</Button>
                                    <button type="button" onClick={() => setIsAddingPaper(false)} className="p-2 bg-slate-100 rounded-lg"><X size={20} /></button>
                                </div>
                            </form>
                        </div>
                    )}

                    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                        <table className="w-full text-left text-xs">
                            <thead className="bg-slate-50 text-slate-500 font-bold uppercase">
                                <tr>
                                    <th className="px-6 py-4">Paper Details</th>
                                    <th className="px-6 py-4">Level</th>
                                    <th className="px-6 py-4">Link</th>
                                    <th className="px-6 py-4 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {availPapers.map(p => (
                                    <tr key={p.id}>
                                        <td className="px-6 py-4">
                                            <div className="font-bold">{p.subject}</div>
                                            <div className="text-slate-400">{p.title}</div>
                                        </td>
                                        <td className="px-6 py-4"><span className="px-2 py-0.5 bg-slate-100 rounded-full">{p.level}</span></td>
                                        <td className="px-6 py-4"><a href={p.pdfUrl} target="_blank" className="text-brand-primary underline truncate max-w-[150px] inline-block">{p.pdfUrl}</a></td>
                                        <td className="px-6 py-4 text-right">
                                            <button onClick={() => deletePaper(p.id)} className="p-2 text-red-400 hover:bg-red-50 rounded-lg"><Trash2 size={14} /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {activeTab === 'checking' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-up">
                    {pendingCopies.map((copy) => (
                        <div key={copy.id} className="bg-white p-5 border border-slate-200 rounded-2xl shadow-sm">
                            <div className="flex justify-between items-start mb-4">
                                <div className="w-10 h-10 bg-brand-orange/10 rounded-lg flex items-center justify-center text-brand-orange"><FileText size={20} /></div>
                                <span className="text-[10px] font-bold text-slate-400">Pending</span>
                            </div>
                            <h4 className="font-bold text-slate-800">{copy.studentName}</h4>
                            <p className="text-[11px] text-slate-500">{copy.subject} - {copy.testName}</p>
                            <div className="mt-4 flex gap-2">
                                <Button size="sm" fullWidth onClick={() => handleStartEvaluation(copy)}>Evaluate Paper</Button>
                            </div>
                        </div>
                    ))}
                    {pendingCopies.length === 0 && <div className="col-span-full py-20 text-center text-slate-400">No pending papers! All clear.</div>}
                </div>
            )}

            {activeTab === 'results' && (
                 <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm animate-fade-up">
                    <table className="w-full text-left text-xs">
                        <thead className="bg-slate-50 text-slate-500 font-bold uppercase">
                            <tr>
                                <th className="px-6 py-4">Student</th>
                                <th className="px-6 py-4">Score</th>
                                <th className="px-6 py-4">Checked PDF</th>
                                <th className="px-6 py-4 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {checkedCopies.map(test => (
                                <tr key={test.id}>
                                    <td className="px-6 py-4 font-bold">{test.studentName}</td>
                                    <td className="px-6 py-4"><span className="font-black text-brand-primary">{test.marks}</span></td>
                                    <td className="px-6 py-4 truncate max-w-[150px] text-slate-400 italic">{test.checkedPdfUrl || 'No link'}</td>
                                    <td className="px-6 py-4 text-right"><button className="p-2 text-slate-400"><Pencil size={14} /></button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                 </div>
            )}
        </main>
      </div>

      {/* EVALUATION MODAL */}
      {evaluatingTest && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md" onClick={() => setEvaluatingTest(null)}></div>
            <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-fade-up">
                <form onSubmit={submitEvaluation}>
                    <div className="p-6 bg-slate-900 text-white flex justify-between items-center">
                        <div>
                            <h3 className="font-display font-bold text-xl">Evaluation Sheet</h3>
                            <p className="text-xs text-slate-400">{evaluatingTest.studentName} • {evaluatingTest.subject}</p>
                        </div>
                        <button type="button" onClick={() => setEvaluatingTest(null)} className="p-2 bg-white/10 rounded-full"><X size={18} /></button>
                    </div>
                    
                    <div className="p-8 space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-700 uppercase tracking-widest">Score / Marks</label>
                            <input type="text" required value={evalData.marks} onChange={(e) => setEvalData({...evalData, marks: e.target.value})} className="w-full p-4 bg-slate-50 border rounded-2xl text-lg font-bold" placeholder="e.g. 82/100" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-700 uppercase tracking-widest">Checked PDF URL (Google Drive Link)</label>
                            <input type="text" value={evalData.checkedPdfUrl} onChange={(e) => setEvalData({...evalData, checkedPdfUrl: e.target.value})} className="w-full p-3 bg-slate-50 border rounded-xl text-sm" placeholder="Paste checked paper link here" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-700 uppercase tracking-widest">Feedback Comments</label>
                            <textarea rows={4} required value={evalData.feedback} onChange={(e) => setEvalData({...evalData, feedback: e.target.value})} className="w-full p-4 bg-slate-50 border rounded-2xl text-sm resize-none" placeholder="Explain the scoring logic..."></textarea>
                        </div>
                    </div>

                    <div className="p-6 bg-slate-50 border-t flex gap-4">
                        <Button type="submit" fullWidth disabled={isSaving}>
                            {isSaving ? <Loader2 size={18} className="animate-spin" /> : 'Finish & Upload Result'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
      )}
    </div>
  );
};