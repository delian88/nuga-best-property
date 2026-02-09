
import React, { useState } from 'react';

interface HeaderProps {
  onNavigate: (view: 'home' | 'for-sale') => void;
  currentView: string;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, currentView }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            className="flex-shrink-0 flex items-center cursor-pointer" 
            onClick={() => onNavigate('home')}
          >
            <span className="text-2xl font-bold tracking-tighter shining-text">
              NUGA BEST <span className="text-emerald-600">PROPERTIES</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8">
            <button 
              onClick={() => onNavigate('for-sale')}
              className={`px-3 py-2 text-sm font-medium transition-colors ${
                currentView === 'for-sale' ? 'text-fuchsia-700' : 'text-gray-700 hover:text-fuchsia-700'
              }`}
            >
              For Sale
            </button>
            <a href="#" className="text-gray-700 hover:text-fuchsia-700 px-3 py-2 text-sm font-medium transition-colors">For Rent</a>
            <a href="#" className="text-gray-700 hover:text-fuchsia-700 px-3 py-2 text-sm font-medium transition-colors">Short Let</a>
            <a href="#" className="text-gray-700 hover:text-fuchsia-700 px-3 py-2 text-sm font-medium transition-colors">Companies</a>
            <a href="#" className="text-gray-700 hover:text-fuchsia-700 px-3 py-2 text-sm font-medium transition-colors">Resources</a>
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="text-gray-600 hover:text-fuchsia-700 text-sm font-medium">Login</button>
            <button className="bg-fuchsia-700 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-fuchsia-800 transition-colors shadow-sm relative overflow-hidden group">
              <span className="relative z-10">Post a Property</span>
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"></div>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
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
        <div className="md:hidden bg-white border-t border-gray-100 px-4 pt-2 pb-6 space-y-1">
          <button 
            onClick={() => { onNavigate('for-sale'); setIsMenuOpen(false); }}
            className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700"
          >
            For Sale
          </button>
          <a href="#" className="block px-3 py-2 text-base font-medium text-gray-700">For Rent</a>
          <a href="#" className="block px-3 py-2 text-base font-medium text-gray-700">Short Let</a>
          <a href="#" className="block px-3 py-2 text-base font-medium text-gray-700">Login</a>
          <button className="w-full mt-2 bg-fuchsia-700 text-white px-4 py-2 rounded-md font-medium">
            Post a Property
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
