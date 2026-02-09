
import React, { useState, useEffect } from 'react';
import Header, { ViewType } from './components/Header';
import Hero from './components/Hero';
import PropertyCard from './components/PropertyCard';
import AIChatBot from './components/AIChatBot';
import { MOCK_PROPERTIES } from './constants';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>('home');

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
  }, [currentView]);

  const featuredProperties = MOCK_PROPERTIES.filter(p => p.featured);
  const forSaleProperties = MOCK_PROPERTIES.filter(p => p.type === 'For Sale');
  const forRentProperties = MOCK_PROPERTIES.filter(p => p.type === 'To Rent');
  const shortLetProperties = MOCK_PROPERTIES.filter(p => p.type === 'Short Let');

  const PageHeader = ({ title, description }: { title: string; description: string }) => (
    <div className="mb-12 border-b border-gray-100 pb-10">
      <h1 className="text-4xl sm:text-5xl font-black text-gray-900 font-serif mb-4 shining-text uppercase tracking-tight">
        {title}
      </h1>
      <p className="text-gray-500 text-lg max-w-3xl leading-relaxed">
        {description}
      </p>
    </div>
  );

  const renderHome = () => (
    <>
      <Hero />

      {/* Browse by Neighborhoods */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 reveal">
        <div className="text-center mb-16">
          <span className="text-emerald-600 font-bold text-sm tracking-widest uppercase mb-2 block">Prime Locations</span>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 font-serif mb-4 shining-text uppercase tracking-tight">Browse by Neighborhood</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">Explore the most sought-after districts across the federation with our curated property collections.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: 'Ikoyi, Lagos', img: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb', count: '1.2k+ Properties' },
            { name: 'Maitama, Abuja', img: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716', count: '850+ Properties' },
            { name: 'Lekki Phase 1', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750', count: '2.4k+ Properties' },
            { name: 'GRA, Port Harcourt', img: 'https://images.unsplash.com/photo-1449844908441-8829872d2607', count: '420+ Properties' }
          ].map((loc, i) => (
            <div key={i} className="group relative h-72 rounded-3xl overflow-hidden cursor-pointer shadow-xl transition-transform hover:-translate-y-2">
              <img src={`${loc.img}?auto=format&fit=crop&w=400&q=80`} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={loc.name} />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-900/20 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-xl font-black uppercase tracking-tight mb-1">{loc.name}</h3>
                <p className="text-emerald-400 text-xs font-bold uppercase tracking-widest">{loc.count}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Listings Section */}
      <section className="bg-white py-24 border-y border-gray-100 reveal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div className="text-center md:text-left mb-6 md:mb-0">
              <span className="text-emerald-600 font-bold text-sm tracking-widest uppercase mb-2 block">Our Finest Selection</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 font-serif shining-text">Featured Premium Properties</h2>
              <div className="h-1.5 w-24 bg-emerald-600 mt-4 rounded-full mx-auto md:mx-0"></div>
            </div>
            <button 
              onClick={() => setCurrentView('for-sale')}
              className="px-8 py-3 border-2 border-emerald-600 text-emerald-600 font-bold rounded-xl hover:bg-emerald-600 hover:text-white transition-all transform hover:-translate-y-1 shadow-sm uppercase text-sm tracking-widest"
            >
              Browse All Sale Listings
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {featuredProperties.slice(0, 3).map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-emerald-950 py-24 text-white reveal shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { val: '12,400+', label: 'Active Listings' },
              { val: '8,200+', label: 'Properties Sold' },
              { val: '5,100+', label: 'Happy Clients' },
              { val: '24/7', label: 'Expert Support' }
            ].map((stat, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <p className="text-4xl sm:text-5xl font-black mb-3 shining-text-white">{stat.val}</p>
                <p className="text-emerald-400 text-xs sm:text-sm font-bold uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us / Services Section */}
      <section className="py-24 bg-gray-50 reveal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80" 
                  className="w-full h-[600px] object-cover"
                  alt="Professional Real Estate Consultation"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 bg-white p-10 rounded-[2.5rem] shadow-2xl hidden lg:block border border-emerald-50 max-w-[320px]">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center text-white font-black">AI</div>
                  <div>
                    <h4 className="font-black text-gray-900 uppercase text-xs tracking-widest">Powered by AI</h4>
                    <p className="text-[10px] text-gray-400">Smart Property Analytics</p>
                  </div>
                </div>
                <p className="text-gray-500 text-xs leading-relaxed italic">"Our proprietary algorithm helps you find undervalued properties before they hit the mass market."</p>
              </div>
            </div>
            <div>
              <span className="text-emerald-600 font-bold uppercase tracking-widest text-sm mb-4 block">Unmatched Expertise</span>
              <h2 className="text-4xl sm:text-5xl font-black text-gray-900 font-serif mb-8 leading-tight shining-text uppercase tracking-tighter">Leading the future of <br/>Nigerian Real Estate.</h2>
              <div className="space-y-8">
                 {[
                   { title: 'Verified Only', desc: 'Every title deed is cross-checked with state land bureaus for absolute security.', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
                   { title: 'Investment Optimized', desc: 'Our team provides detailed ROI projections for every commercial listing.', icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' },
                   { title: 'Global Standards', desc: 'Operating with international ethical standards in a local landscape.', icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z' }
                 ].map((item, i) => (
                   <div key={i} className="flex items-start group">
                     <div className="flex-shrink-0 w-14 h-14 bg-white rounded-2xl shadow-lg flex items-center justify-center text-emerald-600 mr-6 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                       <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon}/></svg>
                     </div>
                     <div>
                       <h4 className="font-black text-gray-900 uppercase tracking-widest text-sm mb-2 group-hover:text-emerald-600 transition-colors">{item.title}</h4>
                       <p className="text-gray-500 text-sm leading-relaxed max-w-md">{item.desc}</p>
                     </div>
                   </div>
                 ))}
              </div>
              <button className="mt-12 bg-emerald-600 text-white px-10 py-4 rounded-2xl font-black hover:bg-emerald-700 shadow-2xl transition-all hover:scale-105 uppercase tracking-widest text-sm">Download Company Profile</button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white reveal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
             <h2 className="text-3xl sm:text-4xl font-black text-gray-900 font-serif mb-4 shining-text uppercase tracking-tight">Trust from our Clients</h2>
             <p className="text-gray-500">Real stories from individuals and families we've helped find their perfect space.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { name: 'Dr. Emeka Obi', role: 'Home Owner', text: 'Nuga Best transformed my search experience. They found a duplex in Guzape that wasn\'t even publicly listed yet.' },
              { name: 'Sarah Alabi', role: 'Investor', text: 'Professionalism at its peak. Their legal team ensured my land acquisition in Ibeju-Lekki was 100% stress-free.' },
              { name: 'Mustapha Kabir', role: 'Commercial Client', text: 'Finding office space in CBD Abuja is tough, but Nuga AI recommended the perfect spot based on our traffic needs.' }
            ].map((t, i) => (
              <div key={i} className="bg-gray-50 p-10 rounded-[2.5rem] relative shadow-sm hover:shadow-xl transition-all">
                <div className="absolute -top-6 left-10 w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center text-white text-2xl font-black">"</div>
                <p className="text-gray-600 mb-8 italic text-sm leading-relaxed">{t.text}</p>
                <div>
                  <h4 className="font-black text-gray-900 uppercase tracking-widest text-xs">{t.name}</h4>
                  <p className="text-emerald-600 text-[10px] font-bold uppercase">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Opportunities Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 reveal">
        <div className="text-center mb-16">
           <h2 className="text-4xl sm:text-5xl font-black text-gray-900 font-serif mb-4 shining-text uppercase tracking-tight">Latest Opportunities</h2>
           <p className="text-gray-500 max-w-xl mx-auto text-lg">Check out our most recently listed houses, lands, and commercial spaces across Nigeria.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {MOCK_PROPERTIES.slice(0, 8).map((property, idx) => (
            <PropertyCard key={property.id} property={property} className={`reveal active animate__animated animate__fadeInUp animate__delay-${idx % 4}s`} />
          ))}
        </div>
        <div className="mt-20 text-center">
          <button 
            onClick={() => setCurrentView('for-sale')}
            className="bg-emerald-600 text-white px-12 py-5 rounded-2xl font-black hover:bg-emerald-700 shadow-2xl shadow-emerald-800/30 transition-all hover:scale-105 active:scale-95 uppercase tracking-widest"
          >
            Explore All 20+ Sale Listings
          </button>
        </div>
      </section>

      {/* Partner Developers */}
      <section className="bg-gray-50 py-16 reveal border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <p className="text-center text-gray-400 font-black uppercase text-[10px] tracking-[0.4em] mb-12">Trusted by Leading Developers</p>
           <div className="flex flex-wrap justify-center items-center gap-12 sm:gap-20 opacity-30 grayscale hover:grayscale-0 transition-all duration-500">
             {['DEV-A', 'LUXE-HOMES', 'PRIME-ESTATES', 'URBAN-CORP', 'GREEN-DEVELOPERS'].map(brand => (
               <span key={brand} className="text-2xl font-black text-gray-900 tracking-tighter">{brand}</span>
             ))}
           </div>
        </div>
      </section>
    </>
  );

  const renderPropertyGrid = (title: string, desc: string, props: typeof MOCK_PROPERTIES) => (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate__animated animate__fadeIn">
      <PageHeader title={title} description={desc} />
      {props.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {props.map((property, idx) => (
            <PropertyCard key={property.id} property={property} className="reveal active animate__animated animate__fadeInUp" />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center bg-gray-50 rounded-3xl border border-dashed border-gray-200">
          <p className="text-gray-400 font-bold italic">No active listings found in this category.</p>
        </div>
      )}
    </section>
  );

  const renderCompanies = () => (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate__animated animate__fadeIn">
      <PageHeader title="Real Estate Companies" description="Partner with Nigeria's most trusted real estate agencies and developers listed on Nuga Best." />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} className="bg-white p-8 rounded-3xl border border-gray-100 hover:shadow-xl transition-all group cursor-pointer">
            <div className="w-20 h-20 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-600 transition-colors">
              <span className="text-2xl font-black text-emerald-600 group-hover:text-white">NB</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Agency Partner {i}</h3>
            <p className="text-gray-500 text-sm mb-6">Specializing in luxury residential and commercial developments across Lagos and Abuja.</p>
            <div className="flex items-center text-emerald-600 font-bold text-sm">
              <span>View Portfolio</span>
              <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
            </div>
          </div>
        ))}
      </div>
    </section>
  );

  const renderResources = () => (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate__animated animate__fadeIn">
      <PageHeader title="Resources & Guides" description="Everything you need to know about buying, selling, and investing in the Nigerian property market." />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {[
          { title: "The 2024 Home Buying Guide", category: "Investment", img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa" },
          { title: "Property Laws in Nigeria Explained", category: "Legal", img: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f" },
          { title: "Top 10 Emerging Neighborhoods in Abuja", category: "Trends", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750" },
          { title: "How to Secure Your First Land Purchase", category: "Security", img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef" }
        ].map((blog, i) => (
          <div key={i} className="flex flex-col sm:flex-row bg-white rounded-3xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all group">
            <div className="sm:w-2/5 h-48 sm:h-auto overflow-hidden">
              <img src={`${blog.img}?auto=format&fit=crop&w=400&q=80`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={blog.title} />
            </div>
            <div className="p-8 sm:w-3/5">
              <span className="text-emerald-600 font-bold text-[10px] uppercase tracking-widest mb-2 block">{blog.category}</span>
              <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-emerald-600 transition-colors">{blog.title}</h3>
              <p className="text-gray-500 text-sm mb-6 line-clamp-2">Our expert team breaks down the complexities of the market to ensure your success.</p>
              <button className="text-emerald-600 font-bold text-sm hover:underline">Read Full Article</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );

  const renderContact = () => (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate__animated animate__fadeIn">
      <PageHeader title="Contact Us" description="Have questions? Reach out to our dedicated support team or visit one of our offices nationwide." />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl border border-gray-100 reveal active">
          <h2 className="text-3xl font-black text-gray-900 mb-8 shining-text uppercase tracking-tighter">Send Message</h2>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Full Name</label>
                <input type="text" className="w-full bg-gray-50 border-0 rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-emerald-500" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Email Address</label>
                <input type="email" className="w-full bg-gray-50 border-0 rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-emerald-500" placeholder="john@example.com" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Subject</label>
              <select className="w-full bg-gray-50 border-0 rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-emerald-500">
                <option>General Inquiry</option>
                <option>Property Viewing Request</option>
                <option>Selling my Property</option>
                <option>Partnership Proposal</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Your Message</label>
              <textarea rows={4} className="w-full bg-gray-50 border-0 rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-emerald-500" placeholder="How can we help?"></textarea>
            </div>
            <button className="w-full bg-emerald-600 text-white font-black py-5 rounded-2xl hover:bg-emerald-700 shadow-xl shadow-emerald-800/20 transition-all active:scale-95 uppercase tracking-widest">
              Send Message Now
            </button>
          </form>
        </div>
        
        <div className="space-y-10">
          <div className="bg-emerald-600 p-10 rounded-[2.5rem] text-white shadow-2xl reveal active animate__delay-1s">
            <h3 className="text-2xl font-black mb-8 uppercase tracking-widest">Our Offices</h3>
            <div className="space-y-8">
              <div className="flex">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mr-6 shrink-0 backdrop-blur-md">
                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Lagos Headquarters</h4>
                  <p className="text-emerald-100 text-sm opacity-80">12 Admiralty Way, Lekki Phase 1, Lagos Island.</p>
                </div>
              </div>
              <div className="flex">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mr-6 shrink-0 backdrop-blur-md">
                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Phone & Email</h4>
                  <p className="text-emerald-100 text-sm opacity-80">+234 (0) 800-NUGA-BEST</p>
                  <p className="text-emerald-100 text-sm opacity-80">hello@nugabest.com</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl reveal active animate__delay-2s">
             <h3 className="text-xl font-black text-gray-900 mb-6 uppercase tracking-widest">Connect With Us</h3>
             <div className="flex space-x-4">
                {['FB', 'TW', 'IG', 'LI'].map(s => (
                  <div key={s} className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center font-black text-gray-400 hover:bg-emerald-600 hover:text-white transition-all cursor-pointer">
                    {s}
                  </div>
                ))}
             </div>
          </div>
        </div>
      </div>
    </section>
  );

  const renderContent = () => {
    switch(currentView) {
      case 'for-sale': return renderPropertyGrid("Properties for Sale", `Browse through ${forSaleProperties.length} verified listings available for outright purchase.`, forSaleProperties);
      case 'for-rent': return renderPropertyGrid("Properties for Rent", `Discover thousands of long-term rental options across Nigeria.`, forRentProperties);
      case 'short-let': return renderPropertyGrid("Short Let Apartments", "Luxury serviced apartments for business trips or vacations.", shortLetProperties);
      case 'companies': return renderCompanies();
      case 'resources': return renderResources();
      case 'contact': return renderContact();
      default: return renderHome();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 overflow-x-hidden">
      <Header onNavigate={setCurrentView} currentView={currentView} />
      <main className="flex-grow">{renderContent()}</main>
      <footer className="bg-gray-950 text-gray-400 pt-24 pb-12 border-t border-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
            <div className="col-span-1 lg:col-span-1">
              <span className="text-2xl font-black text-white tracking-tighter mb-8 block shining-text-white uppercase">
                NUGA BEST <span className="text-emerald-500">PROPERTIES</span>
              </span>
              <p className="text-sm leading-relaxed text-gray-500 mb-8 italic">"Finding you a place to call home is our greatest achievement."</p>
              <div className="flex space-x-4">
                {['F', 'T', 'I', 'L'].map(s => <div key={s} className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all text-xs font-black">{s}</div>)}
              </div>
            </div>
            <div>
              <h4 className="text-white font-black mb-8 uppercase text-xs tracking-[0.2em]">Quick Links</h4>
              <ul className="space-y-4 text-sm font-bold">
                <li><button onClick={() => setCurrentView('for-sale')} className="hover:text-emerald-400 transition-colors">For Sale</button></li>
                <li><button onClick={() => setCurrentView('for-rent')} className="hover:text-emerald-400 transition-colors">For Rent</button></li>
                <li><button onClick={() => setCurrentView('short-let')} className="hover:text-emerald-400 transition-colors">Short Let</button></li>
                <li><button onClick={() => setCurrentView('contact')} className="hover:text-emerald-400 transition-colors">Contact Us</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-black mb-8 uppercase text-xs tracking-[0.2em]">Legal</h4>
              <ul className="space-y-4 text-sm font-bold">
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Terms of Use</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Safety Guide</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Avoid Scams</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-black mb-8 uppercase text-xs tracking-[0.2em]">Newsletter</h4>
              <p className="text-sm text-gray-500 mb-6">Weekly curated deals sent to your inbox.</p>
              <form className="flex">
                <input type="email" placeholder="Email" className="bg-gray-900 border-none rounded-l-2xl px-5 py-4 text-sm w-full text-white" />
                <button className="bg-emerald-600 text-white px-6 py-4 rounded-r-2xl hover:bg-emerald-700 font-black">Join</button>
              </form>
            </div>
          </div>
          <div className="pt-12 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center text-xs font-black tracking-widest text-gray-600 uppercase">
            <p>&copy; {new Date().getFullYear()} Nuga Best Properties. Leading The Way.</p>
            <div className="flex space-x-8 mt-6 md:mt-0">
               <a href="#" className="hover:text-white">Site Map</a>
               <a href="#" className="hover:text-white">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
      <AIChatBot />
    </div>
  );
};

export default App;
