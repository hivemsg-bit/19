import React, { useState, useRef } from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  BarChart3, 
  Settings, 
  LogOut, 
  Bell, 
  Search, 
  Upload, 
  Download, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Menu,
  X,
  ShoppingBag,
  Loader2
} from 'lucide-react';
import { Button } from './Button';
import { TestSeries } from './TestSeries';

interface StudentDashboardProps {
  onLogout: () => void;
  onBuyPlan?: (plan: any) => void;
  tests: any[];
  onUpdateTest: (test: any) => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({ onLogout, onBuyPlan, tests, onUpdateTest }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [uploadingId, setUploadingId] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = (id: number) => {
    setUploadingId(id);
    fileInputRef.current?.click();
  };

  const onFileSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && uploadingId) {
      // Mock Upload Progress
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const testToUpdate = tests.find(t => t.id === uploadingId);
      if (testToUpdate) {
        onUpdateTest({
          ...testToUpdate,
          status: 'submitted',
          submittedAt: new Date().toLocaleString()
        });
      }
      setUploadingId(null);
      alert("Paper Submitted Successfully! Examiner will evaluate within 48 hours.");
    }
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
      <input type="file" ref={fileInputRef} className="hidden" accept=".pdf" onChange={onFileSelected} />

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
            <button onClick={onLogout} className="w-full flex items-center gap-2 px-4 py-2 text-red-400 font-bold text-sm"><LogOut size={16} /> Sign Out</button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-4 sm:px-8">
            <div className="flex items-center gap-4">
                <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden"><Menu size={20} /></button>
                <h1 className="text-lg font-bold text-slate-800">Welcome, Student</h1>
            </div>
            <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-brand-orange flex items-center justify-center text-white text-xs font-bold">DS</div>
            </div>
        </header>

        <main className="flex-1 p-4 overflow-y-auto">
            {activeTab === 'dashboard' && (
                <div className="space-y-6">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                        {[
                            { label: "Tests", value: tests.length, icon: FileText, color: "text-blue-600", bg: "bg-blue-50" },
                            { label: "Submitted", value: tests.filter(t => t.status !== 'pending').length, icon: CheckCircle, color: "text-green-600", bg: "bg-green-50" },
                        ].map((stat, i) => (
                            <div key={i} className="bg-white p-4 rounded-xl border border-slate-100 flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.bg} ${stat.color}`}><stat.icon size={20} /></div>
                                <div><div className="text-lg font-bold">{stat.value}</div><div className="text-[10px] font-bold text-slate-400 uppercase">{stat.label}</div></div>
                            </div>
                        ))}
                    </div>

                    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                        <div className="p-4 border-b border-slate-100"><h2 className="font-bold text-slate-800 text-sm">Active Test Papers</h2></div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs">
                                <thead className="bg-slate-50 text-slate-500 font-bold uppercase">
                                    <tr><th className="px-4 py-3">Subject</th><th className="px-4 py-3">Status</th><th className="px-4 py-3 text-right">Action</th></tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {tests.map((test) => (
                                        <tr key={test.id} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-4 py-3"><div className="font-bold">{test.subject}</div><div className="text-slate-400 text-[10px]">{test.testName}</div></td>
                                            <td className="px-4 py-3">{getStatusBadge(test.status)}</td>
                                            <td className="px-4 py-3 text-right">
                                                {test.status === 'pending' ? (
                                                    <div className="flex justify-end gap-1">
                                                        <button className="p-1.5 text-slate-400 hover:text-brand-orange" title="Download QP"><Download size={14} /></button>
                                                        <Button size="sm" className="h-7 text-[10px] px-2" onClick={() => handleUploadClick(test.id)} disabled={uploadingId === test.id}>
                                                            {uploadingId === test.id ? <Loader2 size={12} className="animate-spin" /> : <><Upload size={12} className="mr-1" /> Upload</>}
                                                        </Button>
                                                    </div>
                                                ) : test.status === 'checked' ? (
                                                    <Button variant="outline" size="sm" className="h-7 text-[10px] px-2 border-green-200 text-green-700">Result</Button>
                                                ) : <span className="text-[10px] text-slate-400 italic">Processing...</span>}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
            {activeTab === 'plans' && <div className="animate-fade-up"><TestSeries onBuyNow={onBuyPlan} /></div>}
        </main>
      </div>
    </div>
  );
};