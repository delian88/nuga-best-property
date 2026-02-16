
import React, { useState, useEffect } from 'react';
// Corrected import: User and Inquiry should be imported from types.ts, db from dbService
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

  // Filters for User Management
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
    const updatedUsers = [...users];
    const idx = updatedUsers.findIndex(u => u.id === userId);
    if (idx > -1) {
      if (action === 'ban') updatedUsers[idx].status = 'suspended';
      if (action === 'verify') updatedUsers[idx].verified = true;
      if (action === 'suspend') updatedUsers[idx].status = updatedUsers[idx].status === 'suspended' ? 'active' : 'suspended';
      
      await db.updateUser(updatedUsers[idx]);
      setUsers(updatedUsers);
    }
  };

  const approveProperty = async (propId: string) => {
    const updatedProps = [...properties];
    const idx = updatedProps.findIndex(p => p.id === propId);
    if (idx > -1) {
      updatedProps[idx].status = 'Approved';
      await db.upsertProperty(updatedProps[idx]);
      setProperties(updatedProps);
    }
  };

  const renderOverview = () => {
    const revenue = transactions.reduce((acc, t) => acc + (t.status === 'Completed' ? t.amount : 0), 0);
    return (
      <div className="space-y-10 animate__animated animate__fadeIn">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard label="Total Revenue" value={`₦${(revenue / 1000).toFixed(1)}K`} trend="+12%" color="text-emerald-600" />
          <StatCard label="Total Users" value={users.length.toString()} trend="+4 today" color="text-gray-900" />
          <StatCard label="Active Listings" value={properties.filter(p => p.status === 'Approved').length.toString()} trend="96.4%" color="text-gray-900" />
          <StatCard label="Platform Growth" value="28%" trend="Monthly" color="text-fuchsia-600" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm">
            <h3 className="text-xl font-black uppercase tracking-tighter mb-8">Transaction Velocity</h3>
            <div className="h-64 flex items-end space-x-2">
              {[40, 70, 45, 90, 65, 80, 55, 95, 75, 85, 100, 60].map((h, i) => (
                <div key={i} className="flex-1 bg-emerald-100 rounded-t-xl hover:bg-emerald-600 transition-all cursor-pointer group relative" style={{ height: `${h}%` }}>
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">₦{h}k</div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-between text-[10px] font-black text-gray-300 uppercase tracking-widest">
              <span>Jan</span><span>Apr</span><span>Jul</span><span>Oct</span><span>Dec</span>
            </div>
          </div>
          <div className="bg-emerald-950 rounded-[3rem] p-10 text-white relative overflow-hidden">
            <h3 className="text-xl font-black uppercase tracking-tighter mb-6 relative z-10">System Integrity</h3>
            <div className="space-y-6 relative z-10">
              <IntegrityRow label="Cloud Nodes" value="Stable (4/4)" />
              <IntegrityRow label="AI Latency" value="240ms" />
              <IntegrityRow label="Database Sync" value="99.9%" />
              <IntegrityRow label="Fraud Filter" value="Armed" />
            </div>
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-emerald-600/20 blur-[80px] rounded-full"></div>
          </div>
        </div>

        <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm">
           <h3 className="text-xl font-black uppercase tracking-tighter mb-8">Executive Activity Log</h3>
           <div className="space-y-6">
             {inquiries.slice(0, 5).map(inq => (
               <div key={inq.id} className="flex items-center justify-between border-b border-gray-50 pb-6 last:border-0 last:pb-0">
                 <div className="flex items-center space-x-4">
                   <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 font-black">
                     {inq.name[0]}
                   </div>
                   <div>
                     <p className="text-sm font-bold text-gray-900">{inq.name} sent an inquiry</p>
                     <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">{inq.timestamp}</p>
                   </div>
                 </div>
                 <button className="text-[10px] font-black text-emerald-600 uppercase tracking-widest hover:underline">Review</button>
               </div>
             ))}
           </div>
        </div>
      </div>
    );
  };

  const renderUsers = () => (
    <div className="space-y-8 animate__animated animate__fadeIn">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-2xl font-black uppercase tracking-tighter">Global User Repository</h2>
        <div className="relative w-full md:w-96">
          <input 
            type="text" 
            placeholder="Search identity or email..." 
            value={userSearch}
            onChange={e => setUserSearch(e.target.value)}
            className="w-full bg-white border-gray-100 rounded-2xl px-6 py-4 text-sm font-semibold focus:ring-2 focus:ring-emerald-500 shadow-sm"
          />
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">User Entity</th>
              <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Privilege</th>
              <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Trust Level</th>
              <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {users.filter(u => u.name.toLowerCase().includes(userSearch.toLowerCase()) || u.email.toLowerCase().includes(userSearch.toLowerCase())).map(u => (
              <tr key={u.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-8 py-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center font-black text-gray-400">{u.name[0]}</div>
                    <div>
                      <p className="font-black text-gray-900 uppercase tracking-tight text-sm">{u.name}</p>
                      <p className="text-[10px] text-gray-400 font-bold lowercase">{u.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                    u.role === 'admin' ? 'bg-fuchsia-50 text-fuchsia-700' : 'bg-emerald-50 text-emerald-700'
                  }`}>{u.role}</span>
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center space-x-2">
                    {u.verified ? (
                      <span className="flex items-center text-emerald-600 text-[10px] font-black uppercase tracking-widest">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                        Verified
                      </span>
                    ) : (
                      <span className="text-gray-400 text-[10px] font-black uppercase tracking-widest">Unverified</span>
                    )}
                  </div>
                </td>
                <td className="px-8 py-6">
                  <div className="flex space-x-2">
                    {!u.verified && (
                      <button onClick={() => handleUserAction(u.id, 'verify')} className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-600 hover:text-white transition-all shadow-sm">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg>
                      </button>
                    )}
                    <button onClick={() => handleUserAction(u.id, 'suspend')} className={`p-2.5 rounded-xl transition-all shadow-sm ${u.status === 'suspended' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600 hover:bg-red-600 hover:text-white'}`}>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636"/></svg>
                    </button>
                  </div>
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
      {/* Super Sidebar */}
      <aside className="w-full lg:w-80 bg-white border-r border-gray-200 lg:sticky lg:top-0 lg:h-screen overflow-y-auto z-40">
        <div className="p-10">
          <div className="mb-10 text-center">
             <span className="text-xl font-black tracking-tighter shining-text block uppercase">NUGA COMMAND</span>
             <p className="text-[8px] font-black text-gray-300 uppercase tracking-[0.4em] mt-2">V4.2.0 Elite Admin</p>
          </div>

          <nav className="space-y-2">
            {[
              { id: 'overview', label: 'Global Overview', icon: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z' },
              { id: 'users', label: 'User Entities', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
              { id: 'listings', label: 'Asset Moderation', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
              { id: 'financials', label: 'Revenue & Ledger', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
              { id: 'cms', label: 'Content (CMS)', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
              { id: 'settings', label: 'System Config', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
              { id: 'security', label: 'Security & Logs', icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 00-2 2zm10-10V7a4 4 0 00-8 0v4h8z' },
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as AdminTab)}
                className={`w-full flex items-center space-x-4 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  activeTab === item.id 
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200' 
                  : 'text-gray-400 hover:bg-gray-50 hover:text-emerald-600'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon}/></svg>
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="mt-12 pt-12 border-t border-gray-100">
             <div className="bg-emerald-50 rounded-2xl p-6">
                <p className="text-[9px] font-black text-emerald-600 uppercase tracking-widest mb-2">Support Session</p>
                <button className="w-full bg-white text-emerald-950 font-black py-3 rounded-xl text-[10px] shadow-sm uppercase">Open Tickets</button>
             </div>
          </div>
        </div>
      </aside>

      {/* Main Command View */}
      <main className="flex-1 p-6 sm:p-12 lg:p-20 overflow-x-hidden">
        {isLoading ? (
          <div className="h-full flex items-center justify-center">
             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
          </div>
        ) : (
          <>
            {activeTab === 'overview' && renderOverview()}
            {activeTab === 'users' && renderUsers()}
            {(['listings', 'financials', 'cms', 'settings', 'security'] as AdminTab[]).includes(activeTab) && activeTab !== 'overview' && activeTab !== 'users' && (
              <div className="h-[60vh] flex items-center justify-center bg-white rounded-[3rem] border border-gray-100 animate__animated animate__fadeIn">
                 <div className="text-center max-w-md">
                    <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
                       <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/></svg>
                    </div>
                    <h3 className="text-xl font-black uppercase tracking-tight mb-2">Module Under Calibration</h3>
                    <p className="text-gray-500 italic">This Super Admin module ({activeTab}) is being synchronized with the global backbone.</p>
                 </div>
              </div>
            )}
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
    <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-gray-50 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
  </div>
);

const IntegrityRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex justify-between items-center text-sm">
    <span className="text-emerald-400 font-medium">{label}</span>
    <span className="font-black tracking-tight">{value}</span>
  </div>
);

export default AdminDashboard;
