
import React, { useState } from 'react';
// Corrected import: User type should be imported from types.ts
import { User } from '../types';

export type ViewType = 'home' | 'for-sale' | 'for-rent' | 'short-let' | 'companies' | 'resources' | 'contact' | 'admin' | 'dashboard';

interface HeaderProps {
  onNavigate: (view: ViewType) => void;
  currentView: ViewType;
  user: User | null;
  onLoginClick: () => void;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, currentView, user, onLoginClick, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks: { label: string; view: ViewType }[] = [
    { label: 'For Sale', view: 'for-sale' },
    { label: 'For Rent', view: 'for-rent' },
    { label: 'Short Let', view: 'short-let' },
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
          <div className="flex-shrink-0 flex items-center cursor-pointer group" onClick={() => handleNav('home')}>
            <span className="text-2xl font-black tracking-tighter shining-text transition-transform group-hover:scale-105">
              NUGA BEST <span className="text-emerald-600">PROPERTIES</span>
            </span>
          </div>

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
              </button>
            ))}
            {user?.role === 'admin' && (
              <button
                onClick={() => handleNav('admin')}
                className={`px-3 py-2 text-sm font-black transition-all relative uppercase tracking-widest ${
                  currentView === 'admin' ? 'text-emerald-600' : 'text-fuchsia-700 hover:text-emerald-600'
                }`}
              >
                Admin Command
              </button>
            )}
            {user && (
              <button
                onClick={() => handleNav('dashboard')}
                className={`px-3 py-2 text-sm font-black transition-all relative uppercase tracking-widest ${
                  currentView === 'dashboard' ? 'text-emerald-600' : 'text-emerald-700 hover:text-emerald-600'
                }`}
              >
                My Dashboard
              </button>
            )}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Hi, {user.name.split(' ')[0]}</span>
                <button 
                  onClick={onLogout}
                  className="bg-gray-50 text-gray-400 hover:text-red-500 text-xs font-black px-4 py-2 rounded-xl transition-all"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button 
                onClick={onLoginClick}
                className="bg-emerald-600 text-white px-8 py-2.5 rounded-xl text-xs font-black hover:bg-emerald-700 transition-all shadow-lg hover:shadow-emerald-100 uppercase tracking-widest"
              >
                Login / Register
              </button>
            )}
          </div>

          <div className="xl:hidden flex items-center">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-lg bg-gray-50">
              <svg className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="xl:hidden bg-white border-t border-gray-100 px-4 pt-4 pb-8 space-y-2 animate__animated animate__fadeInDown">
          {navLinks.map((link) => (
            <button key={link.view} onClick={() => handleNav(link.view)} className="block w-full text-left px-4 py-3 text-base font-bold rounded-xl">{link.label}</button>
          ))}
          {user && (
            <button onClick={() => handleNav('dashboard')} className="block w-full text-left px-4 py-3 text-base font-black text-emerald-700 uppercase">My Dashboard</button>
          )}
          <div className="pt-4">
            {user ? (
              <button onClick={onLogout} className="w-full bg-gray-100 py-3 rounded-xl font-bold">Logout</button>
            ) : (
              <button onClick={onLoginClick} className="w-full bg-emerald-600 text-white py-3 rounded-xl font-bold">Sign In</button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
