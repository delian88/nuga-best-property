
import React, { useState, useEffect } from 'react';
import { CATEGORIES } from '../constants';

const HERO_IMAGES = [
  'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1920&q=80', // Mansion (Sale)
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1920&q=80', // Waterfront (Rent)
  'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1920&q=80', // Land (Sale)
  'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1920&q=80', // Interior (Luxury)
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80'  // Duplex (Modern)
];

const Hero: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Buy');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [locationInput, setLocationInput] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative min-h-[550px] h-[75vh] sm:h-[700px] bg-fuchsia-950 overflow-hidden flex items-center justify-center py-10">
      {/* Background Slider */}
      {HERO_IMAGES.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${
            index === currentSlide ? 'opacity-40 scale-110' : 'opacity-0 scale-100'
          }`}
          style={{ transitionProperty: 'opacity, transform' }}
        >
          <img 
            src={img} 
            className="w-full h-full object-cover animate-slow-zoom"
            alt={`Property slide ${index + 1}`}
          />
        </div>
      ))}

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-fuchsia-950/70 via-fuchsia-950/40 to-gray-50/10"></div>
      
      {/* Slider Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
        {HERO_IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`w-2 h-2 rounded-full transition-all ${
              i === currentSlide ? 'bg-emerald-400 w-6' : 'bg-white/30 hover:bg-white/50'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 text-center">
        <div className="animate__animated animate__fadeInDown">
          <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-4 border border-emerald-400/30">
            Trusted Real Estate Partner
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight drop-shadow-2xl font-serif shining-text">
            Find Your Dream Home <br className="hidden sm:block"/> with Nuga Best
          </h1>
          <p className="text-base sm:text-xl text-fuchsia-50/90 mb-8 sm:mb-12 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-md">
            The most reliable portal for verified Houses, Lands, and Commercial spaces across all 36 states in Nigeria.
          </p>
        </div>

        {/* Search Card */}
        <div className="bg-white/95 backdrop-blur-md rounded-xl sm:rounded-2xl shadow-2xl p-5 sm:p-10 text-gray-800 text-left mx-auto max-w-4xl animate__animated animate__fadeInUp animate__delay-1s">
          {/* Tabs */}
          <div className="flex space-x-6 sm:space-x-10 border-b border-gray-100 mb-6 sm:mb-8">
            {['Buy', 'Rent', 'Short Let'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 text-xs sm:text-sm font-extrabold transition-all relative uppercase tracking-wider ${
                  activeTab === tab ? 'text-fuchsia-700' : 'text-gray-400 hover:text-fuchsia-700'
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <span className="absolute bottom-0 left-0 w-full h-1 bg-fuchsia-700 rounded-full animate__animated animate__fadeInLeft"></span>
                )}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
            <div className="relative col-span-1 sm:col-span-2">
              <label className="block text-[10px] font-bold text-gray-400 uppercase mb-2 tracking-widest">Location / Keyword</label>
              <div className="relative">
                <input 
                  type="text"
                  value={locationInput}
                  onChange={(e) => setLocationInput(e.target.value)}
                  placeholder="Enter state, locality or keyword"
                  className="w-full border-b-2 border-gray-100 py-3 text-sm focus:border-emerald-500 focus:outline-none bg-transparent font-semibold transition-colors placeholder:text-gray-300 placeholder:font-normal"
                />
                <div className="absolute right-0 bottom-3 pointer-events-none text-gray-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                </div>
              </div>
            </div>
            <div className="relative">
              <label className="block text-[10px] font-bold text-gray-400 uppercase mb-2 tracking-widest">Type</label>
              <div className="relative">
                <select className="w-full border-b-2 border-gray-100 py-3 text-sm focus:border-emerald-500 focus:outline-none bg-transparent font-semibold appearance-none cursor-pointer transition-colors">
                  <option>All Categories</option>
                  {CATEGORIES.map(cat => <option key={cat}>{cat}</option>)}
                </select>
                <div className="absolute right-0 bottom-3 pointer-events-none text-gray-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg>
                </div>
              </div>
            </div>
            <div className="flex items-center pt-2 md:pt-4">
              <button className="w-full bg-emerald-600 text-white font-bold py-4 rounded-xl hover:bg-emerald-700 shadow-xl shadow-emerald-800/20 transition-all hover:-translate-y-1 active:scale-95 flex items-center justify-center space-x-3 text-base">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                <span>Search</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
