import React, { useState } from 'react';
import { 
  LayoutDashboard, Users, FileText, CheckSquare, LogOut, Search, Plus, Upload, Download, Trash2, DollarSign, Menu, X, Pencil, Save, PhoneIncoming, Check, Loader2
} from 'lucide-react';
import { Button } from './Button';

interface AdminDashboardProps {
  onLogout: () => void;
  callbackRequests?: any[];
  allSharedTests: any[];
  onUpdateTest: (test: any) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout, callbackRequests = [], allSharedTests, onUpdateTest }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [checkingId, setCheckingId] = useState<number | null>(null);
  
  const pendingCopies = allSharedTests.filter(t => t.status === 'submitted');

  const handleMarkChecked = async (id: number) => {
    setCheckingId(id);
    await new Promise(resolve => setTimeout(resolve, 1500));
    const test = allSharedTests.find(t => t.id === id);
    if (test) {
        onUpdateTest({
            ...test,
            status: 'checked',
            marks: "75/100", // Mock marks
            feedback: "Well written. Focus on keywords."
        });
    }
    setCheckingId(null);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex font-sans">
      <aside className={`fixed inset-y-0 left-0 z-50 w-56 bg-slate-900 text-white transform transition-transform lg:translate-x-0 lg:static lg:block ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-16 flex items-center px-6 border-b border-slate-800">
           <span className="font-display font-bold text-lg">Admin<span className="text-brand-orange">Panel</span></span>
           <button onClick={() => setIsMobileMenuOpen(false)} className="ml-auto lg:hidden"><X size={20} /></button>
        </div>
        <nav className="p-3 space-y-1">
            {[
                { id: 'overview', icon: LayoutDashboard, label: 'Overview' },
                { id: 'checking', icon: CheckSquare, label: 'Check Copies' },
                { id: 'callbacks', icon: PhoneIncoming, label: 'Callbacks' },
            ].map((item) => (
                <button
                    key={item.id}
                    onClick={() => { setActiveTab(item.id); setIsMobileMenuOpen(false); }}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-bold transition-all ${activeTab === item.id ? 'bg-brand-orange text-white' : 'text-slate-400 hover:bg-slate-800'}`}
                >
                    <item.icon size={16} /> {item.label}
                    {item.id === 'checking' && pendingCopies.length > 0 && <span className="ml-auto bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">{pendingCopies.length}</span>}
                </button>
            ))}
        </nav>
        <div className="absolute bottom-4 left-4 right-4">
            <button onClick={onLogout} className="w-full flex items-center gap-2 px-4 py-2 text-red-400 font-bold text-sm"><LogOut size={16} /> Logout</button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-8">
            <div className="flex items-center gap-4">
                <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden"><Menu size={20} /></button>
                <h1 className="text-lg font-bold text-slate-800 capitalize">{activeTab}</h1>
            </div>
            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold text-xs">AD</div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
            {activeTab === 'overview' && (
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-up">
                    {[
                        { label: "Active Subs", value: "45", icon: Users, bg: "bg-blue-100", color: "text-blue-600" },
                        { label: "Pending Copies", value: pendingCopies.length, icon: FileText, bg: "bg-orange-100", color: "text-orange-600" },
                    ].map((stat, i) => (
                        <div key={i} className="bg-white p-5 rounded-xl flex items-center gap-3 shadow-sm">
                            <div className={`p-3 rounded-lg ${stat.bg} ${stat.color}`}><stat.icon size={20} /></div>
                            <div><div className="text-xl font-bold">{stat.value}</div><div className="text-[10px] font-bold text-slate-400 uppercase">{stat.label}</div></div>
                        </div>
                    ))}
                </div>
            )}

            {activeTab === 'checking' && (
                <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4 animate-fade-up">
                    <h3 className="font-bold text-slate-800 mb-4 text-sm">Validations Queue ({pendingCopies.length})</h3>
                    <div className="space-y-3">
                        {pendingCopies.map((copy) => (
                            <div key={copy.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border border-slate-200 rounded-lg bg-slate-50 gap-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center font-bold text-slate-700 text-xs">{copy.student.charAt(0)}</div>
                                    <div><h4 className="font-bold text-slate-800 text-xs">{copy.student}</h4><p className="text-[10px] text-slate-500">{copy.subject} • {copy.testName}</p></div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded flex items-center gap-1"><Download size={10} /> Get Sheet</button>
                                    <Button size="sm" className="h-7 text-[10px] px-2 bg-green-600 border-none" onClick={() => handleMarkChecked(copy.id)} disabled={checkingId === copy.id}>
                                        {checkingId === copy.id ? <Loader2 size={12} className="animate-spin" /> : 'Mark Checked'}
                                    </Button>
                                </div>
                            </div>
                        ))}
                        {pendingCopies.length === 0 && <div className="text-center py-10 text-slate-400 text-xs">No pending papers to check.</div>}
                    </div>
                </div>
            )}

            {activeTab === 'callbacks' && (
                <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden animate-fade-up">
                    <table className="w-full text-left text-xs">
                        <thead className="bg-slate-50 text-slate-500 font-bold uppercase">
                            <tr><th className="px-4 py-3">Name</th><th className="px-4 py-3">Mobile</th><th className="px-4 py-3">Status</th></tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {callbackRequests.map((req) => (
                                <tr key={req.id} className="hover:bg-slate-50">
                                    <td className="px-4 py-3 font-bold">{req.name}</td>
                                    <td className="px-4 py-3 font-mono">{req.mobile}</td>
                                    <td className="px-4 py-3"><span className="bg-orange-50 text-orange-600 px-2 py-0.5 rounded-full font-bold">{req.status}</span></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </main>
      </div>
    </div>
  );
};