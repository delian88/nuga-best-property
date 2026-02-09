
import React, { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import PropertyCard from './components/PropertyCard';
import AIChatBot from './components/AIChatBot';
import { MOCK_PROPERTIES, LOCATIONS } from './constants';

const App: React.FC = () => {
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
  }, []);

  const featuredProperties = MOCK_PROPERTIES.filter(p => p.featured);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 overflow-x-hidden">
      <Header />
      
      <main className="flex-grow">
        <Hero />

        {/* Featured Listings Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 reveal">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div className="text-center md:text-left mb-6 md:mb-0">
              <span className="text-emerald-600 font-bold text-sm tracking-widest uppercase mb-2 block">Our Finest Selection</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 font-serif">Featured Premium Properties</h2>
              <div className="h-1.5 w-24 bg-fuchsia-700 mt-4 rounded-full mx-auto md:mx-0"></div>
            </div>
            <button className="px-6 py-3 border-2 border-fuchsia-700 text-fuchsia-700 font-bold rounded-xl hover:bg-fuchsia-700 hover:text-white transition-all transform hover:-translate-y-1 shadow-sm">
              Browse All Premium
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
                <p className="text-4xl font-extrabold mb-2">12,400+</p>
                <p className="text-emerald-300 text-sm font-medium uppercase tracking-widest">Active Listings</p>
              </div>
              <div>
                <p className="text-4xl font-extrabold mb-2">8,200+</p>
                <p className="text-emerald-300 text-sm font-medium uppercase tracking-widest">Properties Sold</p>
              </div>
              <div>
                <p className="text-4xl font-extrabold mb-2">5,100+</p>
                <p className="text-emerald-300 text-sm font-medium uppercase tracking-widest">Happy Clients</p>
              </div>
              <div>
                <p className="text-4xl font-extrabold mb-2">24/7</p>
                <p className="text-emerald-300 text-sm font-medium uppercase tracking-widest">Expert Support</p>
              </div>
            </div>
          </div>
        </section>

        {/* Recently Added Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 reveal">
          <div className="text-center mb-16">
             <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 font-serif mb-4">Latest Opportunities</h2>
             <p className="text-gray-500 max-w-xl mx-auto text-lg">Check out our most recently listed houses, lands, and commercial spaces across Nigeria.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {MOCK_PROPERTIES.map((property, idx) => (
              <PropertyCard 
                key={property.id} 
                property={property} 
                className={`reveal animate__delay-${idx % 4}s`}
              />
            ))}
          </div>

          <div className="mt-20 text-center">
            <button className="bg-fuchsia-700 text-white px-10 py-4 rounded-2xl font-bold hover:bg-fuchsia-800 shadow-2xl shadow-fuchsia-800/20 transition-all hover:scale-105 active:scale-95">
              Explore All 1,500+ Properties
            </button>
          </div>
        </section>

        {/* Services / Why Us */}
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
                <h2 className="text-4xl font-bold text-gray-900 font-serif mb-6 leading-tight">We help you find the best property for your lifestyle.</h2>
                <p className="text-gray-600 text-lg mb-8">
                  At Nuga Best Properties, we believe that finding a home should be an exciting journey, not a stressful one. Our team of local experts provides personalized service to ensure you find exactly what you're looking for.
                </p>
                <div className="space-y-6">
                   {[
                     { title: 'Verified Listings', desc: 'Every property goes through a rigorous verification process.', iconColor: 'text-emerald-600', bgColor: 'bg-emerald-50' },
                     { title: 'Market Insights', desc: 'AI-driven analytics to help you make the best investment.', iconColor: 'text-fuchsia-600', bgColor: 'bg-fuchsia-50' },
                     { title: 'Legal Support', desc: 'Assistance with documentation and legal property transfer.', iconColor: 'text-emerald-600', bgColor: 'bg-emerald-50' }
                   ].map((item, i) => (
                     <div key={i} className="flex items-start">
                       <div className={`flex-shrink-0 ${item.bgColor} p-2 rounded-lg ${item.iconColor} mr-4`}>
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

        {/* Map-style CTA */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 reveal">
          <div className="bg-gradient-to-r from-fuchsia-900 to-emerald-950 rounded-[3rem] p-12 sm:p-20 relative overflow-hidden shadow-3xl text-center md:text-left">
             <div className="relative z-10 md:flex items-center justify-between">
               <div className="md:w-2/3">
                 <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 font-serif">Are you a property owner?</h2>
                 <p className="text-fuchsia-50 text-xl mb-10 max-w-xl">
                   List your property today and reach millions of potential buyers and tenants across the globe.
                 </p>
                 <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                   <button className="bg-white text-fuchsia-950 px-10 py-4 rounded-2xl font-bold hover:bg-gray-100 transition-all shadow-xl active:scale-95">
                     Get Started Free
                   </button>
                   <button className="bg-emerald-600/50 backdrop-blur-md border border-emerald-400 text-white px-10 py-4 rounded-2xl font-bold hover:bg-emerald-600 transition-all shadow-lg active:scale-95">
                     View Agent Plans
                   </button>
                 </div>
               </div>
               <div className="hidden lg:block">
                 <div className="w-80 h-80 bg-fuchsia-400/20 backdrop-blur-3xl rounded-full flex items-center justify-center p-8 border border-white/20 animate-pulse">
                    <div className="w-full h-full bg-emerald-500/30 rounded-full flex items-center justify-center border border-white/30">
                       <svg className="w-24 h-24 text-white animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
                    </div>
                 </div>
               </div>
             </div>
             {/* Decorative blobs */}
             <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
             <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-400/10 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-950 text-gray-400 pt-24 pb-12 border-t border-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
            <div className="col-span-1 lg:col-span-1">
              <span className="text-2xl font-bold text-white tracking-tighter mb-8 block">
                NUGA BEST <span className="text-emerald-500">PROPERTIES</span>
              </span>
              <p className="text-sm leading-relaxed text-gray-500 mb-8 italic">
                "Finding you a place to call home is our greatest achievement."
              </p>
              <div className="flex space-x-5">
                {['facebook', 'twitter', 'instagram', 'linkedin'].map(social => (
                  <a key={social} href="#" className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center hover:bg-fuchsia-700 hover:text-white transition-all text-gray-400 shadow-md">
                    <span className="sr-only">{social}</span>
                    {social[0]}
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
