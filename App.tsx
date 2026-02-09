
import React, { useState, useEffect } from 'react';
import Header, { ViewType } from './components/Header';
import Hero from './components/Hero';
import PropertyCard from './components/PropertyCard';
import AIChatBot from './components/AIChatBot';
import { MOCK_PROPERTIES } from './constants';
import { Property } from './types';

const PropertyModal: React.FC<{ property: Property; onClose: () => void }> = ({ property, onClose }) => {
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
          {/* Image Section */}
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

          {/* Details Section */}
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
              {property.toilets && (
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-emerald-50 text-center hover:border-emerald-200 transition-colors">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Toilets</p>
                  <p className="text-2xl font-black text-emerald-600">{property.toilets}</p>
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
              <p className="text-gray-500 text-base leading-relaxed italic">{property.description || "No detailed description available for this property. Please contact our agents for complete documentation and viewing arrangements."}</p>
            </div>

            {property.interiorFeatures && property.interiorFeatures.length > 0 && (
              <div className="mb-10">
                <h4 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-5 border-b-2 border-emerald-100 pb-3 flex items-center">
                   <svg className="w-4 h-4 mr-2 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/></svg>
                   Interior Features
                </h4>
                <div className="flex flex-wrap gap-3">
                  {property.interiorFeatures.map((f, i) => (
                    <span key={i} className="px-4 py-2 bg-emerald-50 text-emerald-700 text-[10px] font-black rounded-xl uppercase tracking-widest border border-emerald-100">{f}</span>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-auto pt-10 border-t border-gray-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
               <button className="bg-emerald-600 text-white font-black py-5 rounded-2xl hover:bg-emerald-700 shadow-xl shadow-emerald-800/20 uppercase tracking-widest text-xs transition-all active:scale-95 flex items-center justify-center">
                 Inquire via Email
               </button>
               <button className="border-2 border-emerald-600 text-emerald-600 font-black py-5 rounded-2xl hover:bg-emerald-600 hover:text-white uppercase tracking-widest text-xs transition-all active:scale-95 flex items-center justify-center">
                 WhatsApp Agent
               </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [locationFilter, setLocationFilter] = useState<string | null>(null);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

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
  }, [currentView, locationFilter]);

  const handleLocationClick = (locName: string) => {
    const parts = locName.split(', ');
    const state = parts.pop() || locName;
    const city = parts[0] || state;
    
    setLocationFilter(city);
    setCurrentView('for-sale');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getFilteredProperties = (typeFilter: string | null = null) => {
    let props = MOCK_PROPERTIES;
    if (typeFilter) {
      props = props.filter(p => p.type === typeFilter);
    }
    if (locationFilter) {
      props = props.filter(p => p.location.toLowerCase().includes(locationFilter.toLowerCase()));
    }
    return props;
  };

  const featuredProperties = MOCK_PROPERTIES.filter(p => p.featured);

  const PageHeader = ({ title, description, showClear = false }: { title: string; description: string; showClear?: boolean }) => (
    <div className="mb-12 border-b border-gray-100 pb-10 flex flex-col md:flex-row justify-between items-end">
      <div>
        <h1 className="text-4xl sm:text-5xl font-black text-gray-900 font-serif mb-4 shining-text uppercase tracking-tight">
          {title}
        </h1>
        <p className="text-gray-500 text-lg max-w-3xl leading-relaxed">
          {description}
        </p>
      </div>
      {showClear && locationFilter && (
        <button 
          onClick={() => setLocationFilter(null)}
          className="mt-6 md:mt-0 text-xs font-black text-emerald-600 border-b-2 border-emerald-600 uppercase tracking-widest hover:text-emerald-800 hover:border-emerald-800 transition-all flex items-center"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
          Clear Location: {locationFilter}
        </button>
      )}
    </div>
  );

  const partners = [
    'DEV-A PROPERTIES', 'LUXE HOMES NIGERIA', 'PRIME ESTATES', 'URBAN CORP', 'GREEN DEVELOPERS', 
    'ELITE LANDS', 'CITADEL HOMES', 'VINTAGE REALTORS', 'CRESTVIEW DEV', 'SKYLINE PROPERTIES'
  ];

  const renderHome = () => (
    <>
      <Hero />

      {/* Browse by Neighborhoods */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 reveal">
        <div className="text-center mb-16">
          <span className="text-emerald-600 font-black text-sm tracking-[0.3em] uppercase mb-4 block">Prime Neighborhoods</span>
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 font-serif mb-6 shining-text uppercase tracking-tight">Premium Locations</h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">Explore verified high-end real estate opportunities tailored for the discerning investor.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { name: 'Ikoyi, Lagos', img: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb', count: '1.2k+ Listings' },
            { name: 'Maitama, Abuja', img: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716', count: '850+ Listings' },
            { name: 'Lekki Phase 1', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750', count: '2.4k+ Listings' },
            { name: 'GRA, Port Harcourt', img: 'https://images.unsplash.com/photo-1449844908441-8829872d2607', count: '420+ Listings' }
          ].map((loc, i) => (
            <div 
              key={i} 
              onClick={() => handleLocationClick(loc.name)}
              className="group relative h-[400px] rounded-[2.5rem] overflow-hidden cursor-pointer shadow-2xl transition-all duration-700 hover:-translate-y-3"
            >
              <img src={`${loc.img}?auto=format&fit=crop&w=600&q=80`} className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-125" alt={loc.name} />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/95 via-emerald-900/30 to-transparent"></div>
              <div className="absolute bottom-10 left-10 right-10 text-white">
                <h3 className="text-2xl font-black uppercase tracking-tight mb-2 group-hover:translate-x-2 transition-transform duration-500">{loc.name}</h3>
                <p className="text-emerald-400 text-xs font-black uppercase tracking-widest">{loc.count}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-emerald-950 py-24 text-white reveal overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <span className="text-emerald-400 font-black uppercase tracking-widest text-sm mb-4 block">Our Excellence</span>
              <h2 className="text-4xl sm:text-5xl font-black font-serif mb-8 leading-tight shining-text-white uppercase tracking-tighter">Setting the Standard <br/> in Luxury Real Estate</h2>
              <div className="space-y-8">
                {[
                  { title: 'Verified Listings', desc: 'Every property undergoes a rigorous legal verification process.' },
                  { title: 'Expert Advisory', desc: 'Our consultants provide deep market insights for maximum ROI.' },
                  { title: 'Seamless Experience', desc: 'From viewing to closing, we handle the complexities for you.' }
                ].map((item, i) => (
                  <div key={i} className="flex items-start">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mr-6 shrink-0 backdrop-blur-md">
                      <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg>
                    </div>
                    <div>
                      <h4 className="font-black uppercase tracking-widest text-sm mb-1">{item.title}</h4>
                      <p className="text-gray-400 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
               <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80" className="rounded-[3rem] shadow-2xl relative z-10" alt="Consultancy" />
               <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-emerald-600 rounded-full blur-[120px] opacity-20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Listings Section */}
      <section className="bg-white py-24 border-y border-gray-100 reveal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-16">
            <div className="text-center md:text-left mb-6 md:mb-0">
              <span className="text-emerald-600 font-black text-sm tracking-[0.3em] uppercase mb-4 block">Hand-Picked Homes</span>
              <h2 className="text-4xl sm:text-5xl font-black text-gray-900 font-serif shining-text uppercase tracking-tight">Featured Selections</h2>
              <div className="h-2 w-24 bg-emerald-600 mt-6 rounded-full mx-auto md:mx-0"></div>
            </div>
            <button 
              onClick={() => { setLocationFilter(null); setCurrentView('for-sale'); }}
              className="px-10 py-4 bg-emerald-600 text-white font-black rounded-2xl hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-800/20 uppercase text-xs tracking-[0.2em]"
            >
              Explore All Listings
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {featuredProperties.slice(0, 3).map(property => (
              <PropertyCard key={property.id} property={property} onViewDetails={setSelectedProperty} />
            ))}
          </div>
        </div>
      </section>

      {/* Latest Opportunities Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 reveal">
        <div className="text-center mb-20">
           <h2 className="text-4xl sm:text-5xl font-black text-gray-900 font-serif mb-6 shining-text uppercase tracking-tight">Recent Opportunities</h2>
           <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">The latest verified properties hitting the Nigerian market.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {MOCK_PROPERTIES.slice(0, 8).map((property, idx) => (
            <PropertyCard key={property.id} property={property} onViewDetails={setSelectedProperty} className={`reveal active animate__animated animate__fadeInUp animate__delay-${idx % 4}s`} />
          ))}
        </div>
      </section>

      {/* Partner Developers - SLIDING MARQUEE */}
      <section className="bg-gray-50 py-20 reveal border-t border-gray-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
           <p className="text-center text-gray-400 font-black uppercase text-[10px] tracking-[0.4em]">Trusted by Leading Developers</p>
        </div>
        <div className="relative flex overflow-x-hidden group">
          <div className="py-12 flex whitespace-nowrap animate-marquee">
            {[...partners, ...partners].map((brand, i) => (
              <span 
                key={i} 
                className="mx-16 text-3xl font-black text-gray-900 tracking-tighter opacity-20 grayscale transition-all duration-500 hover:opacity-100 hover:grayscale-0"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );

  const renderPropertyGrid = (title: string, desc: string, typeFilter: string | null) => {
    const props = getFilteredProperties(typeFilter);
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 animate__animated animate__fadeIn">
        <PageHeader title={locationFilter ? `${title} in ${locationFilter}` : title} description={desc} showClear={!!locationFilter} />
        {props.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {props.map((property, idx) => (
              <PropertyCard key={property.id} property={property} onViewDetails={setSelectedProperty} className="reveal active animate__animated animate__fadeInUp" />
            ))}
          </div>
        ) : (
          <div className="py-32 text-center bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200">
            <p className="text-gray-400 text-xl font-bold italic mb-6">No matching listings found in {locationFilter}.</p>
            <button onClick={() => setLocationFilter(null)} className="bg-emerald-600 text-white px-10 py-4 rounded-2xl font-black uppercase text-xs tracking-widest">View All Locations</button>
          </div>
        )}
      </section>
    );
  };

  const renderContent = () => {
    switch(currentView) {
      case 'for-sale': return renderPropertyGrid("Assets For Sale", "Direct access to verified high-yield property investments.", "For Sale");
      case 'for-rent': return renderPropertyGrid("Executive Rentals", "Curated selection of premium residences for long-term lease.", "To Rent");
      case 'short-let': return renderPropertyGrid("Short Stay Apartments", "Ultra-luxury serviced accommodation.", "Short Let");
      case 'companies': return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 animate__animated animate__fadeIn">
          <PageHeader title="Agencies & Developers" description="Partner with the top-tier developers and verified agencies." />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="bg-white p-12 rounded-[2.5rem] border border-gray-100 hover:shadow-2xl transition-all group">
                <div className="w-24 h-24 bg-emerald-50 rounded-[2rem] flex items-center justify-center mb-8">
                  <span className="text-3xl font-black text-emerald-600">NB</span>
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-4 uppercase tracking-tighter">Elite Developer {i}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">Pioneering luxury architectural solutions across major Nigerian cities.</p>
              </div>
            ))}
          </div>
        </section>
      );
      case 'resources': return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 animate__animated animate__fadeIn">
          <PageHeader title="Property Guides" description="Expert insights into the Nigerian real estate landscape." />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="bg-white p-12 rounded-[2.5rem] border border-gray-100 hover:shadow-2xl transition-all">
                <h3 className="text-2xl font-black text-gray-900 mb-6 uppercase tracking-tighter">Acquisition Legalities Guide {i}</h3>
                <p className="text-gray-500 text-base mb-8 italic">Navigating the Land Use Act for first-time premium investors.</p>
                <button className="bg-gray-900 text-white px-8 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest">Read More</button>
              </div>
            ))}
          </div>
        </section>
      );
      case 'contact': return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 animate__animated animate__fadeIn">
          <PageHeader title="Get In Touch" description="Our dedicated real estate advisors are standing by to assist you." />
          <div className="bg-white p-12 md:p-20 rounded-[3rem] shadow-2xl border border-gray-100 max-w-4xl mx-auto">
             <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <input type="text" placeholder="Full Name" className="w-full bg-gray-50 border-0 rounded-2xl px-6 py-5" />
               <input type="email" placeholder="Email Address" className="w-full bg-gray-50 border-0 rounded-2xl px-6 py-5" />
               <textarea rows={6} placeholder="How can we assist?" className="md:col-span-2 w-full bg-gray-50 border-0 rounded-[2rem] px-6 py-6"></textarea>
               <button className="md:col-span-2 w-full bg-emerald-600 text-white font-black py-6 rounded-2xl uppercase tracking-[0.3em] text-xs">Send Inquiry</button>
             </form>
          </div>
        </section>
      );
      default: return renderHome();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 overflow-x-hidden">
      <Header onNavigate={(v) => { setLocationFilter(null); setCurrentView(v); }} currentView={currentView} />
      <main className="flex-grow">{renderContent()}</main>
      
      {selectedProperty && (
        <PropertyModal 
          property={selectedProperty} 
          onClose={() => setSelectedProperty(null)} 
        />
      )}

      <footer className="bg-gray-950 text-gray-400 pt-24 pb-12 border-t border-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
            <div>
              <span className="text-2xl font-black text-white tracking-tighter mb-8 block shining-text-white uppercase">
                NUGA BEST <span className="text-emerald-500">PROPERTIES</span>
              </span>
              <p className="text-sm italic">"Finding you a place to call home is our greatest achievement."</p>
            </div>
            <div>
              <h4 className="text-white font-black mb-8 uppercase text-xs tracking-widest">Links</h4>
              <ul className="space-y-4 text-xs font-bold uppercase tracking-wider">
                <li><button onClick={() => setCurrentView('for-sale')} className="hover:text-emerald-400 transition-colors">For Sale</button></li>
                <li><button onClick={() => setCurrentView('for-rent')} className="hover:text-emerald-400 transition-colors">For Rent</button></li>
                <li><button onClick={() => setCurrentView('contact')} className="hover:text-emerald-400 transition-colors">Contact</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-black mb-8 uppercase text-xs tracking-widest">Legal</h4>
              <ul className="space-y-4 text-xs font-bold uppercase tracking-wider">
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Terms</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-black mb-8 uppercase text-xs tracking-widest">Update</h4>
              <form className="flex mt-4">
                <input type="email" placeholder="Email" className="bg-gray-900 border-none rounded-l-2xl px-5 py-4 text-xs w-full text-white" />
                <button className="bg-emerald-600 text-white px-6 py-4 rounded-r-2xl font-black text-xs uppercase tracking-widest">Join</button>
              </form>
            </div>
          </div>
          <div className="pt-12 border-t border-gray-900 text-center text-[10px] font-black tracking-[0.3em] text-gray-600 uppercase">
            &copy; {new Date().getFullYear()} Nuga Best Properties. All Rights Reserved.
          </div>
        </div>
      </footer>
      <AIChatBot />
    </div>
  );
};

export default App;
