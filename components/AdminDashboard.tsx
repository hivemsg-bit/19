
import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Users, FileText, CheckSquare, LogOut, Search, Plus, 
  Upload, Download, Trash2, DollarSign, Menu, X, Pencil, Save, 
  PhoneIncoming, Check, Loader2, MessageSquare, Award, CheckCircle, Eye, Globe, ArrowRight, BarChart3, ShieldCheck, UserX, UserCheck, ExternalLink, Megaphone, HelpCircle, Mail, Calendar, UserPlus, RefreshCcw, ThumbsUp, ThumbsDown, GraduationCap, Clock, BookOpen, Layers
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
  where
} from 'firebase/firestore';
import { db } from '../lib/firebase';

interface AdminDashboardProps {
  onLogout: () => void;
  callbackRequests: any[]; // These are the 'Leads'
  allSharedTests: any[];   // These are the 'Submitted Papers'
  onUpdateTest: (test: any) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout, callbackRequests, allSharedTests, onUpdateTest }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Data States
  const [allStudents, setAllStudents] = useState<any[]>([]);
  const [allTeachers, setAllTeachers] = useState<any[]>([]);
  const [availPapers, setAvailPapers] = useState<any[]>([]);
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [doubts, setDoubts] = useState<any[]>([]);

  // Form States
  const [newTeacherEmail, setNewTeacherEmail] = useState('');
  const [newTeacherName, setNewTeacherName] = useState('');
  const [isAddingTeacher, setIsAddingTeacher] = useState(false);
  
  const [newPaper, setNewPaper] = useState({ subject: 'Financial Reporting', title: '', level: 'Final', pdfUrl: '', category: 'Mock Test' });
  const [isAddingPaper, setIsAddingPaper] = useState(false);
  
  const [newAnnounce, setNewAnnounce] = useState('');
  const [isPostingAnnounce, setIsPostingAnnounce] = useState(false);
  
  const [replyingDoubt, setReplyingDoubt] = useState<any | null>(null);
  const [doubtReply, setDoubtReply] = useState('');
  const [isReplying, setIsReplying] = useState(false);

  // Workflow States
  const [assigningTest, setAssigningTest] = useState<any | null>(null);
  const [reviewingTest, setReviewingTest] = useState<any | null>(null);
  const [adminRejectionNote, setAdminRejectionNote] = useState('');

  useEffect(() => {
    // 1. Listen for all users (Students & Teachers)
    const unsubUsers = onSnapshot(collection(db, "users"), (snapshot) => {
        const users = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
        setAllStudents(users.filter((u: any) => u.role === 'student' || !u.role));
        setAllTeachers(users.filter((u: any) => u.role === 'teacher'));
    });

    // 2. Listen for available papers (Inventory)
    const qPapers = query(collection(db, "availablePapers"), orderBy("createdAt", "desc"));
    const unsubPapers = onSnapshot(qPapers, (snapshot) => {
      setAvailPapers(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    });

    // 3. Listen for Announcements
    const qAnnounce = query(collection(db, "announcements"), orderBy("createdAt", "desc"));
    const unsubAnnounce = onSnapshot(qAnnounce, (snapshot) => {
        setAnnouncements(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    });

    // 4. Listen for Doubts
    const qDoubts = query(collection(db, "doubts"), orderBy("createdAt", "desc"));
    const unsubDoubts = onSnapshot(qDoubts, (snapshot) => {
        setDoubts(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    });

    return () => { unsubUsers(); unsubPapers(); unsubAnnounce(); unsubDoubts(); };
  }, []);

  const handleAddTeacher = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTeacherEmail || !newTeacherName) return;
    setIsAddingTeacher(true);
    try {
        await addDoc(collection(db, "users"), {
            email: newTeacherEmail,
            name: newTeacherName,
            role: 'teacher',
            status: 'active',
            createdAt: serverTimestamp()
        });
        setNewTeacherEmail('');
        setNewTeacherName('');
        alert("Teacher account pre-authorized!");
    } catch (e) { console.error(e); }
    setIsAddingTeacher(false);
  };

  const handleAddPaper = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPaper.pdfUrl || !newPaper.title) return;
    setIsAddingPaper(true);
    try {
        await addDoc(collection(db, "availablePapers"), {
            ...newPaper,
            createdAt: serverTimestamp()
        });
        setNewPaper({ subject: 'Financial Reporting', title: '', level: 'Final', pdfUrl: '', category: 'Mock Test' });
        alert("Resource added to library!");
    } catch (e) { console.error(e); }
    setIsAddingPaper(false);
  };

  const handlePostAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnnounce) return;
    setIsPostingAnnounce(true);
    try {
        await addDoc(collection(db, "announcements"), {
            message: newAnnounce,
            createdAt: serverTimestamp()
        });
        setNewAnnounce('');
        alert("Announcement broadcasted!");
    } catch (e) { console.error(e); }
    setIsPostingAnnounce(false);
  };

  const handleAssignTeacher = async (teacher: any) => {
    if (!assigningTest) return;
    try {
        await updateDoc(doc(db, "tests", assigningTest.id), {
            assignedToId: teacher.id,
            assignedToName: teacher.name,
            assignmentStatus: 'assigned',
            status: 'in_evaluation',
            assignedAt: serverTimestamp()
        });
        setAssigningTest(null);
        alert("Paper successfully assigned to " + teacher.name);
    } catch (e) { console.error(e); }
  };

  const handleApproveEvaluation = async (test: any) => {
      try {
          await updateDoc(doc(db, "tests", test.id), {
              status: 'checked',
              assignmentStatus: 'approved',
              approvedAt: serverTimestamp()
          });
          setReviewingTest(null);
          alert("Evaluation approved! Student can now see the marks.");
      } catch (e) { console.error(e); }
  };

  const handleRejectEvaluation = async (test: any) => {
      if (!adminRejectionNote) { alert("Please write a reason for the teacher."); return; }
      try {
          await updateDoc(doc(db, "tests", test.id), {
              assignmentStatus: 'rejected',
              adminComment: adminRejectionNote,
              status: 'in_evaluation'
          });
          setReviewingTest(null);
          setAdminRejectionNote('');
          alert("Evaluation sent back to teacher for correction.");
      } catch (e) { console.error(e); }
  };

  const handleReplyDoubt = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!doubtReply || !replyingDoubt) return;
    setIsReplying(true);
    try {
        await updateDoc(doc(db, "doubts", replyingDoubt.id), {
            reply: doubtReply,
            status: 'resolved',
            repliedAt: serverTimestamp()
        });
        setReplyingDoubt(null);
        setDoubtReply('');
    } catch (e) { console.error(e); }
    setIsReplying(false);
  };

  const handleDeleteLead = async (id: string) => {
    if (window.confirm("Delete this lead?")) {
        await deleteDoc(doc(db, "leads", id));
    }
  };

  const handleDeletePaper = async (id: string) => {
    if (window.confirm("Remove this resource?")) {
        await deleteDoc(doc(db, "availablePapers", id));
    }
  };

  // Logic for Badges
  const unassignedTests = allSharedTests.filter(t => t.assignmentStatus === 'unassigned' || !t.assignmentStatus);
  const reviewQueue = allSharedTests.filter(t => t.assignmentStatus === 'pending_approval');
  const pendingDoubts = doubts.filter(d => d.status === 'pending');
  const pendingLeads = callbackRequests.filter(l => l.status === 'Pending');

  return (
    <div className="min-h-screen bg-slate-100 flex font-sans">
      {/* Mobile Backdrop */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-[45] lg:hidden" onClick={() => setIsMobileMenuOpen(false)}></div>
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white transform transition-transform duration-300 lg:translate-x-0 lg:static lg:block ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-16 flex items-center px-6 border-b border-white/5">
           <span className="font-display font-bold text-lg text-white">Admin<span className="text-brand-orange">Control</span></span>
           <button onClick={() => setIsMobileMenuOpen(false)} className="ml-auto lg:hidden p-1 hover:bg-white/10 rounded-lg"><X size={20} /></button>
        </div>
        <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-120px)] no-scrollbar">
            {[
                { id: 'overview', icon: LayoutDashboard, label: 'Overview' },
                { id: 'leads', icon: PhoneIncoming, label: 'Callback Leads', badge: pendingLeads.length },
                { id: 'broadcast', icon: Megaphone, label: 'Broadcasts' },
                { id: 'assign', icon: RefreshCcw, label: 'Assign Copies', badge: unassignedTests.length },
                { id: 'review', icon: ShieldCheck, label: 'Review Queue', badge: reviewQueue.length },
                { id: 'doubts', icon: HelpCircle, label: 'Resolve Doubts', badge: pendingDoubts.length },
                { id: 'students', icon: GraduationCap, label: 'All Students' },
                { id: 'inventory', icon: BookOpen, label: 'Manage Library' },
                { id: 'team', icon: Users, label: 'Manage Team' },
            ].map((item) => (
                <button
                    key={item.id}
                    onClick={() => { setActiveTab(item.id); setIsMobileMenuOpen(false); }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === item.id ? 'bg-brand-orange text-white shadow-lg shadow-brand-orange/20' : 'text-slate-400 hover:bg-white/5'}`}
                >
                    <item.icon size={18} /> {item.label}
                    {item.badge ? <span className="ml-auto bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full">{item.badge}</span> : null}
                </button>
            ))}
        </nav>
        <div className="absolute bottom-6 left-6 right-6">
            <button onClick={onLogout} className="w-full flex items-center gap-2 px-4 py-2 text-red-400 font-bold text-sm hover:bg-red-500/10 rounded-lg transition-colors"><LogOut size={18} /> Sign Out</button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-6 sm:px-8 shrink-0">
            <div className="flex items-center gap-4">
                <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden p-2 bg-slate-100 rounded-lg text-slate-600"><Menu size={20} /></button>
                <h1 className="text-lg font-bold text-slate-800 capitalize tracking-tight">{activeTab.replace('-', ' ')}</h1>
            </div>
            <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Administrator</p>
                    <p className="text-xs font-bold text-slate-800">Master Admin</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white font-bold text-sm border-2 border-white shadow-sm">AD</div>
            </div>
        </header>

        {/* Dynamic Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50/50">
            {/* 1. OVERVIEW TAB */}
            {activeTab === 'overview' && (
                <div className="space-y-6 animate-fade-up">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            { label: "Pending Leads", value: pendingLeads.length, icon: PhoneIncoming, color: "text-orange-600", bg: "bg-orange-50" },
                            { label: "Unassigned Copies", value: unassignedTests.length, icon: RefreshCcw, color: "text-blue-600", bg: "bg-blue-50" },
                            { label: "Review Queue", value: reviewQueue.length, icon: ShieldCheck, color: "text-purple-600", bg: "bg-purple-50" },
                            { label: "Total Students", value: allStudents.length, icon: GraduationCap, color: "text-green-600", bg: "bg-green-50" },
                        ].map((stat, i) => (
                            <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                                <div className={`p-4 rounded-xl ${stat.bg} ${stat.color}`}><stat.icon size={24} /></div>
                                <div><div className="text-2xl font-black text-slate-900">{stat.value}</div><div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</div></div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* LEADS TAB */}
            {activeTab === 'leads' && (
                <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm animate-fade-up">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 border-b border-slate-200">
                                <tr>
                                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase">Name</th>
                                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase">Mobile</th>
                                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase">Course</th>
                                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase">Status</th>
                                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {callbackRequests.map(lead => (
                                    <tr key={lead.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-6 py-4 font-bold text-slate-800">{lead.name}</td>
                                        <td className="px-6 py-4 text-sm text-slate-600">{lead.mobile}</td>
                                        <td className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase">{lead.course}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded-full text-[9px] font-black uppercase ${lead.status === 'Pending' ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'}`}>
                                                {lead.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button onClick={() => handleDeleteLead(lead.id)} className="text-slate-300 hover:text-red-500 transition-colors p-2"><Trash2 size={16} /></button>
                                        </td>
                                    </tr>
                                ))}
                                {callbackRequests.length === 0 && <tr><td colSpan={5} className="px-6 py-10 text-center text-slate-400 font-bold">No leads found.</td></tr>}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* INVENTORY TAB - Now Material Library */}
            {activeTab === 'inventory' && (
                <div className="space-y-8 animate-fade-up">
                    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm max-w-2xl">
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-slate-800"><Plus className="text-brand-orange" /> Add Study Resource</h3>
                        <form onSubmit={handleAddPaper} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-slate-400 uppercase">Subject</label>
                                <select className="w-full p-4 bg-slate-50 border-none rounded-xl text-sm" value={newPaper.subject} onChange={e => setNewPaper({...newPaper, subject: e.target.value})}>
                                    <option>Financial Reporting</option>
                                    <option>Advanced Auditing</option>
                                    <option>Direct Tax</option>
                                    <option>Indirect Tax</option>
                                    <option>Law</option>
                                    <option>SCMPE</option>
                                </select>
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-slate-400 uppercase">Resource Category</label>
                                <select className="w-full p-4 bg-slate-50 border-none rounded-xl text-sm" value={newPaper.category} onChange={e => setNewPaper({...newPaper, category: e.target.value})}>
                                    <option>Mock Test</option>
                                    <option>RTP (ICAI)</option>
                                    <option>MTP (ICAI)</option>
                                    <option>Past Paper</option>
                                    <option>Revision Notes</option>
                                    <option>Chart Book</option>
                                </select>
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-slate-400 uppercase">Title</label>
                                <input type="text" required placeholder="e.g. Jan 2026 RTP" className="w-full p-4 bg-slate-50 border-none rounded-xl text-sm" value={newPaper.title} onChange={e => setNewPaper({...newPaper, title: e.target.value})} />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-slate-400 uppercase">Level</label>
                                <select className="w-full p-4 bg-slate-50 border-none rounded-xl text-sm" value={newPaper.level} onChange={e => setNewPaper({...newPaper, level: e.target.value})}>
                                    <option>Foundation</option>
                                    <option>Inter</option>
                                    <option>Final</option>
                                </select>
                            </div>
                            <div className="sm:col-span-2 space-y-1">
                                <label className="text-[10px] font-bold text-slate-400 uppercase">PDF / Drive Link</label>
                                <input type="url" required placeholder="https://drive.google.com/..." className="w-full p-4 bg-slate-50 border-none rounded-xl text-sm" value={newPaper.pdfUrl} onChange={e => setNewPaper({...newPaper, pdfUrl: e.target.value})} />
                            </div>
                            <div className="sm:col-span-2 pt-2">
                                <Button type="submit" fullWidth disabled={isAddingPaper}>{isAddingPaper ? <Loader2 className="animate-spin" /> : 'Publish to Library'}</Button>
                            </div>
                        </form>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {availPapers.map(paper => (
                            <div key={paper.id} className="bg-white p-5 rounded-2xl border border-slate-200 flex items-center justify-between group shadow-sm">
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${paper.category === 'Mock Test' ? 'bg-orange-50 text-brand-orange' : 'bg-blue-50 text-blue-600'}`}>
                                        <FileText size={24} />
                                    </div>
                                    <div>
                                        <div className="font-bold text-slate-800 text-sm">{paper.title}</div>
                                        <div className="text-[9px] text-slate-400 font-bold uppercase">{paper.category} • {paper.subject}</div>
                                    </div>
                                </div>
                                <button onClick={() => handleDeletePaper(paper.id)} className="p-3 text-red-100 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"><Trash2 size={18} /></button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Rest of Tabs remain similar... (Assign, Review, Doubts, Team) */}
            {activeTab === 'assign' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-up">
                    {unassignedTests.map(copy => (
                        <div key={copy.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
                            <div>
                                <h4 className="font-bold text-slate-800 text-lg mb-1">{copy.studentName}</h4>
                                <span className="px-3 py-1 bg-brand-primary/10 text-brand-primary rounded-full text-[10px] font-black uppercase mb-4 inline-block">{copy.subject}</span>
                                <div className="text-xs space-y-2 mb-6 bg-slate-50 p-4 rounded-2xl">
                                    <div className="flex justify-between"><span>Test:</span> <b className="text-slate-700">{copy.testName}</b></div>
                                    <div className="flex justify-between"><span>Submitted:</span> <b className="text-slate-700">{new Date(copy.submittedAt).toLocaleDateString()}</b></div>
                                </div>
                            </div>
                            <Button fullWidth onClick={() => setAssigningTest(copy)}>Select Expert Teacher</Button>
                        </div>
                    ))}
                </div>
            )}
        </main>
      </div>

      {/* WORKFLOW MODALS... (Rest of code stays the same) */}
      {assigningTest && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md" onClick={() => setAssigningTest(null)}></div>
              <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-fade-up">
                  <div className="p-6 border-b flex justify-between items-center bg-slate-50">
                      <h3 className="font-bold text-slate-800">Assign To Expert</h3>
                      <button onClick={() => setAssigningTest(null)} className="p-2 hover:bg-white rounded-full"><X size={20} /></button>
                  </div>
                  <div className="p-6 space-y-3 max-h-[60vh] overflow-y-auto">
                      {allTeachers.map(teacher => (
                          <button key={teacher.id} onClick={() => handleAssignTeacher(teacher)} className="w-full p-5 flex items-center gap-4 rounded-2xl border-2 border-slate-50 hover:border-brand-orange hover:bg-brand-orange/5 transition-all group">
                              <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center font-bold group-hover:bg-brand-orange/20 group-hover:text-brand-orange">{teacher.name.charAt(0)}</div>
                              <div className="text-left"><div className="font-bold text-slate-800">{teacher.name}</div><div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Available Evaluator</div></div>
                              <ArrowRight size={18} className="ml-auto text-slate-300 group-hover:text-brand-orange" />
                          </button>
                      ))}
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};
