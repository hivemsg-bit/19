
import React, { useState } from 'react';
import { 
  LayoutDashboard, Users, FileText, CheckSquare, LogOut, Search, Plus, 
  Upload, Download, Trash2, DollarSign, Menu, X, Pencil, Save, 
  PhoneIncoming, Check, Loader2, MessageSquare, Award, CheckCircle
} from 'lucide-react';
import { Button } from './Button';
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';
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
  const [evalData, setEvalData] = useState({ marks: '', feedback: '' });
  const [isSaving, setIsSaving] = useState(false);
  
  const pendingCopies = allSharedTests.filter(t => t.status === 'submitted');
  const checkedCopies = allSharedTests.filter(t => t.status === 'checked');

  const handleStartEvaluation = (test: any) => {
    setEvaluatingTest(test);
    setEvalData({ marks: '', feedback: '' });
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
            checkedAt: new Date().toISOString()
        });
        setEvaluatingTest(null);
        alert("Evaluation Saved Successfully!");
    } catch (err) {
        console.error(err);
    } finally {
        setIsSaving(false);
    }
  };

  const updateLeadStatus = async (leadId: string, newStatus: string) => {
      try {
          const leadRef = doc(db, "leads", leadId);
          await updateDoc(leadRef, { 
              status: newStatus,
              updatedAt: serverTimestamp()
          });
      } catch (e) {
          console.error(e);
      }
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
                { id: 'checking', icon: CheckSquare, label: 'Pending Papers' },
                { id: 'results', icon: Award, label: 'Checked Archive' },
                { id: 'callbacks', icon: PhoneIncoming, label: 'Leads & Enquiries' },
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
                <div className="text-right hidden sm:block">
                    <div className="text-xs font-bold text-slate-900">Admin User</div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Super Admin</div>
                </div>
                <div className="w-10 h-10 rounded-full bg-brand-dark flex items-center justify-center text-white font-bold text-sm border-2 border-white shadow-sm">AD</div>
            </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 bg-slate-50/50">
            {activeTab === 'overview' && (
                <div className="space-y-6 animate-fade-up">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            { label: "Total Students", value: "152", icon: Users, bg: "bg-blue-50", color: "text-blue-600" },
                            { label: "Pending Evaluations", value: pendingCopies.length, icon: FileText, bg: "bg-orange-50", color: "text-orange-600" },
                            { label: "Checked This Month", value: checkedCopies.length, icon: CheckSquare, bg: "bg-green-50", color: "text-green-600" },
                            { label: "New Leads", value: callbackRequests.filter(l => l.status === 'Pending').length, icon: PhoneIncoming, bg: "bg-purple-50", color: "text-purple-600" },
                        ].map((stat, i) => (
                            <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
                                <div className={`p-4 rounded-xl ${stat.bg} ${stat.color}`}><stat.icon size={24} /></div>
                                <div><div className="text-2xl font-black text-slate-900">{stat.value}</div><div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</div></div>
                            </div>
                        ))}
                    </div>
                    
                    {/* Recent Submissions Mini Table */}
                    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                        <div className="p-4 border-b border-slate-100 font-bold text-slate-800 text-sm">Action Required</div>
                        <div className="p-4">
                            {pendingCopies.length > 0 ? (
                                <div className="space-y-3">
                                    {pendingCopies.slice(0, 3).map(copy => (
                                        <div key={copy.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-brand-primary text-white flex items-center justify-center font-bold text-xs">{copy.studentName?.charAt(0)}</div>
                                                <div><div className="font-bold text-slate-800 text-xs">{copy.studentName}</div><div className="text-[10px] text-slate-400">{copy.subject} - {copy.testName}</div></div>
                                            </div>
                                            <Button size="sm" className="h-8 text-[10px]" onClick={() => handleStartEvaluation(copy)}>Evaluate Now</Button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-6 text-slate-400 text-xs">All papers checked! Nice work.</div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'checking' && (
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 animate-fade-up">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-slate-800 text-lg">Papers Awaiting Evaluation</h3>
                        <span className="text-xs font-bold text-slate-400 px-3 py-1 bg-slate-50 rounded-full">{pendingCopies.length} Pending</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {pendingCopies.map((copy) => (
                            <div key={copy.id} className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all flex flex-col group">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-brand-dark group-hover:bg-brand-primary group-hover:text-white transition-colors">
                                        <FileText size={24} />
                                    </div>
                                    <span className="text-[10px] font-bold text-slate-400">#SUB-{copy.id.slice(-4).toUpperCase()}</span>
                                </div>
                                <h4 className="font-bold text-slate-800 text-sm mb-1">{copy.studentName}</h4>
                                <p className="text-[11px] text-slate-500 mb-4">{copy.subject} • {copy.testName}</p>
                                <div className="mt-auto pt-4 border-t border-slate-50 flex gap-2">
                                    <button className="flex-1 text-[10px] font-bold py-2 bg-slate-100 rounded-lg text-slate-600 hover:bg-slate-200 transition-colors flex items-center justify-center gap-1"><Download size={12} /> Paper</button>
                                    <Button size="sm" className="flex-1 text-[10px] h-9" onClick={() => handleStartEvaluation(copy)}>Start Check</Button>
                                </div>
                            </div>
                        ))}
                        {pendingCopies.length === 0 && (
                            <div className="col-span-full py-20 text-center">
                                <CheckCircle className="mx-auto text-green-200 mb-4" size={48} />
                                <h3 className="font-bold text-slate-800">Queue Clear!</h3>
                                <p className="text-sm text-slate-500">No pending student papers at the moment.</p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {activeTab === 'results' && (
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden animate-fade-up">
                    <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                        <h3 className="font-bold text-slate-800 text-sm">Checked Paper Archive</h3>
                        <div className="relative">
                            <Search className="absolute left-3 top-2 text-slate-400" size={14} />
                            <input type="text" placeholder="Search by student..." className="pl-9 pr-4 py-1.5 bg-white border border-slate-200 rounded-lg text-xs w-48" />
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                            <thead className="bg-slate-50 text-slate-500 font-bold uppercase">
                                <tr>
                                    <th className="px-6 py-4">Student</th>
                                    <th className="px-6 py-4">Subject</th>
                                    <th className="px-6 py-4">Marks</th>
                                    <th className="px-6 py-4">Feedback Snippet</th>
                                    <th className="px-6 py-4 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {checkedCopies.map((test) => (
                                    <tr key={test.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4 font-bold text-slate-800">{test.studentName}</td>
                                        <td className="px-6 py-4 text-slate-500">{test.subject} - {test.testName}</td>
                                        <td className="px-6 py-4"><span className="px-2 py-1 bg-green-50 text-green-700 rounded-lg font-bold">{test.marks}</span></td>
                                        <td className="px-6 py-4 text-slate-400 italic line-clamp-1 max-w-[200px]">{test.feedback}</td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="p-2 text-slate-400 hover:text-brand-primary"><Pencil size={14} /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {activeTab === 'callbacks' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-up">
                    <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                        <div className="p-4 border-b border-slate-100 font-bold text-slate-800 text-sm">Fresh Leads</div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs">
                                <thead className="bg-slate-50 text-slate-500 font-bold uppercase">
                                    <tr>
                                        <th className="px-4 py-3">Student Details</th>
                                        <th className="px-4 py-3">Course</th>
                                        <th className="px-4 py-3">Status</th>
                                        <th className="px-4 py-3 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {callbackRequests.sort((a,b) => b.createdAt?.seconds - a.createdAt?.seconds).map((req) => (
                                        <tr key={req.id} className="hover:bg-slate-50 group">
                                            <td className="px-4 py-3">
                                                <div className="font-bold text-slate-800">{req.name}</div>
                                                <div className="text-slate-400 font-mono text-[10px]">{req.mobile}</div>
                                            </td>
                                            <td className="px-4 py-3"><span className="px-2 py-0.5 bg-slate-100 rounded-full font-bold">{req.course}</span></td>
                                            <td className="px-4 py-3">
                                                <select 
                                                    value={req.status || 'Pending'} 
                                                    onChange={(e) => updateLeadStatus(req.id, e.target.value)}
                                                    className={`text-[10px] font-bold px-2 py-1 rounded-full border-none focus:ring-1 focus:ring-brand-primary cursor-pointer
                                                        ${req.status === 'Called' ? 'bg-blue-50 text-blue-600' : 
                                                          req.status === 'Interested' ? 'bg-green-50 text-green-600' : 
                                                          'bg-orange-50 text-orange-600'}`}
                                                >
                                                    <option value="Pending">Pending</option>
                                                    <option value="Called">Called</option>
                                                    <option value="Interested">Interested</option>
                                                    <option value="Joined">Joined</option>
                                                </select>
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                <a href={`tel:${req.mobile}`} className="p-2 text-brand-primary bg-brand-primary/10 rounded-lg inline-block opacity-0 group-hover:opacity-100 transition-opacity"><PhoneIncoming size={12} /></a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    
                    <div className="space-y-4">
                        <div className="bg-brand-dark text-white p-6 rounded-2xl shadow-lg border border-white/5 relative overflow-hidden">
                            <div className="relative z-10">
                                <h3 className="font-bold mb-2">Lead Summary</h3>
                                <div className="space-y-3 mt-4">
                                    <div className="flex justify-between items-center text-xs">
                                        <span className="text-slate-400">Conversion Rate</span>
                                        <span className="font-bold">12%</span>
                                    </div>
                                    <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                                        <div className="h-full bg-brand-orange w-[12%]"></div>
                                    </div>
                                    <p className="text-[10px] text-slate-400 italic">Target 20% by end of session.</p>
                                </div>
                            </div>
                            <Users size={80} className="absolute -bottom-4 -right-4 text-white/5" />
                        </div>
                    </div>
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
                            <h3 className="font-display font-bold text-xl">Evaluate Paper</h3>
                            <p className="text-xs text-slate-400">{evaluatingTest.studentName} • {evaluatingTest.subject}</p>
                        </div>
                        <button type="button" onClick={() => setEvaluatingTest(null)} className="p-2 bg-white/10 rounded-full hover:bg-white/20"><X size={18} /></button>
                    </div>
                    
                    <div className="p-8 space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-700 uppercase tracking-widest flex items-center gap-2">
                                <Award size={14} className="text-brand-orange" /> Score / Marks
                            </label>
                            <input 
                                type="text" 
                                placeholder="e.g. 78/100" 
                                required
                                value={evalData.marks}
                                onChange={(e) => setEvalData({...evalData, marks: e.target.value})}
                                className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-lg font-bold text-slate-900 focus:border-brand-primary outline-none transition-colors"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-700 uppercase tracking-widest flex items-center gap-2">
                                <MessageSquare size={14} className="text-brand-primary" /> Evaluation Feedback
                            </label>
                            <textarea 
                                rows={5}
                                placeholder="Write detailed feedback for the student..." 
                                required
                                value={evalData.feedback}
                                onChange={(e) => setEvalData({...evalData, feedback: e.target.value})}
                                className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm text-slate-700 focus:border-brand-primary outline-none transition-colors resize-none"
                            ></textarea>
                        </div>
                    </div>

                    <div className="p-6 bg-slate-50 border-t border-slate-100 flex gap-4">
                        <Button type="submit" fullWidth disabled={isSaving} className="h-12 text-sm font-bold shadow-lg shadow-brand-orange/20">
                            {isSaving ? <Loader2 size={18} className="animate-spin" /> : 'Confirm & Send to Student'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
      )}
    </div>
  );
};
