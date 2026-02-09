
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import PropertyCard from './components/PropertyCard';
import AIChatBot from './components/AIChatBot';
import { MOCK_PROPERTIES } from './constants';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'home' | 'for-sale'>('home');

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1
    };

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

  const renderHome = () => (
    <>
      <Hero />

      {/* Featured Listings Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 reveal">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <span className="text-emerald-600 font-bold text-sm tracking-widest uppercase mb-2 block">Our Finest Selection</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 font-serif shining-text">Featured Premium Properties</h2>
            <div className="h-1.5 w-24 bg-fuchsia-700 mt-4 rounded-full mx-auto md:mx-0"></div>
          </div>
          <button 
            onClick={() => setCurrentView('for-sale')}
            className="px-6 py-3 border-2 border-fuchsia-700 text-fuchsia-700 font-bold rounded-xl hover:bg-fuchsia-700 hover:text-white transition-all transform hover:-translate-y-1 shadow-sm"
          >
            Browse All Sale Listings
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {featuredProperties.slice(0, 3).map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-fuchsia-900 py-20 text-white reveal shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-extrabold mb-2 shining-text-white">12,400+</p>
              <p className="text-emerald-300 text-sm font-medium uppercase tracking-widest">Active Listings</p>
            </div>
            <div>
              <p className="text-4xl font-extrabold mb-2 shining-text-white">8,200+</p>
              <p className="text-emerald-300 text-sm font-medium uppercase tracking-widest">Properties Sold</p>
            </div>
            <div>
              <p className="text-4xl font-extrabold mb-2 shining-text-white">5,100+</p>
              <p className="text-emerald-300 text-sm font-medium uppercase tracking-widest">Happy Clients</p>
            </div>
            <div>
              <p className="text-4xl font-extrabold mb-2 shining-text-white">24/7</p>
              <p className="text-emerald-300 text-sm font-medium uppercase tracking-widest">Expert Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Recently Added Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 reveal">
        <div className="text-center mb-16">
           <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 font-serif mb-4 shining-text">Latest Opportunities</h2>
           <p className="text-gray-500 max-w-xl mx-auto text-lg">Check out our most recently listed houses, lands, and commercial spaces across Nigeria.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {MOCK_PROPERTIES.slice(0, 8).map((property, idx) => (
            <PropertyCard 
              key={property.id} 
              property={property} 
              className={`reveal animate__delay-${idx % 4}s`}
            />
          ))}
        </div>

        <div className="mt-20 text-center">
          <button 
            onClick={() => setCurrentView('for-sale')}
            className="bg-fuchsia-700 text-white px-10 py-4 rounded-2xl font-bold hover:bg-fuchsia-800 shadow-2xl shadow-fuchsia-800/20 transition-all hover:scale-105 active:scale-95"
          >
            Explore All 20+ Sale Listings
          </button>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-white py-24 reveal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80" 
                className="rounded-3xl shadow-3xl w-full h-[500px] object-cover"
                alt="Team working"
              />
              <div className="absolute -bottom-8 -right-8 bg-emerald-600 text-white p-10 rounded-3xl shadow-2xl hidden sm:block">
                <p className="text-4xl font-bold mb-1">15+</p>
                <p className="text-emerald-100 text-sm uppercase font-bold tracking-widest">Years Experience</p>
              </div>
            </div>
            <div>
              <span className="text-fuchsia-600 font-bold uppercase tracking-widest text-sm mb-4 block">About Nuga Best</span>
              <h2 className="text-4xl font-bold text-gray-900 font-serif mb-6 leading-tight shining-text">We help you find the best property for your lifestyle.</h2>
              <p className="text-gray-600 text-lg mb-8">
                At Nuga Best Properties, we believe that finding a home should be an exciting journey, not a stressful one.
              </p>
              <div className="space-y-6">
                 {[
                   { title: 'Verified Listings', desc: 'Every property goes through a rigorous verification process.' },
                   { title: 'Market Insights', desc: 'AI-driven analytics to help you make the best investment.' },
                   { title: 'Legal Support', desc: 'Assistance with documentation and legal property transfer.' }
                 ].map((item, i) => (
                   <div key={i} className="flex items-start">
                     <div className={`flex-shrink-0 bg-emerald-50 p-2 rounded-lg text-emerald-600 mr-4`}>
                       <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                     </div>
                     <div>
                       <h4 className="font-bold text-gray-900">{item.title}</h4>
                       <p className="text-gray-500 text-sm">{item.desc}</p>
                     </div>
                   </div>
                 ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );

  const renderForSale = () => (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate__animated animate__fadeIn">
      <div className="mb-12 border-b border-gray-100 pb-10">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 font-serif mb-4 shining-text">Properties for Sale in Nigeria</h1>
        <p className="text-gray-500 text-lg max-w-3xl">
          Browse through {forSaleProperties.length} verified properties for sale. From luxury duplexes in Banana Island to prime commercial lands in Abuja.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {forSaleProperties.map((property, idx) => (
          <PropertyCard 
            key={property.id} 
            property={property} 
            className={`reveal active animate__animated animate__fadeInUp animate__delay-${(idx % 4) * 0.1}s`}
          />
        ))}
      </div>

      <div className="mt-20 bg-fuchsia-50 p-10 rounded-3xl text-center border border-fuchsia-100">
         <h3 className="text-2xl font-bold text-fuchsia-900 mb-4">Can't find what you're looking for?</h3>
         <p className="text-fuchsia-700 mb-8 max-w-xl mx-auto">
           Our expert agents can help you scout the market for specific requirements not yet listed here.
         </p>
         <button className="bg-fuchsia-700 text-white px-8 py-3 rounded-xl font-bold hover:bg-fuchsia-800 transition-all shadow-lg">
           Contact Our VIP Desk
         </button>
      </div>
    </section>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 overflow-x-hidden">
      <Header onNavigate={setCurrentView} currentView={currentView} />
      
      <main className="flex-grow">
        {currentView === 'home' ? renderHome() : renderForSale()}
      </main>

      <footer className="bg-gray-950 text-gray-400 pt-24 pb-12 border-t border-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
            <div className="col-span-1 lg:col-span-1">
              <span className="text-2xl font-bold text-white tracking-tighter mb-8 block shining-text-white">
                NUGA BEST <span className="text-emerald-500">PROPERTIES</span>
              </span>
              <p className="text-sm leading-relaxed text-gray-500 mb-8 italic">
                "Finding you a place to call home is our greatest achievement."
              </p>
              <div className="flex space-x-5">
                {['facebook', 'twitter', 'instagram', 'linkedin'].map(social => (
                  <a key={social} href="#" className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center hover:bg-fuchsia-700 hover:text-white transition-all text-gray-400 shadow-md">
                    <span className="sr-only">{social}</span>
                    {social[0].toUpperCase()}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold mb-8 uppercase text-xs tracking-widest">Main Locations</h4>
              <ul className="space-y-4 text-sm font-medium">
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Property in Lagos</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Property in Abuja</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Property in Port Harcourt</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Property in Ibadan</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Property in Enugu</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-8 uppercase text-xs tracking-widest">Legal & Help</h4>
              <ul className="space-y-4 text-sm font-medium">
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Terms of Use</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Safety Guide</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Avoid Scams</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Support Center</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-8 uppercase text-xs tracking-widest">Join Our Newsletter</h4>
              <p className="text-sm text-gray-500 mb-6 leading-relaxed">Stay updated with the latest property trends and exclusive deals.</p>
              <form className="flex">
                <input 
                  type="email" 
                  placeholder="email@example.com" 
                  className="bg-gray-900 border-none rounded-l-xl px-4 py-3 text-sm focus:ring-1 focus:ring-fuchsia-500 w-full text-white"
                />
                <button className="bg-fuchsia-700 text-white px-6 py-3 rounded-r-xl hover:bg-fuchsia-800 transition-all font-bold">
                  Send
                </button>
              </form>
            </div>
          </div>
          
          <div className="pt-12 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center text-xs font-medium tracking-widest text-gray-600 uppercase">
            <p>&copy; {new Date().getFullYear()} Nuga Best Properties. Leading Digital Estate Portal.</p>
            <div className="flex space-x-8 mt-6 md:mt-0">
               <a href="#" className="hover:text-white transition-colors">Site Map</a>
               <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>

      {/* AI Assistant */}
      <AIChatBot />
    </div>
  );
};

export default App;
