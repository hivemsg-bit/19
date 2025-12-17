import React, { useState } from 'react';
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
  ShoppingBag
} from 'lucide-react';
import { Button } from './Button';
import { TestSeries } from './TestSeries';

interface StudentDashboardProps {
  onLogout: () => void;
  onBuyPlan?: (plan: any) => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({ onLogout, onBuyPlan }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Mock Data for Tests
  const tests = [
    {
      id: 1,
      subject: "Advanced Accounting",
      testName: "Full Syllabus Mock 1",
      dueDate: "24 Oct 2024",
      status: "checked", // pending, submitted, checked
      marks: "78/100",
      feedback: "Great presentation. Watch out for AS-10 calculation errors."
    },
    {
      id: 2,
      subject: "Audit & Assurance",
      testName: "Chapter 1-4 Test",
      dueDate: "26 Oct 2024",
      status: "submitted",
      marks: "Pending",
      feedback: "-"
    },
    {
      id: 3,
      subject: "Corporate Law",
      testName: "Company Audit Mock",
      dueDate: "30 Oct 2024",
      status: "pending",
      marks: "-",
      feedback: "-"
    },
    {
      id: 4,
      subject: "Taxation (GST)",
      testName: "Input Tax Credit Series",
      dueDate: "02 Nov 2024",
      status: "pending",
      marks: "-",
      feedback: "-"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'checked':
        return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"><CheckCircle size={12} /> Checked</span>;
      case 'submitted':
        return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800"><Clock size={12} /> Under Review</span>;
      default:
        return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600"><AlertCircle size={12} /> To Write</span>;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      
      {/* SIDEBAR (Desktop) */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-brand-dark text-white transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:block ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {/* Logo */}
        <div className="h-20 flex items-center px-6 border-b border-white/10">
            <div className="flex items-center gap-2">
                {/* Simplified Logo for Dashboard */}
                <div className="w-8 h-8 relative">
                   <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                      <rect x="10" y="10" width="80" height="80" rx="20" fill="rgba(255,255,255,0.1)" stroke="#FFA239" strokeWidth="4" />
                      <path d="M40 52L48 60L65 40" stroke="#FFA239" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
                   </svg>
                </div>
                <span className="font-display font-bold text-xl tracking-tight">
                  Student<span className="text-brand-orange">Hub</span>
                </span>
            </div>
            {/* Close Menu (Mobile) */}
            <button onClick={() => setIsMobileMenuOpen(false)} className="ml-auto lg:hidden text-slate-400">
                <X size={24} />
            </button>
        </div>

        {/* User Mini Profile */}
        <div className="p-6 border-b border-white/10">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-orange flex items-center justify-center text-white font-bold text-lg">
                    DS
                </div>
                <div>
                    <h4 className="font-bold text-sm">Demo Student</h4>
                    <p className="text-xs text-slate-400">CA Inter • Nov '24</p>
                </div>
            </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
            {[
                { id: 'dashboard', icon: LayoutDashboard, label: 'Overview' },
                { id: 'tests', icon: FileText, label: 'My Tests' },
                { id: 'plans', icon: ShoppingBag, label: 'Buy Plans' },
                { id: 'results', icon: BarChart3, label: 'Performance' },
                { id: 'settings', icon: Settings, label: 'Settings' },
            ].map((item) => (
                <button
                    key={item.id}
                    onClick={() => { setActiveTab(item.id); setIsMobileMenuOpen(false); }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium ${
                        activeTab === item.id 
                        ? 'bg-brand-primary text-white shadow-lg' 
                        : 'text-slate-400 hover:bg-white/5 hover:text-white'
                    }`}
                >
                    <item.icon size={18} />
                    {item.label}
                </button>
            ))}
        </nav>

        {/* Logout */}
        <div className="absolute bottom-4 left-4 right-4">
            <button 
                onClick={onLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-400/10 transition-colors text-sm font-medium"
            >
                <LogOut size={18} />
                Sign Out
            </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header */}
        <header className="bg-white border-b border-slate-200 h-20 flex items-center justify-between px-4 sm:px-8 sticky top-0 z-40">
            <div className="flex items-center gap-4">
                <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden p-2 text-slate-600">
                    <Menu size={24} />
                </button>
                <h1 className="text-xl font-display font-bold text-slate-800 hidden sm:block">
                    {activeTab === 'dashboard' && 'Dashboard Overview'}
                    {activeTab === 'tests' && 'My Test Papers'}
                    {activeTab === 'plans' && 'Upgrade Your Plan'}
                    {activeTab === 'results' && 'Performance Analysis'}
                    {activeTab === 'settings' && 'Account Settings'}
                </h1>
            </div>

            <div className="flex items-center gap-4 sm:gap-6">
                {/* Search Bar (Hidden on mobile) */}
                <div className="hidden md:flex relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input 
                        type="text" 
                        placeholder="Search tests..." 
                        className="pl-9 pr-4 py-2 bg-slate-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20 w-64"
                    />
                </div>

                {/* Notifications */}
                <button className="relative p-2 text-slate-400 hover:text-brand-orange transition-colors">
                    <Bell size={20} />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                </button>

                <Button 
                   variant="primary" 
                   size="sm" 
                   className="hidden sm:flex shadow-brand-orange/20"
                   onClick={() => setActiveTab('plans')}
                >
                    Buy New Pack
                </Button>
            </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
            
            {activeTab === 'plans' ? (
                <div className="animate-fade-up">
                    <TestSeries onBuyNow={onBuyPlan} />
                </div>
            ) : (
                <>
                    {/* 1. STATS ROW */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        {[
                            { label: "Tests Assigned", value: "12", icon: FileText, color: "text-blue-600", bg: "bg-blue-50" },
                            { label: "Tests Submitted", value: "8", icon: CheckCircle, color: "text-green-600", bg: "bg-green-50" },
                            { label: "Avg. Score", value: "68%", icon: BarChart3, color: "text-brand-orange", bg: "bg-orange-50" },
                            { label: "Pending", value: "4", icon: Clock, color: "text-red-500", bg: "bg-red-50" },
                        ].map((stat, i) => (
                            <div key={i} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
                                    <stat.icon size={24} />
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-slate-800">{stat.value}</div>
                                    <div className="text-xs font-medium text-slate-500 uppercase tracking-wide">{stat.label}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* 2. RECENT TESTS TABLE */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div>
                                <h2 className="text-lg font-bold text-slate-800">Recent Test Papers</h2>
                                <p className="text-sm text-slate-500">Download QP, Write, Scan & Upload.</p>
                            </div>
                            
                            {/* Filter Tabs */}
                            <div className="flex bg-slate-100 p-1 rounded-lg">
                                <button className="px-3 py-1 bg-white shadow-sm rounded-md text-xs font-bold text-slate-800">All</button>
                                <button className="px-3 py-1 text-xs font-bold text-slate-500 hover:text-slate-700">Pending</button>
                                <button className="px-3 py-1 text-xs font-bold text-slate-500 hover:text-slate-700">Checked</button>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50/50 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100">
                                        <th className="px-6 py-4">Subject / Test</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4">Due Date</th>
                                        <th className="px-6 py-4">Marks</th>
                                        <th className="px-6 py-4 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 text-sm">
                                    {tests.map((test) => (
                                        <tr key={test.id} className="hover:bg-slate-50/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="font-bold text-slate-800">{test.subject}</div>
                                                <div className="text-slate-500 text-xs">{test.testName}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                {getStatusBadge(test.status)}
                                            </td>
                                            <td className="px-6 py-4 text-slate-600 font-medium">
                                                {test.dueDate}
                                            </td>
                                            <td className="px-6 py-4">
                                                {test.marks !== '-' ? (
                                                    <span className="font-bold text-slate-900">{test.marks}</span>
                                                ) : (
                                                    <span className="text-slate-400">-</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    {test.status === 'pending' && (
                                                        <>
                                                            <button className="p-2 text-slate-400 hover:text-brand-primary hover:bg-brand-primary/10 rounded-lg transition-colors" title="Download QP">
                                                                <Download size={18} />
                                                            </button>
                                                            <Button size="sm" className="h-9 text-xs px-3">
                                                                <Upload size={14} className="mr-1.5" /> Upload
                                                            </Button>
                                                        </>
                                                    )}
                                                    {test.status === 'checked' && (
                                                        <Button variant="outline" size="sm" className="h-9 text-xs px-3 border-green-200 text-green-700 hover:bg-green-50 hover:border-green-300">
                                                            View Result
                                                        </Button>
                                                    )}
                                                    {test.status === 'submitted' && (
                                                        <span className="text-xs text-slate-400 italic">Processing...</span>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            )}

        </main>
      </div>
    </div>
  );
};