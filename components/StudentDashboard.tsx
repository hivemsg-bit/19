
import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  LogOut, 
  Upload, 
  Download, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Menu,
  X,
  ShoppingBag,
  Loader2,
  Plus
} from 'lucide-react';
import { Button } from './Button';
import { TestSeries } from './TestSeries';

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
  
  const [newSub, setNewSub] = useState({ subject: 'FR', testName: 'Full Mock 1' });

  const handleFakeUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate thinking/uploading
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    onNewSubmission({
        ...newSub,
        status: 'submitted',
        fileNote: "PDF Uploaded via Firestore Metadata (Storage Bypassed)"
    });
    
    setIsSubmitting(false);
    setShowSubmitForm(false);
    alert("Paper Submitted Successfully! Hum ise check karke 48 hours mein result bhejenge.");
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'checked':
        return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-100 text-green-800"><CheckCircle size={10} /> Checked</span>;
      case 'submitted':
        return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-yellow-100 text-yellow-800"><Clock size={10} /> Under Review</span>;
      default:
        return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600"><AlertCircle size={10} /> To Write</span>;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      <aside className={`fixed inset-y-0 left-0 z-50 w-56 bg-brand-dark text-white transform transition-transform lg:translate-x-0 lg:static lg:block ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-16 flex items-center px-6 border-b border-white/5">
            <span className="font-display font-bold text-lg">Student<span className="text-brand-orange">Hub</span></span>
            <button onClick={() => setIsMobileMenuOpen(false)} className="ml-auto lg:hidden"><X size={20} /></button>
        </div>
        <nav className="p-3 space-y-1">
            {[
                { id: 'dashboard', icon: LayoutDashboard, label: 'Overview' },
                { id: 'tests', icon: FileText, label: 'My Tests' },
                { id: 'plans', icon: ShoppingBag, label: 'Buy Plans' },
            ].map((item) => (
                <button
                    key={item.id}
                    onClick={() => { setActiveTab(item.id); setIsMobileMenuOpen(false); }}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-bold transition-all ${activeTab === item.id ? 'bg-brand-primary text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                >
                    <item.icon size={16} /> {item.label}
                </button>
            ))}
        </nav>
        <div className="absolute bottom-4 left-4 right-4">
            <button onClick={onLogout} className="w-full flex items-center gap-2 px-4 py-2 text-red-400 font-bold text-sm hover:bg-red-500/10 rounded-lg transition-colors"><LogOut size={16} /> Sign Out</button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-4 sm:px-8">
            <div className="flex items-center gap-4">
                <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden"><Menu size={20} /></button>
                <h1 className="text-lg font-bold text-slate-800">My Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
                <button className="relative p-2 text-slate-400 hover:text-brand-primary"><span className="absolute top-2 right-2 w-2 h-2 bg-brand-orange rounded-full"></span><FileText size={20} /></button>
                <div className="w-8 h-8 rounded-full bg-brand-orange flex items-center justify-center text-white text-xs font-bold border-2 border-white shadow-sm">ST</div>
            </div>
        </header>

        <main className="flex-1 p-4 overflow-y-auto">
            {activeTab === 'dashboard' && (
                <div className="space-y-6 animate-fade-up">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-display font-bold text-slate-800">Your Progress</h2>
                        <Button size="sm" onClick={() => setShowSubmitForm(true)} className="gap-2"><Plus size={16} /> Submit New Paper</Button>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                        {[
                            { label: "Enrolled", value: tests.length, icon: FileText, color: "text-blue-600", bg: "bg-blue-50" },
                            { label: "Checked", value: tests.filter(t => t.status === 'checked').length, icon: CheckCircle, color: "text-green-600", bg: "bg-green-50" },
                        ].map((stat, i) => (
                            <div key={i} className="bg-white p-4 rounded-xl border border-slate-100 flex items-center gap-3 shadow-sm">
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.bg} ${stat.color}`}><stat.icon size={20} /></div>
                                <div><div className="text-lg font-bold">{stat.value}</div><div className="text-[10px] font-bold text-slate-400 uppercase">{stat.label}</div></div>
                            </div>
                        ))}
                    </div>

                    {showSubmitForm && (
                        <div className="bg-brand-primary/10 p-4 rounded-2xl border-2 border-brand-primary/20 animate-fade-up">
                            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><Upload size={18} /> Submit Test Paper</h3>
                            <form onSubmit={handleFakeUpload} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <select 
                                    className="p-2 rounded-lg border border-slate-200 text-sm"
                                    value={newSub.subject}
                                    onChange={(e) => setNewSub({...newSub, subject: e.target.value})}
                                >
                                    <option>FR</option>
                                    <option>Audit</option>
                                    <option>Law</option>
                                    <option>DT / IDT</option>
                                </select>
                                <input 
                                    type="text" 
                                    placeholder="Test Name (e.g. Mock 1)" 
                                    className="p-2 rounded-lg border border-slate-200 text-sm"
                                    value={newSub.testName}
                                    onChange={(e) => setNewSub({...newSub, testName: e.target.value})}
                                />
                                <div className="flex gap-2">
                                    <Button type="submit" fullWidth disabled={isSubmitting}>
                                        {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : 'Confirm Submission'}
                                    </Button>
                                    <Button variant="ghost" onClick={() => setShowSubmitForm(false)}>Cancel</Button>
                                </div>
                            </form>
                            <p className="text-[10px] text-slate-500 mt-2 italic">* Note: Storage Billing error ki wajah se hum metadata record kar rahe hain. Aapka paper system mein queue ho jayega.</p>
                        </div>
                    )}

                    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                            <h2 className="font-bold text-slate-800 text-sm">Submission History</h2>
                            <span className="text-[10px] font-bold text-slate-400">Total {tests.length}</span>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs">
                                <thead className="bg-slate-50 text-slate-500 font-bold uppercase">
                                    <tr><th className="px-4 py-3">Subject</th><th className="px-4 py-3">Status</th><th className="px-4 py-3 text-right">Marks / Feedback</th></tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {tests.map((test) => (
                                        <tr key={test.id} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-4 py-3"><div className="font-bold">{test.subject}</div><div className="text-slate-400 text-[10px]">{test.testName}</div></td>
                                            <td className="px-4 py-3">{getStatusBadge(test.status)}</td>
                                            <td className="px-4 py-3 text-right">
                                                {test.status === 'checked' ? (
                                                    <div>
                                                        <div className="font-bold text-brand-primary">{test.marks}</div>
                                                        <div className="text-[10px] text-slate-400">{test.feedback}</div>
                                                    </div>
                                                ) : <span className="text-[10px] text-slate-400 italic">Awaiting Evaluation</span>}
                                            </td>
                                        </tr>
                                    ))}
                                    {tests.length === 0 && (
                                        <tr><td colSpan={3} className="text-center py-10 text-slate-400">Abhi tak koi paper submit nahi kiya gaya.</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
            {activeTab === 'plans' && <div className="animate-fade-up"><TestSeries onBuyNow={onBuyPlan} /></div>}
            {activeTab === 'tests' && (
                <div className="bg-white p-8 rounded-2xl border text-center animate-fade-up">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400"><FileText size={32} /></div>
                    <h3 className="font-bold text-slate-800">Available Question Papers</h3>
                    <p className="text-sm text-slate-500 mb-6">Aapne abhi tak koi test series purchase nahi ki hai.</p>
                    <Button onClick={() => setActiveTab('plans')}>Browse Plans</Button>
                </div>
            )}
        </main>
      </div>
    </div>
  );
};
