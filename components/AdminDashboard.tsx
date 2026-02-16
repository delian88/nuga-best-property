
import React, { useState, useEffect } from 'react';
import { db, Inquiry, User } from '../services/dbService';
import { Property } from '../types';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'listings' | 'inquiries'>('overview');
  const [properties, setProperties] = useState<Property[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingProp, setEditingProp] = useState<Property | null>(null);
  
  const [formProp, setFormProp] = useState<Partial<Property>>({
    title: '', type: 'For Sale', category: 'House', price: 0, 
    location: '', currency: '₦', beds: 3, baths: 3, postedDate: 'Just now'
  });

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = async () => {
    const [p, i, u] = await Promise.all([
      db.queryProperties(),
      db.queryInquiries(),
      db.queryUsers()
    ]);
    setProperties(p);
    setInquiries(i);
    setUsers(u);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Confirm deletion of this luxury asset?')) {
      await db.deleteProperty(id);
      refreshData();
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const p: Property = {
      ...formProp,
      id: editingProp?.id || `prop_${Math.random().toString(36).substr(2, 9)}`,
      imageUrl: editingProp?.imageUrl || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      featured: editingProp?.featured || false,
    } as Property;
    
    await db.upsertProperty(p);
    setIsAdding(false);
    setEditingProp(null);
    refreshData();
  };

  const openEdit = (p: Property) => {
    setEditingProp(p);
    setFormProp(p);
    setIsAdding(true);
  };

  const totalValue = properties.reduce((acc, curr) => acc + curr.price, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate__animated animate__fadeIn">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 space-y-6 lg:space-y-0">
        <div>
          <h1 className="text-4xl font-black text-gray-900 uppercase tracking-tighter font-serif shining-text">Command Center</h1>
          <p className="text-gray-500 font-medium mt-1">Nuga Best Properties • Executive Management Portal</p>
        </div>
        <div className="flex bg-white p-1.5 rounded-2xl shadow-sm border border-gray-100">
          {(['overview', 'listings', 'inquiries'] as const).map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                activeTab === tab 
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200' 
                : 'text-gray-400 hover:text-emerald-600'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'overview' && (
        <div className="space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">Portfolio Value</p>
              <h3 className="text-3xl font-black text-emerald-600 tracking-tighter">₦{(totalValue / 1000000000).toFixed(2)}B</h3>
            </div>
            <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">Active Assets</p>
              <h3 className="text-3xl font-black text-gray-900 tracking-tighter">{properties.length}</h3>
            </div>
            <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">Client Base</p>
              <h3 className="text-3xl font-black text-gray-900 tracking-tighter">{users.length}</h3>
            </div>
            <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">Unread Leads</p>
              <h3 className="text-3xl font-black text-fuchsia-600 tracking-tighter">{inquiries.length}</h3>
            </div>
          </div>

          <div className="bg-emerald-950 rounded-[3rem] p-12 text-white overflow-hidden relative">
            <div className="relative z-10 max-w-2xl">
              <h2 className="text-3xl font-black uppercase tracking-tighter mb-4">Strategic Growth</h2>
              <p className="text-emerald-300 font-medium leading-relaxed opacity-80">
                Quarterly projections show a 14% increase in high-yield asset requests in the Abuja and Lagos regions. 
                Our executive advisory board recommends focus on Maitama and Ikoyi waterfronts.
              </p>
            </div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-600/20 blur-[100px] rounded-full"></div>
          </div>
        </div>
      )}

      {activeTab === 'listings' && (
        <div className="space-y-8 animate__animated animate__fadeIn">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-black text-gray-900 uppercase tracking-tighter">Asset Inventory</h2>
            <button 
              onClick={() => { setFormProp({}); setEditingProp(null); setIsAdding(true); }}
              className="bg-emerald-600 text-white px-8 py-3.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-100"
            >
              Secure New Asset
            </button>
          </div>

          <div className="bg-white rounded-[2.5rem] border border-gray-100 overflow-hidden shadow-sm">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Property</th>
                  <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Price</th>
                  <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                  <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {properties.map(p => (
                  <tr key={p.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center space-x-4">
                        <img src={p.imageUrl} className="w-14 h-14 rounded-xl object-cover" />
                        <div>
                          <p className="font-black text-gray-900 uppercase tracking-tight text-sm">{p.title}</p>
                          <p className="text-[10px] text-gray-400 font-bold uppercase">{p.location}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 font-black text-emerald-600">{p.currency}{p.price.toLocaleString()}</td>
                    <td className="px-8 py-6">
                      <span className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">Active</span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex space-x-2">
                        <button onClick={() => openEdit(p)} className="p-2.5 bg-gray-100 text-gray-400 hover:text-emerald-600 rounded-lg transition-colors">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                        </button>
                        <button onClick={() => handleDelete(p.id)} className="p-2.5 bg-red-50 text-red-400 hover:text-red-600 rounded-lg transition-colors">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
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

      {activeTab === 'inquiries' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate__animated animate__fadeIn">
          {inquiries.map(inq => (
            <div key={inq.id} className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm relative group overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-bl-[4rem] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                 <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.827-1.247L3 20l1.391-3.954A8.939 8.939 0 015 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
              </div>
              <div className="mb-6">
                <h4 className="text-xl font-black text-gray-900 tracking-tighter uppercase">{inq.name}</h4>
                <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest">{inq.email}</p>
                <p className="text-[9px] text-gray-300 font-black uppercase mt-1">{inq.timestamp}</p>
              </div>
              <p className="text-gray-500 text-sm italic leading-relaxed pt-6 border-t border-gray-50 italic">"{inq.message}"</p>
            </div>
          ))}
        </div>
      )}

      {/* Editor Modal */}
      {isAdding && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-fuchsia-950/40 backdrop-blur-xl animate__animated animate__fadeIn">
          <div className="bg-white w-full max-w-2xl rounded-[3rem] p-12 overflow-y-auto max-h-[90vh] shadow-2xl relative">
            <button onClick={() => setIsAdding(false)} className="absolute top-8 right-8 text-gray-300 hover:text-emerald-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
            <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tighter mb-10 shining-text">
              {editingProp ? 'Refine Asset' : 'Register New Asset'}
            </h2>
            <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="md:col-span-2">
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Asset Title</label>
                <input required value={formProp.title} className="w-full bg-gray-50 rounded-2xl p-4 border-0 font-semibold" onChange={e => setFormProp({...formProp, title: e.target.value})} />
              </div>
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Market Type</label>
                <select value={formProp.type} className="w-full bg-gray-50 rounded-2xl p-4 border-0 font-semibold" onChange={e => setFormProp({...formProp, type: e.target.value as any})}>
                  <option>For Sale</option>
                  <option>To Rent</option>
                  <option>Short Let</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Category</label>
                <select value={formProp.category} className="w-full bg-gray-50 rounded-2xl p-4 border-0 font-semibold" onChange={e => setFormProp({...formProp, category: e.target.value as any})}>
                  <option>House</option>
                  <option>Flat</option>
                  <option>Land</option>
                  <option>Commercial</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Price</label>
                <input required type="number" value={formProp.price} className="w-full bg-gray-50 rounded-2xl p-4 border-0 font-semibold" onChange={e => setFormProp({...formProp, price: parseInt(e.target.value)})}/>
              </div>
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Neighborhood</label>
                <input required value={formProp.location} className="w-full bg-gray-50 rounded-2xl p-4 border-0 font-semibold" onChange={e => setFormProp({...formProp, location: e.target.value})} />
              </div>
              <div className="md:col-span-2 flex space-x-4 pt-6">
                <button type="submit" className="flex-1 bg-emerald-600 text-white font-black py-5 rounded-2xl uppercase tracking-[0.2em] text-[10px] shadow-xl shadow-emerald-200">
                  {editingProp ? 'Update Repository' : 'Publish to Market'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
