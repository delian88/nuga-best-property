
import React, { useState } from 'react';

export type ViewType = 'home' | 'for-sale' | 'for-rent' | 'short-let' | 'companies' | 'resources' | 'contact';

interface HeaderProps {
  onNavigate: (view: ViewType) => void;
  currentView: ViewType;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, currentView }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks: { label: string; view: ViewType }[] = [
    { label: 'For Sale', view: 'for-sale' },
    { label: 'For Rent', view: 'for-rent' },
    { label: 'Short Let', view: 'short-let' },
    { label: 'Companies', view: 'companies' },
    { label: 'Resources', view: 'resources' },
    { label: 'Contact', view: 'contact' },
  ];

  const handleNav = (view: ViewType) => {
    onNavigate(view);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div 
            className="flex-shrink-0 flex items-center cursor-pointer group" 
            onClick={() => handleNav('home')}
          >
            <span className="text-2xl font-black tracking-tighter shining-text transition-transform group-hover:scale-105">
              NUGA BEST <span className="text-emerald-600">PROPERTIES</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex space-x-6">
            {navLinks.map((link) => (
              <button
                key={link.view}
                onClick={() => handleNav(link.view)}
                className={`px-3 py-2 text-sm font-bold transition-all relative ${
                  currentView === link.view ? 'text-emerald-600' : 'text-gray-600 hover:text-emerald-600'
                }`}
              >
                {link.label}
                {currentView === link.view && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-600 rounded-full"></span>
                )}
              </button>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="text-gray-600 hover:text-emerald-600 text-sm font-bold px-4 py-2 transition-colors">Login</button>
            <button className="bg-emerald-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-emerald-700 transition-all shadow-lg hover:shadow-emerald-200 relative overflow-hidden group">
              <span className="relative z-10">Post Property</span>
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"></div>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="xl:hidden flex items-center">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-500 hover:text-emerald-600 focus:outline-none p-2 rounded-lg bg-gray-50 transition-colors"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="xl:hidden bg-white border-t border-gray-100 px-4 pt-4 pb-8 space-y-2 animate__animated animate__fadeInDown">
          {navLinks.map((link) => (
            <button 
              key={link.view}
              onClick={() => handleNav(link.view)}
              className={`block w-full text-left px-4 py-3 text-base font-bold rounded-xl transition-colors ${
                currentView === link.view ? 'bg-emerald-50 text-emerald-700' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="pt-4 flex flex-col space-y-3">
            <button className="w-full text-center py-3 text-gray-700 font-bold border border-gray-200 rounded-xl">Login</button>
            <button className="w-full bg-emerald-600 text-white py-3 rounded-xl font-bold shadow-lg shadow-emerald-200">
              Post a Property
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
