
import React, { useState, useEffect } from 'react';
import { db, User } from '../services/dbService';
import { Property, Appointment, ChatMessage, Offer } from '../types';

interface UserDashboardProps {
  user: User;
  onLogout: () => void;
}

const UserDashboard: React.FC<UserDashboardProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'listings' | 'saved' | 'messages' | 'appointments' | 'offers' | 'calculators' | 'profile'>('overview');
  const [properties, setProperties] = useState<Property[]>([]);
  const [savedProps, setSavedProps] = useState<Property[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mortgage Calculator State
  const [mortgage, setMortgage] = useState({ principal: 50000000, rate: 18, years: 20 });

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setIsLoading(true);
    const [allProps, saved, apts, msgs, ofs] = await Promise.all([
      db.queryProperties(),
      db.querySavedProperties(user.id),
      db.queryAppointments(user.id),
      db.queryMessages(user.id),
      db.queryOffers(user.id)
    ]);
    setProperties(allProps.filter(p => p.ownerId === user.id));
    setSavedProps(saved);
    setAppointments(apts);
    setMessages(msgs);
    setOffers(ofs);
    setIsLoading(false);
  };

  const calculateMortgage = () => {
    const p = mortgage.principal;
    const r = mortgage.rate / 100 / 12;
    const n = mortgage.years * 12;
    const payment = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return isNaN(payment) ? 0 : Math.round(payment);
  };

  const renderOverview = () => (
    <div className="space-y-10 animate__animated animate__fadeIn">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Saved Properties</p>
          <h3 className="text-3xl font-black text-gray-900 tracking-tighter">{savedProps.length}</h3>
        </div>
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Active Offers</p>
          <h3 className="text-3xl font-black text-emerald-600 tracking-tighter">{offers.filter(o => o.status === 'Pending').length}</h3>
        </div>
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Pending Tours</p>
          <h3 className="text-3xl font-black text-fuchsia-600 tracking-tighter">{appointments.length}</h3>
        </div>
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Messages</p>
          <h3 className="text-3xl font-black text-gray-900 tracking-tighter">{messages.length}</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-emerald-950 rounded-[3rem] p-12 text-white relative overflow-hidden">
          <h2 className="text-2xl font-black uppercase tracking-tighter mb-4 relative z-10">AI Recommendations</h2>
          <p className="text-emerald-300 mb-8 opacity-80 relative z-10 font-medium italic">Based on your saved properties in Lekki Phase 1, we found 3 high-yield apartments currently off-market.</p>
          <button className="bg-white text-emerald-950 px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest relative z-10">View Briefing</button>
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600/20 blur-[80px]"></div>
        </div>
        <div className="bg-white p-12 rounded-[3rem] border border-gray-100 shadow-sm">
           <h2 className="text-xl font-black uppercase tracking-tighter mb-6">Recent Activity</h2>
           <div className="space-y-6">
             {appointments.slice(0, 3).map(a => (
               <div key={a.id} className="flex items-center space-x-4">
                 <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-emerald-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 00-2 2z"/></svg>
                 </div>
                 <div>
                   <p className="text-sm font-bold text-gray-900">Tour scheduled for property #{a.propertyId.substr(0, 5)}</p>
                   <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{a.date} at {a.time}</p>
                 </div>
               </div>
             ))}
             {appointments.length === 0 && <p className="text-gray-400 text-sm italic">No recent activity found.</p>}
           </div>
        </div>
      </div>
    </div>
  );

  const renderCalculators = () => (
    <div className="max-w-4xl mx-auto space-y-12 animate__animated animate__fadeIn">
      <div className="bg-white p-12 rounded-[3rem] border border-gray-100 shadow-sm">
        <h2 className="text-3xl font-black uppercase tracking-tighter mb-10 shining-text">Mortgage Estimator</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Principal (₦)</label>
            <input type="number" value={mortgage.principal} onChange={e => setMortgage({...mortgage, principal: parseInt(e.target.value)})} className="w-full bg-gray-50 border-0 rounded-2xl p-4 font-black text-emerald-600" />
          </div>
          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Interest Rate (%)</label>
            <input type="number" value={mortgage.rate} onChange={e => setMortgage({...mortgage, rate: parseFloat(e.target.value)})} className="w-full bg-gray-50 border-0 rounded-2xl p-4 font-black" />
          </div>
          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Duration (Years)</label>
            <input type="number" value={mortgage.years} onChange={e => setMortgage({...mortgage, years: parseInt(e.target.value)})} className="w-full bg-gray-50 border-0 rounded-2xl p-4 font-black" />
          </div>
        </div>
        <div className="bg-emerald-50 p-8 rounded-[2rem] text-center border border-emerald-100">
           <p className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.3em] mb-2">Estimated Monthly Payment</p>
           <h3 className="text-5xl font-black text-emerald-950 tracking-tighter">₦{calculateMortgage().toLocaleString()}</h3>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-full lg:w-80 bg-white border-r border-gray-200 lg:sticky lg:top-20 lg:h-[calc(100vh-80px)] overflow-y-auto">
        <div className="p-10">
          <div className="flex items-center space-x-4 mb-10">
            <div className="w-14 h-14 bg-emerald-600 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-emerald-200 uppercase">
              {user.name[0]}
            </div>
            <div>
              <h2 className="font-black text-gray-900 uppercase tracking-tight text-sm">{user.name}</h2>
              <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest">{user.role} Portal</span>
            </div>
          </div>

          <nav className="space-y-2">
            {[
              { id: 'overview', label: 'Dashboard', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
              { id: 'saved', label: 'Saved Assets', icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' },
              { id: 'messages', label: 'Messages', icon: 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z' },
              { id: 'appointments', label: 'Tour Calendar', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
              { id: 'offers', label: 'Offer Pipeline', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
              { id: 'calculators', label: 'Financial Tools', icon: 'M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z' },
              { id: 'profile', label: 'My Identity', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
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
            <button onClick={onLogout} className="w-full flex items-center space-x-4 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-red-400 hover:bg-red-50 transition-all">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
              <span>Terminate Session</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 sm:p-12 lg:p-20 overflow-x-hidden">
        {isLoading ? (
          <div className="h-full flex items-center justify-center">
             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
          </div>
        ) : (
          <>
            {activeTab === 'overview' && renderOverview()}
            {activeTab === 'calculators' && renderCalculators()}
            {activeTab === 'saved' && (
              <div className="space-y-10 animate__animated animate__fadeIn">
                <h2 className="text-3xl font-black uppercase tracking-tighter shining-text">Saved Assets</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                  {savedProps.map(p => (
                    <div key={p.id} className="bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-sm group">
                       <img src={p.imageUrl} className="w-full h-48 object-cover group-hover:scale-105 transition-transform" />
                       <div className="p-8">
                         <h4 className="font-black text-gray-900 uppercase tracking-tight mb-2">{p.title}</h4>
                         <p className="text-emerald-600 font-black mb-4">{p.currency}{p.price.toLocaleString()}</p>
                         <button className="w-full bg-emerald-600 text-white font-black py-4 rounded-2xl text-[10px] uppercase tracking-widest">Inquire Asset</button>
                       </div>
                    </div>
                  ))}
                  {savedProps.length === 0 && <p className="text-gray-400 italic">You haven't saved any assets yet.</p>}
                </div>
              </div>
            )}
            {activeTab === 'messages' && (
               <div className="bg-white rounded-[3rem] border border-gray-100 h-[700px] flex flex-col shadow-sm animate__animated animate__fadeIn">
                 <div className="p-8 border-b border-gray-50">
                    <h2 className="text-xl font-black uppercase tracking-tighter">Secure Communication</h2>
                 </div>
                 <div className="flex-1 overflow-y-auto p-10 space-y-6">
                    {messages.map(m => (
                      <div key={m.id} className={`flex ${m.senderId === user.id ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-md p-6 rounded-3xl text-sm leading-relaxed ${m.senderId === user.id ? 'bg-emerald-600 text-white rounded-br-none shadow-lg' : 'bg-gray-50 text-gray-900 rounded-bl-none italic'}`}>
                          {m.text}
                        </div>
                      </div>
                    ))}
                    {messages.length === 0 && <div className="text-center py-20 text-gray-400 italic">No message history found.</div>}
                 </div>
                 <div className="p-8 border-t border-gray-50 flex space-x-4">
                    <input className="flex-1 bg-gray-50 border-0 rounded-2xl p-4 font-semibold focus:ring-2 focus:ring-emerald-500" placeholder="Type message..." />
                    <button className="bg-emerald-600 text-white p-4 rounded-2xl shadow-lg">
                       <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
                    </button>
                 </div>
               </div>
            )}
            {(activeTab === 'profile' || activeTab === 'appointments' || activeTab === 'offers') && (
              <div className="h-[60vh] flex items-center justify-center bg-white rounded-[3rem] border border-gray-100 animate__animated animate__fadeIn">
                 <div className="text-center max-w-md">
                    <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
                       <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/></svg>
                    </div>
                    <h3 className="text-xl font-black uppercase tracking-tight mb-2">Refining This Module</h3>
                    <p className="text-gray-500 italic">Our executive engineering team is finalizing the secure infrastructure for this section.</p>
                 </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default UserDashboard;
