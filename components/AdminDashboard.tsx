
import React, { useState, useEffect } from 'react';
import { db } from '../services/dbService';
import { Property, Transaction, SystemSettings, User, Inquiry } from '../types';

type AdminTab = 'overview' | 'users' | 'listings' | 'financials' | 'cms' | 'settings' | 'security';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [properties, setProperties] = useState<Property[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [settings, setSettings] = useState<SystemSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userSearch, setUserSearch] = useState('');

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = async () => {
    setIsLoading(true);
    const [p, i, u, t, s] = await Promise.all([
      db.queryProperties(),
      db.queryInquiries(),
      db.queryUsers(),
      db.queryTransactions(),
      db.querySettings()
    ]);
    setProperties(p);
    setInquiries(i);
    setUsers(u);
    setTransactions(t);
    setSettings(s);
    setIsLoading(false);
  };

  const handleUserAction = async (userId: string, action: 'ban' | 'verify' | 'suspend') => {
    const allUsers = await db.queryUsers();
    const idx = allUsers.findIndex(u => u.id === userId);
    if (idx > -1) {
      if (action === 'ban') allUsers[idx].status = 'suspended';
      if (action === 'verify') allUsers[idx].verified = true;
      if (action === 'suspend') allUsers[idx].status = allUsers[idx].status === 'suspended' ? 'active' : 'suspended';
      await db.updateUser(allUsers[idx]);
      refreshData();
    }
  };

  const approveProperty = async (propId: string) => {
    const prop = properties.find(p => p.id === propId);
    if (prop) {
      prop.status = 'Approved';
      await db.upsertProperty(prop);
      refreshData();
    }
  };

  const updatePlatformSettings = async (newSettings: SystemSettings) => {
    await db.updateSettings(newSettings);
    setSettings(newSettings);
  };

  const renderOverview = () => {
    const totalRevenue = transactions.reduce((acc, t) => acc + (t.status === 'Completed' ? t.amount : 0), 0);
    return (
      <div className="space-y-10 animate__animated animate__fadeIn">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard label="Total Revenue" value={`₦${(totalRevenue / 1000).toFixed(1)}k`} trend="+12%" color="text-emerald-600" />
          <StatCard label="Total Identities" value={users.length.toString()} trend="+3 today" color="text-gray-900" />
          <StatCard label="Active Assets" value={properties.filter(p => p.status === 'Approved').length.toString()} trend="Live" color="text-gray-900" />
          <StatCard label="Platform Growth" value="28%" trend="Monthly" color="text-fuchsia-600" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm">
              <h3 className="text-xl font-black uppercase tracking-tighter mb-8">Asset Liquidity</h3>
              <div className="space-y-6">
                {properties.slice(0, 4).map(p => (
                  <div key={p.id} className="flex justify-between items-center text-sm border-b border-gray-50 pb-4">
                    <span className="font-bold text-gray-900 truncate pr-4">{p.title}</span>
                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${p.status === 'Approved' ? 'bg-emerald-50 text-emerald-600' : 'bg-orange-50 text-orange-600'}`}>
                      {p.status || 'Pending'}
                    </span>
                  </div>
                ))}
              </div>
           </div>
           <div className="bg-emerald-950 rounded-[3rem] p-10 text-white relative overflow-hidden">
              <h3 className="text-xl font-black uppercase tracking-tighter mb-6 relative z-10">System Integrity</h3>
              <div className="space-y-4 relative z-10">
                 <IntegrityRow label="Virtual PG Nodes" value="4 Active" />
                 <IntegrityRow label="AI Latency" value="180ms" />
                 <IntegrityRow label="Security Mesh" value="Fully Armed" />
                 <IntegrityRow label="Escrow Filter" value="Active" />
              </div>
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-emerald-600/20 blur-[80px] rounded-full"></div>
           </div>
        </div>
      </div>
    );
  };

  const renderFinancials = () => (
    <div className="space-y-8 animate__animated animate__fadeIn">
      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Transaction ID</th>
              <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Description</th>
              <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Amount</th>
              <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 font-bold text-xs">
            {transactions.map(t => (
              <tr key={t.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-8 py-6 text-emerald-600">#{t.id.toUpperCase()}</td>
                <td className="px-8 py-6 text-gray-900 uppercase tracking-tighter">{t.description}</td>
                <td className="px-8 py-6 font-black">{t.currency}{t.amount.toLocaleString()}</td>
                <td className="px-8 py-6">
                  <span className={`px-2 py-1 rounded-md text-[9px] uppercase tracking-widest ${t.status === 'Completed' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>{t.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="max-w-2xl mx-auto space-y-10 animate__animated animate__fadeIn">
      <div className="bg-white p-12 rounded-[3rem] border border-gray-100 shadow-sm">
        <h3 className="text-xl font-black uppercase tracking-tighter mb-8">Platform Global Config</h3>
        <div className="space-y-8">
           <div className="flex items-center justify-between p-6 bg-gray-50 rounded-2xl">
              <div>
                 <p className="text-sm font-black text-gray-900 uppercase tracking-tight">AI Recommendation Engine</p>
                 <p className="text-[10px] text-gray-400 font-bold">Automatic listing matches for verified buyers.</p>
              </div>
              <button 
                onClick={() => settings && updatePlatformSettings({...settings, aiEngineEnabled: !settings.aiEngineEnabled})}
                className={`w-14 h-8 rounded-full transition-all relative ${settings?.aiEngineEnabled ? 'bg-emerald-600' : 'bg-gray-300'}`}
              >
                <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${settings?.aiEngineEnabled ? 'left-7' : 'left-1'}`}></div>
              </button>
           </div>

           <div className="flex items-center justify-between p-6 bg-gray-50 rounded-2xl border-2 border-red-50">
              <div>
                 <p className="text-sm font-black text-red-600 uppercase tracking-tight">Executive Maintenance Mode</p>
                 <p className="text-[10px] text-gray-400 font-bold">Restrict platform access to Super Admins only.</p>
              </div>
              <button 
                onClick={() => settings && updatePlatformSettings({...settings, maintenanceMode: !settings.maintenanceMode})}
                className={`w-14 h-8 rounded-full transition-all relative ${settings?.maintenanceMode ? 'bg-red-600' : 'bg-gray-300'}`}
              >
                <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${settings?.maintenanceMode ? 'left-7' : 'left-1'}`}></div>
              </button>
           </div>
        </div>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="space-y-8 animate__animated animate__fadeIn">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-black uppercase tracking-tighter">Identity Management</h2>
        <input 
          type="text" 
          placeholder="Filter by name/email..." 
          value={userSearch}
          onChange={e => setUserSearch(e.target.value)}
          className="bg-white border-gray-100 rounded-2xl px-6 py-4 text-sm font-semibold shadow-sm w-96"
        />
      </div>
      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">User Entity</th>
              <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Privilege</th>
              <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
              <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Control</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {users.filter(u => u.name.toLowerCase().includes(userSearch.toLowerCase()) || u.email.toLowerCase().includes(userSearch.toLowerCase())).map(u => (
              <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-8 py-6">
                   <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-emerald-50 text-emerald-600 font-black rounded-xl flex items-center justify-center">{u.name[0]}</div>
                      <div>
                         <p className="text-xs font-black uppercase tracking-tighter">{u.name}</p>
                         <p className="text-[10px] text-gray-400 lowercase">{u.email}</p>
                      </div>
                   </div>
                </td>
                <td className="px-8 py-6">
                  <span className={`px-2 py-1 rounded-md text-[9px] uppercase font-black tracking-widest ${u.role === 'admin' ? 'bg-fuchsia-50 text-fuchsia-700' : 'bg-emerald-50 text-emerald-700'}`}>{u.role}</span>
                </td>
                <td className="px-8 py-6 font-bold text-[10px] uppercase tracking-widest">{u.status}</td>
                <td className="px-8 py-6 flex space-x-2">
                   <button onClick={() => handleUserAction(u.id, 'suspend')} className="text-[10px] font-black uppercase tracking-widest bg-gray-50 px-4 py-2 rounded-xl hover:bg-red-50 hover:text-red-600 transition-all">Toggle Suspend</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
      <aside className="w-full lg:w-80 bg-white border-r border-gray-200 z-40">
        <div className="p-10">
          <div className="mb-10 text-center">
             <span className="text-xl font-black tracking-tighter block uppercase">NUGA COMMAND</span>
             <p className="text-[8px] font-black text-gray-300 uppercase tracking-[0.4em] mt-2">Elite System v4.5</p>
          </div>
          <nav className="space-y-2">
            {[
              { id: 'overview', label: 'Global Overview', icon: 'M4 6h16M4 12h16M4 18h16' },
              { id: 'users', label: 'Identities', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
              { id: 'financials', label: 'Revenue & Ledger', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7' },
              { id: 'settings', label: 'System Config', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066' },
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as AdminTab)}
                className={`w-full flex items-center space-x-4 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === item.id ? 'bg-emerald-600 text-white shadow-lg' : 'text-gray-400 hover:bg-gray-50'}`}
              >
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </aside>

      <main className="flex-1 p-6 sm:p-12 lg:p-20 overflow-x-hidden">
        {isLoading ? (
          <div className="h-full flex items-center justify-center">
             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
          </div>
        ) : (
          <>
            {activeTab === 'overview' && renderOverview()}
            {activeTab === 'users' && renderUsers()}
            {activeTab === 'financials' && renderFinancials()}
            {activeTab === 'settings' && renderSettings()}
          </>
        )}
      </main>
    </div>
  );
};

const StatCard: React.FC<{ label: string; value: string; trend: string; color: string }> = ({ label, value, trend, color }) => (
  <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm relative overflow-hidden group">
    <div className="relative z-10">
      <div className="flex justify-between items-start mb-4">
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{label}</p>
        <span className="text-[9px] font-black text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full">{trend}</span>
      </div>
      <h3 className={`text-3xl font-black tracking-tighter ${color}`}>{value}</h3>
    </div>
  </div>
);

const IntegrityRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex justify-between items-center text-sm">
    <span className="text-emerald-400 font-medium italic">{label}</span>
    <span className="font-black tracking-tight">{value}</span>
  </div>
);

export default AdminDashboard;
