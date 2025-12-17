import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  CheckSquare, 
  LogOut, 
  Search, 
  Plus, 
  Upload, 
  Download,
  Trash2,
  DollarSign,
  Menu,
  X,
  MoreVertical,
  Mail,
  Phone,
  Eye,
  EyeOff,
  Pencil,
  Save,
  PhoneIncoming,
  Check
} from 'lucide-react';
import { Button } from './Button';

interface AdminDashboardProps {
  onLogout: () => void;
  callbackRequests?: any[];
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout, callbackRequests = [] }) => {
  const [activeTab, setActiveTab] = useState('students'); // Default to students for this demo
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // State for Managing Students
  const [students, setStudents] = useState([
      { id: 1, name: "Demo Student", email: "demo@student.com", password: "demo123", mobile: "9999999999", plan: "Mentorship Pro", joined: "01 Nov", status: "Active", totalPayment: "₹ 5,999" },
      { id: 2, name: "Vikram Singh", email: "vikram@gmail.com", password: "pass@123", mobile: "9876543210", plan: "Detailed Series", joined: "12 Oct", status: "Active", totalPayment: "₹ 2,999" },
      { id: 3, name: "Anjali Gupta", email: "anjali.ca@yahoo.com", password: "anjali@2024", mobile: "9876500001", plan: "Full Syllabus", joined: "15 Oct", status: "Active", totalPayment: "₹ 1,499" },
      { id: 4, name: "Rohan Das", email: "rohan.d@gmail.com", password: "rohan#secure", mobile: "9876512345", plan: "Subject Wise", joined: "20 Oct", status: "Expiring", totalPayment: "₹ 499" },
      { id: 5, name: "Sneha Reddy", email: "sneha@outlook.com", password: "sneha_reddy", mobile: "9876567890", plan: "Full Syllabus", joined: "22 Oct", status: "Inactive", totalPayment: "₹ 1,499" },
  ]);

  // Visibility state for passwords
  const [visiblePasswords, setVisiblePasswords] = useState<Record<number, boolean>>({});

  // Edit Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<any>(null);

  // MOCK DATA for other tabs
  const stats = [
    { label: "Total Revenue", value: "₹ 1.2L", icon: DollarSign, color: "text-green-600", bg: "bg-green-100" },
    { label: "Active Students", value: students.length.toString(), icon: Users, color: "text-blue-600", bg: "bg-blue-100" },
    { label: "Pending Copies", value: "18", icon: FileText, color: "text-orange-600", bg: "bg-orange-100" },
    { label: "Callbacks", value: callbackRequests.length.toString(), icon: PhoneIncoming, color: "text-purple-600", bg: "bg-purple-100" },
  ];

  const pendingCopies = [
    { id: 101, student: "Rahul Verma", subject: "Audit", test: "Mock Test 1", submitted: "2 hrs ago" },
    { id: 102, student: "Priya Sharma", subject: "Accounts", test: "Chapter 3", submitted: "5 hrs ago" },
    { id: 103, student: "Amit Kumar", subject: "Taxation", test: "Full Syllabus", submitted: "1 day ago" },
  ];

  const allTests = [
    { id: 1, name: "Accounts Mock 1", subject: "Accounts", date: "24 Oct 2024", status: "Active" },
    { id: 2, name: "Law Chapter Wise", subject: "Law", date: "26 Oct 2024", status: "Scheduled" },
    { id: 3, name: "Costing Full Syllabus", subject: "Costing", date: "30 Oct 2024", status: "Draft" },
  ];

  // Handlers
  const togglePasswordVisibility = (id: number) => {
    setVisiblePasswords(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleEditClick = (student: any) => {
    setEditingStudent({ ...student });
    setIsEditModalOpen(true);
  };

  const handleAddClick = () => {
    setEditingStudent({
        id: null, // Indicates new student
        name: '',
        email: '',
        password: '',
        mobile: '',
        plan: 'Subject Wise',
        status: 'Active',
        totalPayment: '₹ 0',
        joined: '' 
    });
    setIsEditModalOpen(true);
  };

  const handleSaveStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingStudent.id) {
        // Edit existing student
        setStudents(prev => prev.map(s => s.id === editingStudent.id ? editingStudent : s));
    } else {
        // Add new student
        const newId = students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1;
        const newStudent = {
            ...editingStudent,
            id: newId,
            joined: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })
        };
        setStudents(prev => [newStudent, ...prev]);
    }
    setIsEditModalOpen(false);
    setEditingStudent(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditingStudent((prev: any) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-slate-100 flex font-sans">
      
      {/* SIDEBAR */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:block ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-20 flex items-center px-6 border-b border-slate-800">
           <span className="font-display font-bold text-xl tracking-tight">
              Admin<span className="text-brand-orange">Panel</span>
           </span>
           <button onClick={() => setIsMobileMenuOpen(false)} className="ml-auto lg:hidden text-slate-400">
             <X size={24} />
           </button>
        </div>

        <nav className="p-4 space-y-2">
            {[
                { id: 'overview', icon: LayoutDashboard, label: 'Overview' },
                { id: 'tests', icon: FileText, label: 'Manage Tests' },
                { id: 'checking', icon: CheckSquare, label: 'Check Copies' },
                { id: 'students', icon: Users, label: 'Student Manage' },
                { id: 'callbacks', icon: PhoneIncoming, label: 'Callbacks' },
            ].map((item) => (
                <button
                    key={item.id}
                    onClick={() => { setActiveTab(item.id); setIsMobileMenuOpen(false); }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium ${
                        activeTab === item.id 
                        ? 'bg-brand-orange text-white shadow-lg' 
                        : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                    }`}
                >
                    <item.icon size={18} />
                    {item.label}
                    {item.id === 'checking' && <span className="ml-auto bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full">18</span>}
                    {item.id === 'callbacks' && callbackRequests.filter(c => c.status === 'Pending').length > 0 && (
                        <span className="ml-auto bg-brand-orange/20 text-brand-orange border border-brand-orange/50 text-[10px] px-2 py-0.5 rounded-full">
                            {callbackRequests.filter(c => c.status === 'Pending').length}
                        </span>
                    )}
                </button>
            ))}
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
            <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-slate-800 transition-colors text-sm font-medium">
                <LogOut size={18} /> Logout
            </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* HEADER */}
        <header className="bg-white border-b border-slate-200 h-20 flex items-center justify-between px-8">
            <div className="flex items-center gap-4">
                <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden p-2 text-slate-600">
                   <Menu size={24} />
                </button>
                <h1 className="text-xl font-bold text-slate-800 capitalize">{activeTab === 'students' ? 'Student Management' : activeTab.replace('-', ' ')}</h1>
            </div>
            <div className="flex items-center gap-4">
                <div className="text-right hidden sm:block">
                    <div className="text-sm font-bold text-slate-800">Admin User</div>
                    <div className="text-xs text-slate-500">Super Access</div>
                </div>
                <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold">
                    AD
                </div>
            </div>
        </header>

        {/* CONTENT SCROLLABLE AREA */}
        <main className="flex-1 overflow-y-auto p-8 relative">
            
            {/* 1. OVERVIEW TAB */}
            {activeTab === 'overview' && (
                <div className="space-y-8 animate-fade-up">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {stats.map((stat, i) => (
                            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
                                <div className={`p-4 rounded-xl ${stat.bg} ${stat.color}`}>
                                    <stat.icon size={24} />
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-slate-800">{stat.value}</div>
                                    <div className="text-sm text-slate-500">{stat.label}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Recent Pending Copies */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-bold text-lg text-slate-800">Pending Validations</h3>
                            <Button size="sm" variant="ghost" onClick={() => setActiveTab('checking')}>View All</Button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-slate-50 text-xs uppercase text-slate-500 font-bold">
                                    <tr>
                                        <th className="px-6 py-3">Student</th>
                                        <th className="px-6 py-3">Subject</th>
                                        <th className="px-6 py-3">Submitted</th>
                                        <th className="px-6 py-3 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {pendingCopies.map((copy) => (
                                        <tr key={copy.id}>
                                            <td className="px-6 py-4 font-medium text-slate-800">{copy.student}</td>
                                            <td className="px-6 py-4 text-slate-600">{copy.subject} - {copy.test}</td>
                                            <td className="px-6 py-4 text-slate-500 text-sm">{copy.submitted}</td>
                                            <td className="px-6 py-4 text-right">
                                                <Button size="sm" className="bg-slate-900 text-white h-8 px-3 text-xs">Check Now</Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* 2. MANAGE TESTS TAB */}
            {activeTab === 'tests' && (
                <div className="space-y-6 animate-fade-up">
                    {/* Add New Test Form */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                        <h3 className="font-bold text-lg text-slate-800 mb-4 flex items-center gap-2">
                            <Plus className="bg-brand-orange text-white rounded-full p-1" size={24} /> 
                            Upload New Test Paper
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <input type="text" placeholder="Subject Name (e.g. Audit)" className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-sm" />
                            <input type="text" placeholder="Test Name (e.g. Mock Test 1)" className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-sm" />
                            <input type="date" className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-sm" />
                        </div>
                        <div className="mt-4 border-2 border-dashed border-slate-300 rounded-xl p-8 text-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
                            <Upload className="mx-auto text-slate-400 mb-2" />
                            <p className="text-sm text-slate-600 font-medium">Click to upload Question Paper PDF</p>
                        </div>
                        <div className="mt-4 flex justify-end">
                            <Button>Publish Test</Button>
                        </div>
                    </div>

                    {/* Existing Tests List */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                        <div className="p-6 border-b border-slate-100">
                            <h3 className="font-bold text-lg text-slate-800">All Test Papers</h3>
                        </div>
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 text-xs uppercase text-slate-500 font-bold">
                                <tr>
                                    <th className="px-6 py-3">ID</th>
                                    <th className="px-6 py-3">Test Name</th>
                                    <th className="px-6 py-3">Subject</th>
                                    <th className="px-6 py-3">Status</th>
                                    <th className="px-6 py-3 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {allTests.map((t) => (
                                    <tr key={t.id} className="hover:bg-slate-50">
                                        <td className="px-6 py-4 text-slate-500">#{t.id}</td>
                                        <td className="px-6 py-4 font-bold text-slate-800">{t.name}</td>
                                        <td className="px-6 py-4 text-slate-600">{t.subject}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${t.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>
                                                {t.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right flex justify-end gap-2">
                                            <button className="p-2 text-slate-400 hover:text-blue-600"><FileText size={18} /></button>
                                            <button className="p-2 text-slate-400 hover:text-red-600"><Trash2 size={18} /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* 3. CHECKING TAB */}
            {activeTab === 'checking' && (
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 animate-fade-up">
                    <h3 className="font-bold text-lg text-slate-800 mb-6">Answer Sheets Queue</h3>
                    
                    <div className="space-y-4">
                        {pendingCopies.map((copy) => (
                            <div key={copy.id} className="flex flex-col md:flex-row items-center justify-between p-4 border border-slate-200 rounded-xl bg-slate-50 hover:border-brand-orange/50 transition-colors">
                                <div className="flex items-center gap-4 mb-4 md:mb-0 w-full md:w-auto">
                                    <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center font-bold text-slate-700">
                                        {copy.student.charAt(0)}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-800">{copy.student}</h4>
                                        <p className="text-sm text-slate-500">{copy.subject} • {copy.test}</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-center gap-3 w-full md:w-auto">
                                    <Button variant="outline" size="sm" className="bg-white border-slate-300 text-slate-600">
                                        <Download size={16} className="mr-2" /> Download Sheet
                                    </Button>
                                    <div className="h-8 w-px bg-slate-300 hidden md:block"></div>
                                    <div className="flex gap-2">
                                        <input type="text" placeholder="Marks" className="w-20 px-3 py-1.5 rounded-lg border border-slate-300 text-sm" />
                                        <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white border-none">
                                            <Upload size={16} className="mr-2" /> Upload Checked
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* 5. CALLBACKS TAB (NEW) */}
            {activeTab === 'callbacks' && (
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden animate-fade-up">
                    <div className="p-6 border-b border-slate-100">
                        <h3 className="font-bold text-lg text-slate-800">Callback Enquiries</h3>
                        <p className="text-xs text-slate-500 mt-1">Leads from the home page 'Book Free Call' form.</p>
                    </div>
                    
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-slate-50 text-xs font-bold text-slate-500 uppercase tracking-wider">
                                <tr>
                                    <th className="px-6 py-4">Name</th>
                                    <th className="px-6 py-4">Mobile</th>
                                    <th className="px-6 py-4">Course</th>
                                    <th className="px-6 py-4">Date</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-sm">
                                {callbackRequests.map((request) => (
                                    <tr key={request.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-6 py-4 font-bold text-slate-800">{request.name}</td>
                                        <td className="px-6 py-4 font-mono text-slate-600">{request.mobile}</td>
                                        <td className="px-6 py-4 text-slate-600">
                                            <span className="bg-slate-100 px-2 py-1 rounded text-xs font-bold text-slate-500">{request.course}</span>
                                        </td>
                                        <td className="px-6 py-4 text-slate-500">{request.date}</td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold ${
                                                request.status === 'Pending' ? 'bg-orange-50 text-orange-600' : 'bg-green-50 text-green-600'
                                            }`}>
                                                {request.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            {request.status === 'Pending' ? (
                                                <Button size="sm" className="h-8 text-xs bg-green-600 hover:bg-green-700 border-none shadow-none">
                                                    <Phone size={14} className="mr-1" /> Call Now
                                                </Button>
                                            ) : (
                                                <span className="text-xs text-slate-400 italic">Completed</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                                {callbackRequests.length === 0 && (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                                            No callback requests yet.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
            
            {/* 4. STUDENTS TAB */}
            {activeTab === 'students' && (
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden animate-fade-up">
                    <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                        <div>
                            <h3 className="font-bold text-lg text-slate-800">Student Database</h3>
                            <p className="text-xs text-slate-500 mt-1">Manage logins, passwords and payments</p>
                        </div>
                        <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="text-xs">Export CSV</Button>
                            <Button size="sm" className="text-xs" onClick={handleAddClick}>Add New</Button>
                        </div>
                    </div>
                    
                    {/* Filter Bar */}
                    <div className="bg-slate-50 p-4 border-b border-slate-100 flex gap-4">
                        <div className="relative flex-1 max-w-xs">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                            <input type="text" placeholder="Search by name, email..." className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-slate-300" />
                        </div>
                        <select className="bg-white border border-slate-200 rounded-lg text-sm px-4 text-slate-600 focus:outline-none">
                            <option>All Status</option>
                            <option>Active</option>
                            <option>Inactive</option>
                        </select>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-slate-50 text-xs font-bold text-slate-500 uppercase tracking-wider">
                                <tr>
                                    <th className="px-6 py-4">Student Name</th>
                                    <th className="px-6 py-4">Credentials (Login)</th>
                                    <th className="px-6 py-4">Plan & Payment</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-sm">
                                {students.map((student) => (
                                    <tr key={student.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-brand-orange/10 text-brand-orange flex items-center justify-center text-xs font-bold">
                                                    {student.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-slate-800">{student.name}</div>
                                                    <div className="text-xs text-slate-500 flex items-center gap-1"><Phone size={10} /> {student.mobile}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col gap-2">
                                                <div className="flex items-center gap-1.5 text-slate-700 font-medium text-xs bg-slate-100 px-2 py-1 rounded w-fit">
                                                    <Mail size={12} /> {student.email}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <div className="font-mono text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded">
                                                        {visiblePasswords[student.id] ? student.password : '••••••••'}
                                                    </div>
                                                    <button 
                                                        onClick={() => togglePasswordVisibility(student.id)}
                                                        className="text-slate-400 hover:text-brand-orange transition-colors"
                                                        title={visiblePasswords[student.id] ? "Hide Password" : "Show Password"}
                                                    >
                                                        {visiblePasswords[student.id] ? <EyeOff size={14} /> : <Eye size={14} />}
                                                    </button>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col gap-1">
                                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-blue-50 text-blue-700 w-fit">
                                                    {student.plan}
                                                </span>
                                                <span className="text-xs font-bold text-slate-600 flex items-center gap-1">
                                                    Paid: <span className="text-green-600">{student.totalPayment}</span>
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-bold ${
                                                student.status === 'Active' ? 'text-green-600 bg-green-50' : 
                                                student.status === 'Expiring' ? 'text-orange-600 bg-orange-50' :
                                                'text-slate-500 bg-slate-100'
                                            }`}>
                                                <span className={`w-1.5 h-1.5 rounded-full ${
                                                    student.status === 'Active' ? 'bg-green-500' : 
                                                    student.status === 'Expiring' ? 'bg-orange-500' :
                                                    'bg-slate-400'
                                                }`}></span>
                                                {student.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <button 
                                                    onClick={() => handleEditClick(student)}
                                                    className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" 
                                                    title="Edit Details"
                                                >
                                                    <Pencil size={16} />
                                                </button>
                                                <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* EDIT STUDENT MODAL */}
            {isEditModalOpen && editingStudent && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsEditModalOpen(false)}></div>
                    <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 animate-fade-up">
                        <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
                            <h3 className="text-lg font-bold text-slate-800">{editingStudent.id ? 'Edit Student Details' : 'Add New Student'}</h3>
                            <button onClick={() => setIsEditModalOpen(false)} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
                        </div>
                        
                        <form onSubmit={handleSaveStudent} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                                    <input 
                                        type="text" 
                                        name="name" 
                                        value={editingStudent.name} 
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-brand-orange" 
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">Mobile</label>
                                    <input 
                                        type="text" 
                                        name="mobile" 
                                        value={editingStudent.mobile} 
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-brand-orange" 
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">Email (User ID)</label>
                                    <input 
                                        type="email" 
                                        name="email" 
                                        value={editingStudent.email} 
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-brand-orange" 
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
                                    <div className="relative">
                                        <input 
                                            type="text" 
                                            name="password" 
                                            value={editingStudent.password} 
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-brand-orange font-mono" 
                                            required
                                        />
                                        <div className="absolute right-2 top-2 text-slate-400 text-xs pointer-events-none">Editable</div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">Active Plan</label>
                                    <select 
                                        name="plan" 
                                        value={editingStudent.plan} 
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-brand-orange"
                                    >
                                        <option>Subject Wise</option>
                                        <option>Full Syllabus</option>
                                        <option>Detailed Series</option>
                                        <option>Mentorship Pro</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">Total Payment</label>
                                    <input 
                                        type="text" 
                                        name="totalPayment" 
                                        value={editingStudent.totalPayment} 
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-brand-orange font-bold text-green-700" 
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1">Account Status</label>
                                <select 
                                    name="status" 
                                    value={editingStudent.status} 
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-brand-orange"
                                >
                                    <option>Active</option>
                                    <option>Inactive</option>
                                    <option>Expiring</option>
                                </select>
                            </div>

                            <div className="pt-4 flex gap-3">
                                <Button fullWidth variant="ghost" onClick={() => setIsEditModalOpen(false)} className="bg-slate-100">Cancel</Button>
                                <Button fullWidth onClick={handleSaveStudent}>
                                    <Save size={16} className="mr-2" /> {editingStudent.id ? 'Save Changes' : 'Add Student'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </main>
      </div>
    </div>
  );
};