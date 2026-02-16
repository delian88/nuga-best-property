
import React, { useState, useEffect } from 'react';
import Header, { ViewType } from './components/Header';
import Hero from './components/Hero';
import PropertyCard from './components/PropertyCard';
import AIChatBot from './components/AIChatBot';
import Auth from './components/Auth';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import { db } from './services/dbService';
import { Property, User, Inquiry } from './types';

const Toast: React.FC<{ message: string; subMessage: string; onClose: () => void }> = ({ message, subMessage, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 6000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[200] w-[90%] max-w-md animate__animated animate__fadeInDown">
      <div className="bg-white/95 backdrop-blur-xl border border-emerald-100 shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-[2rem] p-6 flex items-start space-x-4">
        <div className="bg-emerald-600 rounded-2xl p-3 shrink-0 shadow-lg shadow-emerald-200">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div className="flex-1">
          <h4 className="text-gray-900 font-black uppercase tracking-widest text-xs mb-1">{message}</h4>
          <p className="text-gray-500 text-xs leading-relaxed font-medium italic">{subMessage}</p>
        </div>
        <button onClick={onClose} className="text-gray-300 hover:text-gray-600 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

const PropertyModal: React.FC<{ property: Property; onClose: () => void; user: User | null; onSave: (p: Property) => void }> = ({ property, onClose, user, onSave }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate__animated animate__fadeIn">
      <div className="bg-white w-full max-w-5xl rounded-[2.5rem] overflow-hidden shadow-2xl relative animate__animated animate__zoomIn border border-white/20">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-[110] w-12 h-12 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg hover:bg-emerald-600 hover:text-white transition-all group"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
        
        <div className="flex flex-col lg:flex-row h-full max-h-[90vh] overflow-y-auto lg:overflow-hidden">
          <div className="lg:w-1/2 h-80 lg:h-auto overflow-hidden relative group">
            <img 
              src={property.imageUrl} 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
              alt={property.title} 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
            <div className="absolute bottom-10 left-10 text-white">
              <span className="bg-emerald-600 text-white text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest shadow-xl mb-4 inline-block">
                {property.type}
              </span>
              <h2 className="text-4xl font-black uppercase tracking-tighter drop-shadow-lg">{property.category}</h2>
            </div>
          </div>

          <div className="lg:w-1/2 p-10 lg:p-16 overflow-y-auto bg-gray-50 flex flex-col custom-scrollbar">
            <div className="mb-8">
              <h2 className="text-3xl font-black text-gray-900 leading-tight mb-4 uppercase tracking-tighter shining-text inline-block">{property.title}</h2>
              <div className="flex items-baseline space-x-2 mb-6">
                <span className="text-emerald-600 text-4xl font-black">{property.currency}{property.price.toLocaleString()}</span>
                {property.type === 'To Rent' && <span className="text-gray-400 font-bold">/ Year</span>}
                {property.type === 'Short Let' && <span className="text-gray-400 font-bold">/ Night</span>}
              </div>
              
              <div className="flex items-center text-gray-500 text-sm font-bold uppercase tracking-widest bg-white p-4 rounded-2xl border border-gray-100 shadow-sm inline-flex">
                <svg className="w-5 h-5 mr-3 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/></svg>
                {property.location}
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
              {property.beds && (
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-emerald-50 text-center hover:border-emerald-200 transition-colors">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Bedrooms</p>
                  <p className="text-2xl font-black text-emerald-600">{property.beds}</p>
                </div>
              )}
              {property.baths && (
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-emerald-50 text-center hover:border-emerald-200 transition-colors">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Baths</p>
                  <p className="text-2xl font-black text-emerald-600">{property.baths}</p>
                </div>
              )}
              {property.sqm && (
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-emerald-50 text-center hover:border-emerald-200 transition-colors">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Area</p>
                  <p className="text-xl font-black text-emerald-600">{property.sqm}m²</p>
                </div>
              )}
            </div>

            <div className="mb-10">
              <h4 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-5 border-b-2 border-emerald-100 pb-3 flex items-center">
                <svg className="w-4 h-4 mr-2 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/></svg>
                About This Property
              </h4>
              <p className="text-gray-500 text-base leading-relaxed italic">{property.description || "Premium Nuga Best Property listing with verified legal documentation."}</p>
            </div>

            <div className="mt-auto pt-10 border-t border-gray-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
               <button className="bg-emerald-600 text-white font-black py-5 rounded-2xl hover:bg-emerald-700 shadow-xl shadow-emerald-800/20 uppercase tracking-widest text-xs transition-all active:scale-95 flex items-center justify-center">
                 Inquire via Email
               </button>
               {user && (
                 <button 
                  onClick={() => onSave(property)}
                  className="border-2 border-emerald-600 text-emerald-600 font-black py-5 rounded-2xl hover:bg-emerald-600 hover:text-white uppercase tracking-widest text-xs transition-all active:scale-95 flex items-center justify-center"
                 >
                   Save to Portfolio
                 </button>
               )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType | 'admin' | 'dashboard'>('home');
  const [locationFilter, setLocationFilter] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [toast, setToast] = useState<{ message: string; subMessage: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [allProperties, setAllProperties] = useState<Property[]>([]);

  // Persistent Login logic
  useEffect(() => {
    const savedUser = localStorage.getItem('nuga_current_session');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        setCurrentUser(user);
        // If they were on admin or dashboard, keep them there
        if (user.role === 'admin') setCurrentView('admin');
      } catch (e) {
        localStorage.removeItem('nuga_current_session');
      }
    }
  }, []);

  const handleAuthSuccess = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem('nuga_current_session', JSON.stringify(user));
    setShowAuth(false);
    setCurrentView(user.role === 'admin' ? 'admin' : 'dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('nuga_current_session');
    setCurrentView('home');
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await db.queryProperties();
      setAllProperties(data);
    };
    fetchData();
  }, [currentView]);

  useEffect(() => {
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          entry.target.classList.add('animate__animated');
          entry.target.classList.add('animate__fadeInUp');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [currentView, allProperties]);

  const handleHeroSearch = (type: string, location: string, category: string) => {
    setLocationFilter(location || null);
    setCategoryFilter(category === 'All Categories' ? null : category);
    if (type === 'For Sale') setCurrentView('for-sale');
    else if (type === 'To Rent') setCurrentView('for-rent');
    else if (type === 'Short Let') setCurrentView('short-let');
    window.scrollTo({ top: 600, behavior: 'smooth' });
  };

  const handleSaveProperty = async (p: Property) => {
    if (!currentUser) {
      setShowAuth(true);
      return;
    }
    await db.toggleSaveProperty(currentUser.id, p.id);
    setToast({
      message: "Portfolio Updated",
      subMessage: "The property has been securely recorded in your private saved assets collection."
    });
  };

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newInquiry: Inquiry = {
      id: `inq_${Math.random().toString(36).substr(2, 9)}`,
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      message: formData.get('message') as string,
      timestamp: new Date().toLocaleString()
    };

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    await db.createInquiry(newInquiry);

    setToast({
      message: "Inquiry Successfully Dispatched",
      subMessage: "Your request has been securely transmitted. Our elite advisory team will contact you shortly."
    });
    
    setIsSubmitting(false);
    (e.target as HTMLFormElement).reset();
  };

  const getFilteredProperties = (typeFilter: string | null = null) => {
    let props = allProperties;
    if (typeFilter) props = props.filter(p => p.type === typeFilter);
    if (locationFilter) {
      const loc = locationFilter.toLowerCase();
      props = props.filter(p => p.location.toLowerCase().includes(loc) || p.title.toLowerCase().includes(loc));
    }
    if (categoryFilter) {
      const cat = categoryFilter === 'Flat / Apartment' ? 'Flat' : categoryFilter;
      props = props.filter(p => p.category === cat);
    }
    return props;
  };

  const renderHome = () => (
    <>
      <Hero onSearch={handleHeroSearch} />
      
      {/* Trust Statistics Banner */}
      <section className="relative z-20 -mt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 reveal">
        <div className="bg-white rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] p-8 sm:p-12 border border-emerald-50 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: 'Verified Listings', val: '12,400+', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
            { label: 'Registered Agents', val: '3,800+', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
            { label: 'Legal Verification', val: '100%', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
            { label: 'Happy Clients', val: '25,000+', icon: 'M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' }
          ].map((stat, i) => (
            <div key={i} className="text-center group">
              <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-emerald-600 transition-colors duration-500">
                <svg className="w-6 h-6 text-emerald-600 group-hover:text-white transition-colors duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.icon} />
                </svg>
              </div>
              <p className="text-2xl font-black text-gray-900 tracking-tighter mb-1">{stat.val}</p>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Listings */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 reveal">
        <div className="text-center mb-16">
          <span className="text-emerald-600 font-black text-sm tracking-[0.3em] uppercase mb-4 block">Hand-Picked Assets</span>
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 font-serif mb-6 shining-text uppercase tracking-tight">Recent Selections</h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed italic">Curating the finest verified high-end real estate opportunities in the Nigerian market.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {allProperties.slice(0, 8).map((property, idx) => (
            <PropertyCard key={property.id} property={property} onViewDetails={setSelectedProperty} className={`reveal active animate__animated animate__fadeInUp animate__delay-${idx % 4}s`} />
          ))}
        </div>
        <div className="mt-16 text-center">
          <button onClick={() => setCurrentView('for-sale')} className="bg-emerald-600 text-white px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-200 active:scale-95">
            Explore All Listings
          </button>
        </div>
      </section>

      {/* Elite Neighborhood Grid */}
      <section className="bg-gray-50 py-24 reveal overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div className="max-w-2xl">
              <span className="text-emerald-600 font-black text-sm tracking-[0.3em] uppercase mb-4 block">Prime Locations</span>
              <h2 className="text-4xl sm:text-5xl font-black text-gray-900 font-serif mb-6 shining-text uppercase tracking-tight">Explore Top Neighborhoods</h2>
              <p className="text-gray-500 text-lg">Direct access to properties in Nigeria's most coveted economic hubs.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: 'Ikoyi, Lagos', img: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb', listings: '1,200+ Properties' },
              { name: 'Maitama, Abuja', img: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716', listings: '850+ Properties' },
              { name: 'Lekki Phase 1', img: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d', listings: '2,400+ Properties' },
              { name: 'Eko Atlantic', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750', listings: '450+ Properties' }
            ].map((loc, i) => (
              <div key={i} className="group relative h-[450px] rounded-[3rem] overflow-hidden cursor-pointer shadow-2xl transition-all duration-700 hover:-translate-y-4">
                <img src={loc.img} className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-125" alt={loc.name} />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-900/40 to-transparent"></div>
                <div className="absolute bottom-10 left-10 right-10 text-white">
                  <h3 className="text-2xl font-black uppercase tracking-tight mb-2 group-hover:translate-x-2 transition-transform duration-500">{loc.name}</h3>
                  <p className="text-emerald-400 text-[10px] font-black uppercase tracking-widest">{loc.listings}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Strategic Excellence */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 reveal">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="grid grid-cols-2 gap-6 relative z-10">
              <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa" className="rounded-[3rem] shadow-2xl mt-12" alt="Modern Architecture" />
              <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c" className="rounded-[3rem] shadow-2xl" alt="Luxury Living" />
            </div>
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-emerald-600 rounded-full blur-[100px] opacity-10"></div>
          </div>
          <div>
            <span className="text-emerald-600 font-black text-sm tracking-[0.3em] uppercase mb-4 block">Our Standard</span>
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 font-serif mb-10 leading-tight shining-text uppercase tracking-tight">Setting the Benchmark <br/> in Luxury Real Estate</h2>
            <div className="space-y-10">
              {[
                { title: 'Verified Documentation', desc: 'Every listing undergoes a multi-layer verification process including legal title search and physical site inspection.' },
                { title: 'Strategic Advisory', desc: 'Our consultants provide deep market insights and yield projections for maximum ROI on your investments.' },
                { title: 'Transparent Transactions', desc: 'We act as a secure bridge between buyers and sellers, ensuring every transaction is governed by legal standards.' }
              ].map((item, i) => (
                <div key={i} className="flex items-start">
                  <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mr-8 shrink-0 shadow-sm">
                    <svg className="w-7 h-7 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-gray-900 uppercase tracking-tighter mb-2">{item.title}</h4>
                    <p className="text-gray-500 leading-relaxed font-medium">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Partner Marquee */}
      <section className="bg-emerald-950 py-20 reveal border-y border-emerald-900/50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
           <p className="text-center text-emerald-400 font-black uppercase text-[10px] tracking-[0.4em]">Trusted by Industry Leading Developers</p>
        </div>
        <div className="relative flex overflow-x-hidden group">
          <div className="py-12 flex whitespace-nowrap animate-marquee">
            {['DEV-A PROPERTIES', 'LUXE HOMES NIGERIA', 'PRIME ESTATES', 'URBAN CORP', 'GREEN DEVELOPERS', 'ELITE LANDS', 'CITADEL HOMES'].map((brand, i) => (
              <span key={i} className="mx-16 text-3xl font-black text-white/10 tracking-tighter hover:text-emerald-400 transition-all">{brand}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Executive CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 reveal text-center">
        <div className="bg-white p-12 sm:p-20 rounded-[4rem] shadow-2xl border border-emerald-50 relative overflow-hidden">
           <div className="relative z-10">
              <h2 className="text-4xl sm:text-5xl font-black text-gray-900 font-serif mb-8 leading-tight shining-text uppercase tracking-tight">Ready to Secure Your Asset?</h2>
              <p className="text-gray-500 text-lg mb-12 max-w-2xl mx-auto font-medium">Gateway to Nigeria's finest real estate collections.</p>
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                 <button onClick={() => setCurrentView('contact')} className="bg-emerald-600 text-white px-12 py-6 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl hover:bg-emerald-700 transition-all">
                    Consult an Expert
                 </button>
                 <button onClick={() => setCurrentView('for-sale')} className="border-2 border-emerald-600 text-emerald-600 px-12 py-6 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-emerald-600 hover:text-white transition-all">
                    Browse All Listings
                 </button>
              </div>
           </div>
        </div>
      </section>
    </>
  );

  const renderPropertyGrid = (title: string, desc: string, typeFilter: string | null) => {
    const props = getFilteredProperties(typeFilter);
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="mb-12 border-b border-gray-100 pb-10 text-center sm:text-left">
          <h1 className="text-4xl font-black text-gray-900 font-serif mb-4 shining-text uppercase tracking-tight">{title}</h1>
          <p className="text-gray-500 text-lg leading-relaxed">{desc}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {props.map(property => (
            <PropertyCard key={property.id} property={property} onViewDetails={setSelectedProperty} className="reveal active animate__animated animate__fadeInUp" />
          ))}
        </div>
      </section>
    );
  };

  const renderContent = () => {
    if (currentView === 'admin' && currentUser?.role === 'admin') return <AdminDashboard />;
    if (currentView === 'dashboard' && currentUser) return <UserDashboard user={currentUser} onLogout={handleLogout} />;
    
    switch(currentView) {
      case 'for-sale': return renderPropertyGrid("Assets For Sale", "Verified high-yield investments.", "For Sale");
      case 'for-rent': return renderPropertyGrid("Executive Rentals", "Premium residences for lease.", "To Rent");
      case 'short-let': return renderPropertyGrid("Short Stay Apartments", "Serviced luxury stays.", "Short Let");
      case 'contact': return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="bg-white p-12 md:p-20 rounded-[3rem] shadow-2xl border border-gray-100 max-w-4xl mx-auto">
             <h2 className="text-3xl font-black text-gray-900 mb-10 text-center uppercase tracking-tighter shining-text">Secure Inquiry</h2>
             <form onSubmit={handleContactSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <input required name="name" type="text" placeholder="Full Name" className="w-full bg-gray-50 border-0 rounded-2xl px-6 py-5 focus:ring-2 focus:ring-emerald-500 font-semibold" />
               <input required name="email" type="email" placeholder="Corporate Email" className="w-full bg-gray-50 border-0 rounded-2xl px-6 py-5 focus:ring-2 focus:ring-emerald-500 font-semibold" />
               <textarea required name="message" rows={6} placeholder="Detailed requirement briefing..." className="md:col-span-2 w-full bg-gray-50 border-0 rounded-[2rem] px-6 py-6 focus:ring-2 focus:ring-emerald-500 font-semibold"></textarea>
               <button disabled={isSubmitting} className="md:col-span-2 w-full bg-emerald-600 text-white font-black py-6 rounded-2xl uppercase tracking-widest text-xs transition-all shadow-xl hover:bg-emerald-700">
                 {isSubmitting ? "Transmitting..." : "Send Secure Inquiry"}
               </button>
             </form>
          </div>
        </section>
      );
      default: return renderHome();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 overflow-x-hidden">
      <Header 
        onNavigate={(v) => {
          if ((v === 'admin' || v === 'dashboard') && !currentUser) {
            setShowAuth(true);
            return;
          }
          setCurrentView(v as any);
        }} 
        currentView={currentView as any} 
        user={currentUser}
        onLoginClick={() => setShowAuth(true)}
        onLogout={handleLogout}
      />
      
      {toast && <Toast message={toast.message} subMessage={toast.subMessage} onClose={() => setToast(null)} />}
      {showAuth && <Auth onClose={() => setShowAuth(false)} onAuthSuccess={handleAuthSuccess} />}
      
      <main className="flex-grow">{renderContent()}</main>
      
      {selectedProperty && <PropertyModal property={selectedProperty} user={currentUser} onSave={handleSaveProperty} onClose={() => setSelectedProperty(null)} />}

      <footer className="bg-gray-950 text-gray-400 py-24 border-t border-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20 text-center sm:text-left">
              <div className="md:col-span-1">
                 <span className="text-2xl font-black text-white tracking-tighter block mb-6 uppercase">NUGA BEST <span className="text-emerald-500">PROPERTIES</span></span>
                 <p className="text-sm italic leading-relaxed">Setting the standard in elite real estate management across Nigeria.</p>
              </div>
              <div>
                 <h4 className="text-white font-black uppercase text-xs tracking-widest mb-8">Navigation</h4>
                 <ul className="space-y-4 text-xs font-bold uppercase tracking-widest">
                    <li><button onClick={() => setCurrentView('for-sale')} className="hover:text-emerald-500 transition-colors">For Sale</button></li>
                    <li><button onClick={() => setCurrentView('for-rent')} className="hover:text-emerald-500 transition-colors">For Rent</button></li>
                    <li><button onClick={() => setCurrentView('short-let')} className="hover:text-emerald-500 transition-colors">Short Let</button></li>
                    <li><button onClick={() => setCurrentView('contact')} className="hover:text-emerald-500 transition-colors">Contact</button></li>
                 </ul>
              </div>
              <div>
                 <h4 className="text-white font-black uppercase text-xs tracking-widest mb-8">Executive Office</h4>
                 <p className="text-xs font-bold uppercase tracking-widest leading-loose">
                    Victoria Island, Lagos<br/>
                    +234 (0) 800 NUGA BEST
                 </p>
              </div>
           </div>
           <div className="pt-12 border-t border-gray-900 text-center">
              <p className="text-[10px] font-black tracking-[0.3em] text-gray-600 uppercase">&copy; {new Date().getFullYear()} Nuga Best Properties. Global Elite Standard.</p>
           </div>
        </div>
      </footer>
      <AIChatBot />
    </div>
  );
};

export default App;
