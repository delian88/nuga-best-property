
import React, { useState } from 'react';
import { LOCATIONS, CATEGORIES } from '../constants';

const Hero: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Buy');

  return (
    <div className="relative min-h-[500px] h-[70vh] sm:h-[650px] bg-fuchsia-950 overflow-hidden flex items-center justify-center py-10">
      {/* Background Image with Zoom Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1920&q=80" 
          className="absolute inset-0 w-full h-full object-cover opacity-40 animate-slow-zoom"
          alt="Luxury House"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-fuchsia-950/60 via-fuchsia-950/30 to-gray-50/10"></div>
      </div>
      
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 text-center">
        <div className="animate__animated animate__fadeInDown">
          <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-4 border border-emerald-400/30">
            Premium Real Estate Portal
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight drop-shadow-lg font-serif">
            Find Your <span className="text-emerald-400">Dream Home</span> <br className="hidden sm:block"/> in Nigeria
          </h1>
          <p className="text-base sm:text-xl text-fuchsia-50/90 mb-8 sm:mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            Discover thousands of verified listings. From luxury villas in Lagos to commercial plots in Abuja.
          </p>
        </div>

        {/* Search Card */}
        <div className="bg-white/95 backdrop-blur-md rounded-xl sm:rounded-2xl shadow-2xl p-5 sm:p-8 text-gray-800 text-left mx-auto max-w-4xl animate__animated animate__fadeInUp animate__delay-1s">
          {/* Tabs */}
          <div className="flex space-x-6 sm:space-x-8 border-b border-gray-100 mb-5 sm:mb-6">
            {['Buy', 'Rent', 'Short Let'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 text-xs sm:text-sm font-bold transition-all relative ${
                  activeTab === tab ? 'text-fuchsia-700' : 'text-gray-400 hover:text-fuchsia-700'
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-fuchsia-700 rounded-full animate__animated animate__fadeInLeft"></span>
                )}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="relative">
              <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1 tracking-tighter">Location</label>
              <select className="w-full border-b border-gray-200 py-2 text-sm focus:border-fuchsia-500 focus:outline-none bg-transparent font-medium appearance-none">
                <option>All of Nigeria</option>
                {LOCATIONS.map(loc => <option key={loc}>{loc}</option>)}
              </select>
            </div>
            <div className="relative">
              <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1 tracking-tighter">Property Type</label>
              <select className="w-full border-b border-gray-200 py-2 text-sm focus:border-fuchsia-500 focus:outline-none bg-transparent font-medium appearance-none">
                <option>All Types</option>
                {CATEGORIES.map(cat => <option key={cat}>{cat}</option>)}
              </select>
            </div>
            <div className="relative">
              <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1 tracking-tighter">Budget Range</label>
              <select className="w-full border-b border-gray-200 py-2 text-sm focus:border-fuchsia-500 focus:outline-none bg-transparent font-medium appearance-none">
                <option>No Limit</option>
                <option>Under ₦5M</option>
                <option>₦5M - ₦50M</option>
                <option>₦50M - ₦200M</option>
                <option>Above ₦200M</option>
              </select>
            </div>
            <div className="flex items-center pt-2">
              <button className="w-full bg-emerald-600 text-white font-bold py-3 sm:py-4 rounded-lg sm:rounded-xl hover:bg-emerald-700 shadow-lg shadow-emerald-800/20 transition-all hover:-translate-y-0.5 active:scale-95 flex items-center justify-center space-x-2 text-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
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
