
import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Users, FileText, CheckSquare, LogOut, Search, Plus, 
  Upload, Download, Trash2, DollarSign, Menu, X, Pencil, Save, 
  PhoneIncoming, Check, Loader2, MessageSquare, Award, CheckCircle, Eye, Globe, ArrowRight, BarChart3, ShieldCheck, UserX, UserCheck, ExternalLink
} from 'lucide-react';
import { Button } from './Button';
import { 
  doc, 
  updateDoc, 
  serverTimestamp, 
  collection, 
  addDoc, 
  onSnapshot, 
  deleteDoc, 
  query, 
  orderBy,
  arrayUnion
} from 'firebase/firestore';
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
  const [availPapers, setAvailPapers] = useState<any[]>([]);
  const [newPaper, setNewPaper] = useState({ subject: 'Financial Reporting', title: 'Mock Test 1', level: 'Inter', pdfUrl: '' });
  const [isAddingPaper, setIsAddingPaper] = useState(false);
  const [allStudents, setAllStudents] = useState<any[]>([]);
  const [editingStudent, setEditingStudent] = useState<any | null>(null);
  const [viewPdfUrl, setViewPdfUrl] = useState<string | null>(null);

  useEffect(() => {
    const q = query(collection(db, "availablePapers"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snapshot) => {
      setAvailPapers(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    });

    const unsubStudents = onSnapshot(collection(db, "users"), (snapshot) => {
        setAllStudents(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    });

    return () => { unsub(); unsubStudents(); };
  }, []);

  const pendingCopies = allSharedTests.filter(t => t.status === 'submitted');
  const checkedCopies = allSharedTests.filter(t => t.status === 'checked');

  const handleStartEvaluation = (test: any) => {
    setEvaluatingTest(test);
    setEvalData({ 
      marks: test.marks || '', 
      feedback: test.feedback || '', 
      checkedPdfUrl: test.checkedPdfUrl || '' 
    });
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
        alert("Paper Evaluated! Result is now visible on Student Dashboard.");
    } catch (err) {
        console.error(err);
    } finally {
        setIsSaving(false);
    }
  };

  const deleteTestRecord = async (testId: string) => {
    if (window.confirm("Admin: Permanently delete this test record?")) {
        await deleteDoc(doc(db, "tests", testId));
    }
  };

  const toggleUserStatus = async (studentId: string, currentStatus: string) => {
      const newStatus = currentStatus === 'inactive' ? 'active' : 'inactive';
      const studentRef = doc(db, "users", studentId);
      await updateDoc(studentRef, { status: newStatus });
  };

  const deleteUser = async (studentId: string) => {
      if (window.confirm("Danger: Delete this user and all their data permanently?")) {
          await deleteDoc(doc(db, "users", studentId));
      }
  };

  const handleManualPlanUpdate = async (studentId: string, planLevel: string) => {
    try {
        const studentRef = doc(db, "users", studentId);
        await updateDoc(studentRef, {
            purchasedPlans: arrayUnion({
                planId: 'manual_' + Date.now(),
                title: 'Manual Activation: ' + planLevel,
                purchasedAt: new Date().toISOString(),
                level: planLevel
            }),
            updatedAt: serverTimestamp()
        });
        alert("Plan updated successfully!");
        setEditingStudent(null);
    } catch (e) {
        console.error(e);
        alert("Error updating plan.");
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
      if(window.confirm("Are you sure?")) {
          await deleteDoc(doc(db, "availablePapers", id));
      }
  };

  const openPdfViewer = (url: string) => {
    if (!url) { alert("Paper document link not available."); return; }
    setViewPdfUrl(url);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex font-sans">
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white transform transition-transform lg:translate-x-0 lg:static lg:block ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-16 flex items-center px-6 border-b border-slate-800">
           <span className="font-display font-bold text-lg">Admin<span className="text-brand-orange">Panel</span></span>
           <button onClick={() => setIsMobileMenuOpen(false)} className="ml-auto lg:hidden"><X size={20} /></button>
        </div>
        <nav className="p-3 space-y-1">
            {[
                { id: 'overview', icon: LayoutDashboard, label: 'Control Center' },
                { id: 'checking', icon: CheckSquare, label: 'Pending Evaluations' },
                { id: 'insights', icon: BarChart3, label: 'Student Insights' },
                { id: 'manage-papers', icon: Globe, label: 'Test Inventory' },
                { id: 'results', icon: Award, label: 'Archive' },
                { id: 'callbacks', icon: PhoneIncoming, label: 'Inquiries' },
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
        <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-8 shrink-0">
            <div className="flex items-center gap-4">
                <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden p-2 bg-slate-50 rounded-lg"><Menu size={20} /></button>
                <h1 className="text-lg font-bold text-slate-800 capitalize">{activeTab.replace('-', ' ')}</h1>
            </div>
            <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <div className="text-xs font-bold text-slate-900">CA Exam Team</div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-brand-dark flex items-center justify-center text-white font-bold text-sm border-2 border-white shadow-md">AD</div>
            </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 bg-slate-50/50">
            {activeTab === 'overview' && (
                <div className="space-y-6 animate-fade-up">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            { label: "Pending", value: pendingCopies.length, icon: FileText, bg: "bg-orange-50", color: "text-orange-600" },
                            { label: "Students", value: allStudents.length, icon: Users, bg: "bg-blue-50", color: "text-blue-600" },
                            { label: "Done", value: checkedCopies.length, icon: CheckCircle, bg: "bg-green-50", color: "text-green-600" },
                        ].map((stat, i) => (
                            <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 flex items-center gap-4 shadow-sm">
                                <div className={`p-4 rounded-xl ${stat.bg} ${stat.color}`}><stat.icon size={24} /></div>
                                <div><div className="text-2xl font-black text-slate-900">{stat.value}</div><div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</div></div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === 'insights' && (
                <div className="space-y-6 animate-fade-up">
                    <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
                        <table className="w-full text-left text-xs">
                            <thead className="bg-slate-50 text-slate-500 font-bold uppercase">
                                <tr>
                                    <th className="px-6 py-5">Student / Email</th>
                                    <th className="px-6 py-5">Avg. Performance</th>
                                    <th className="px-6 py-5">Status</th>
                                    <th className="px-6 py-5 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {allStudents.map(student => {
                                    const studentTests = allSharedTests.filter(t => t.studentId === student.id && t.status === 'checked');
                                    const avg = studentTests.length ? Math.round(studentTests.reduce((acc, t) => acc + (parseInt(t.marks) || 0), 0) / studentTests.length) : 0;
                                    const isInactive = student.status === 'inactive';
                                    return (
                                        <tr key={student.id} className={`hover:bg-slate-50 transition-colors ${isInactive ? 'opacity-60 bg-red-50/20' : ''}`}>
                                            <td className="px-6 py-5">
                                                <div className="font-bold text-slate-900">{student.name || 'Anonymous'}</div>
                                                <div className="text-[10px] text-slate-400 font-medium">{student.email}</div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                        <div className={`h-full ${avg >= 40 ? 'bg-brand-primary' : 'bg-red-400'}`} style={{ width: `${avg}%` }}></div>
                                                    </div>
                                                    <span className="font-bold">{avg}%</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                {isInactive ? (
                                                    <span className="px-2 py-1 bg-red-100 text-red-600 rounded-full font-bold text-[9px] uppercase tracking-wider">Blocked</span>
                                                ) : (
                                                    <span className="px-2 py-1 bg-green-100 text-green-600 rounded-full font-bold text-[9px] uppercase tracking-wider">Active</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-5 text-right flex items-center justify-end gap-2">
                                                <Button size="sm" variant="outline" onClick={() => setEditingStudent(student)}>Plan</Button>
                                                <button onClick={() => toggleUserStatus(student.id, student.status)} className={`p-2 rounded-lg transition-colors ${isInactive ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-400 hover:text-red-500'}`}>
                                                    {isInactive ? <UserCheck size={16} /> : <UserX size={16} />}
                                                </button>
                                                <button onClick={() => deleteUser(student.id)} className="p-2 text-slate-300 hover:text-red-600 transition-colors">
                                                    <Trash2 size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {activeTab === 'results' && (
                 <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm animate-fade-up">
                    <table className="w-full text-left text-xs">
                        <thead className="bg-slate-50 text-slate-500 font-bold uppercase">
                            <tr>
                                <th className="px-6 py-5">Student</th>
                                <th className="px-6 py-5">Subject</th>
                                <th className="px-6 py-5">Marks</th>
                                <th className="px-6 py-5 text-right">Delete</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {checkedCopies.map(test => (
                                <tr key={test.id} className="hover:bg-slate-50">
                                    <td className="px-6 py-5 font-bold">{test.studentName}</td>
                                    <td className="px-6 py-5 font-bold">{test.subject}</td>
                                    <td className="px-6 py-5"><span className="text-brand-primary font-black">{test.marks}</span></td>
                                    <td className="px-6 py-5 text-right">
                                        <button onClick={() => deleteTestRecord(test.id)} className="p-2 text-slate-300 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                 </div>
            )}

            {activeTab === 'checking' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-up">
                    {pendingCopies.map((copy) => (
                        <div key={copy.id} className="bg-white p-6 border border-slate-200 rounded-3xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 bg-orange-50 text-orange-600 rounded-bl-2xl font-bold text-[10px] uppercase tracking-widest">Action Required</div>
                            <div className="mb-6">
                                <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 mb-4 group-hover:bg-brand-orange/10 group-hover:text-brand-orange transition-colors"><FileText size={24} /></div>
                                <h4 className="font-bold text-slate-800 text-lg leading-tight">{copy.studentName}</h4>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">{copy.studentEmail}</p>
                            </div>
                            <div className="space-y-2 mb-6 text-xs text-slate-600 border-t border-slate-50 pt-4">
                                <div className="flex justify-between"><span>Subject:</span> <span className="font-bold text-brand-dark">{copy.subject}</span></div>
                                <div className="flex justify-between"><span>Test:</span> <span className="font-bold">{copy.testName}</span></div>
                            </div>
                            <div className="flex gap-2">
                                <Button size="sm" fullWidth onClick={() => handleStartEvaluation(copy)} className="gap-2">Verify & Evaluate <ArrowRight size={14} /></Button>
                                <button onClick={() => deleteTestRecord(copy.id)} className="p-3 bg-red-50 text-red-400 rounded-xl hover:bg-red-100 transition-colors"><Trash2 size={20} /></button>
                            </div>
                        </div>
                    ))}
                    {pendingCopies.length === 0 && <div className="col-span-full py-32 text-center text-slate-400 bg-white rounded-3xl border-2 border-dashed flex flex-col items-center justify-center gap-4"><CheckSquare size={48} className="opacity-20" /><p className="text-lg font-bold">Inbox Zero!</p><p className="text-sm">No papers currently pending for review.</p></div>}
                </div>
            )}

            {activeTab === 'manage-papers' && (
                <div className="space-y-6 animate-fade-up">
                    <div className="flex justify-between items-center">
                        <h3 className="font-bold text-slate-800 text-xl">Test Series Management</h3>
                        <Button onClick={() => setIsAddingPaper(true)} size="sm" className="gap-2"><Plus size={16} /> Add Test Paper</Button>
                    </div>

                    {isAddingPaper && (
                        <div className="bg-white p-8 rounded-3xl border-2 border-brand-primary shadow-2xl mb-8">
                            <form onSubmit={handleAddPaper} className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                <input type="text" required className="w-full p-3 bg-slate-50 border rounded-xl text-sm" placeholder="Subject Name" value={newPaper.subject} onChange={(e) => setNewPaper({...newPaper, subject: e.target.value})} />
                                <input type="text" required className="w-full p-3 bg-slate-50 border rounded-xl text-sm" placeholder="Mock Title" value={newPaper.title} onChange={(e) => setNewPaper({...newPaper, title: e.target.value})} />
                                <select className="w-full p-3 bg-slate-50 border rounded-xl text-sm" value={newPaper.level} onChange={(e) => setNewPaper({...newPaper, level: e.target.value})}>
                                    <option>Final</option>
                                    <option>Inter</option>
                                    <option>Foundation</option>
                                </select>
                                <input type="url" required className="w-full p-3 bg-slate-50 border rounded-xl text-sm" placeholder="PDF Link" value={newPaper.pdfUrl} onChange={(e) => setNewPaper({...newPaper, pdfUrl: e.target.value})} />
                                <div className="md:col-span-4 flex justify-end gap-2">
                                    <Button type="submit">Publish Paper</Button>
                                    <button type="button" onClick={() => setIsAddingPaper(false)} className="px-4 py-2 bg-slate-100 rounded-xl">Cancel</button>
                                </div>
                            </form>
                        </div>
                    )}

                    <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
                        <table className="w-full text-left text-xs">
                            <thead className="bg-slate-50 text-slate-500 font-bold uppercase">
                                <tr>
                                    <th className="px-6 py-5">Paper Details</th>
                                    <th className="px-6 py-5">Target</th>
                                    <th className="px-6 py-5 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {availPapers.map(p => (
                                    <tr key={p.id}>
                                        <td className="px-6 py-5"><div className="font-bold">{p.subject}</div><div className="text-slate-400">{p.title}</div></td>
                                        <td className="px-6 py-5"><span className="px-3 py-1 bg-brand-primary/10 text-brand-primary rounded-full font-bold">{p.level}</span></td>
                                        <td className="px-6 py-5 text-right"><button onClick={() => deletePaper(p.id)} className="p-2 text-red-400"><Trash2 size={16} /></button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </main>
      </div>
      
      {/* PDF PREVIEW FALLBACK MODAL */}
      {viewPdfUrl && (
          <div className="fixed inset-0 z-[120] flex flex-col p-4 md:p-8">
              <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-md" onClick={() => setViewPdfUrl(null)}></div>
              <div className="relative flex-1 bg-white rounded-3xl overflow-hidden flex flex-col animate-fade-up border border-white/20 shadow-2xl">
                  <div className="bg-slate-900 p-4 text-white flex justify-between items-center px-6 shrink-0">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-brand-orange/20 rounded-lg"><Globe size={18} className="text-brand-orange" /></div>
                        <div>
                          <span className="font-bold text-sm block leading-none">Paper Preview</span>
                          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Admin Review Mode</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <a href={viewPdfUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-bold transition-all">
                            <ExternalLink size={14} /> Open in New Tab
                        </a>
                        <button onClick={() => setViewPdfUrl(null)} className="p-2.5 bg-white/10 hover:bg-white/20 rounded-xl transition-all"><X size={20} /></button>
                      </div>
                  </div>
                  <div className="flex-1 bg-slate-800">
                    <iframe src={`https://docs.google.com/viewer?url=${encodeURIComponent(viewPdfUrl)}&embedded=true`} className="w-full h-full border-none" title="PDF Viewer" />
                  </div>
              </div>
          </div>
      )}

      {/* MANUAL PLAN UPDATE MODAL */}
      {editingStudent && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
              <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md" onClick={() => setEditingStudent(null)}></div>
              <div className="relative bg-white rounded-[2rem] shadow-2xl w-full max-w-md p-8 animate-fade-up">
                  <h3 className="text-xl font-bold mb-2">Update Plan: {editingStudent.name}</h3>
                  <p className="text-xs text-slate-500 mb-6">Assign a manual test series plan to this student.</p>
                  
                  <div className="space-y-3">
                      {['Foundation', 'Inter', 'Final'].map(level => (
                          <button 
                            key={level}
                            onClick={() => handleManualPlanUpdate(editingStudent.id, level)}
                            className="w-full p-4 bg-slate-50 hover:bg-brand-primary hover:text-white rounded-xl text-left font-bold transition-all border border-slate-100 flex justify-between items-center group"
                          >
                              {level} Series <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                          </button>
                      ))}
                  </div>
                  <button onClick={() => setEditingStudent(null)} className="w-full mt-6 py-3 text-slate-400 font-bold hover:text-slate-600">Close</button>
              </div>
          </div>
      )}

      {/* EVALUATION MODAL - IDENTITY VERIFICATION ENHANCED */}
      {evaluatingTest && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md" onClick={() => setEvaluatingTest(null)}></div>
            <div className="relative bg-white rounded-[2.5rem] shadow-2xl w-full max-w-lg overflow-hidden animate-fade-up">
                <form onSubmit={submitEvaluation}>
                    <div className="p-8 bg-brand-dark text-white flex justify-between items-center border-b border-white/5">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-brand-orange"><ShieldCheck size={28} /></div>
                            <div>
                                <h3 className="font-display font-bold text-xl leading-tight">Identity Verified</h3>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{evaluatingTest.studentEmail}</p>
                            </div>
                        </div>
                        <button type="button" onClick={() => setEvaluatingTest(null)} className="p-2 hover:bg-white/10 rounded-full transition-colors"><X size={20} /></button>
                    </div>
                    <div className="p-8 space-y-6 bg-white">
                        <div className="flex justify-between items-end">
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Score / Marks</label>
                                <input type="text" required value={evalData.marks} onChange={(e) => setEvalData({...evalData, marks: e.target.value})} className="w-full p-4 bg-slate-50 border-2 border-slate-100 focus:border-brand-primary outline-none rounded-2xl text-2xl font-black" placeholder="e.g. 74/100" />
                            </div>
                            <div className="text-right pb-4">
                                <p className="text-[10px] font-bold text-slate-400 uppercase">Student Name</p>
                                <p className="font-bold text-slate-800">{evaluatingTest.studentName}</p>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Checked PDF Link</label>
                            <div className="flex gap-2">
                                <input type="url" required value={evalData.checkedPdfUrl} onChange={(e) => setEvalData({...evalData, checkedPdfUrl: e.target.value})} className="flex-1 p-4 bg-slate-50 border-2 border-slate-100 focus:border-brand-primary outline-none rounded-2xl text-sm" placeholder="Paste Public Link" />
                                {evalData.checkedPdfUrl && <button type="button" onClick={() => openPdfViewer(evalData.checkedPdfUrl)} className="p-4 bg-brand-orange/10 text-brand-orange rounded-2xl"><Eye size={20} /></button>}
                            </div>
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Expert Mentorship Advice</label>
                            <textarea rows={4} required value={evalData.feedback} onChange={(e) => setEvalData({...evalData, feedback: e.target.value})} className="w-full p-4 bg-slate-50 border-2 border-slate-100 focus:border-brand-primary outline-none rounded-2xl text-sm resize-none" placeholder="Explain mistakes and tips for improvement..."></textarea>
                        </div>
                    </div>
                    <div className="p-8 bg-slate-50 border-t flex gap-4">
                        <Button type="submit" fullWidth disabled={isSaving} className="h-14 shadow-xl shadow-brand-orange/20">
                            {isSaving ? <Loader2 size={24} className="animate-spin" /> : 'Confirm & Publish Result'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
      )}
    </div>
  );
};
