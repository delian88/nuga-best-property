
import React, { useState } from 'react';
import { db, User } from '../services/dbService';

interface AuthProps {
  onAuthSuccess: (user: User) => void;
  onClose: () => void;
}

const Auth: React.FC<AuthProps> = ({ onAuthSuccess, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  // Fixed: handleSubmit must be async to use dbService methods which are asynchronous
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      // Fixed: queryUsers is the correct async method to fetch users from dbService
      const allUsers = await db.queryUsers();

      if (isLogin) {
        // Fixed: Use the fetched users array to check credentials
        const user = allUsers.find(u => u.email === email && u.password === password);
        if (user) {
          onAuthSuccess(user);
        } else {
          setError('Invalid credentials. For demo admin, use admin@nugabest.com / admin12345');
        }
      } else {
        // Fixed: Check for existing user in the fetched users array
        if (allUsers.some(u => u.email === email)) {
          setError('User already exists');
          return;
        }
        const newUser: User = {
          id: Math.random().toString(36).substr(2, 9),
          email,
          password,
          name,
          role: 'user',
          // Fixed: joinedDate is a required property of the User interface
          joinedDate: new Date().toISOString()
        };
        // Fixed: createUser is the correct async method to add a user to dbService
        await db.createUser(newUser);
        onAuthSuccess(newUser);
      }
    } catch (err) {
      setError('An error occurred during authentication. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-fuchsia-950/40 backdrop-blur-xl animate__animated animate__fadeIn">
      <div className="bg-white w-full max-w-md rounded-[2.5rem] overflow-hidden shadow-2xl relative animate__animated animate__zoomIn">
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-emerald-600 transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
        </button>

        <div className="p-10 pt-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tighter shining-text inline-block">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-gray-500 text-sm mt-2 font-medium">Join the elite world of Nuga Best Properties</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2 ml-1">Full Name</label>
                <input 
                  required 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-gray-50 border-0 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-emerald-500 transition-all font-semibold"
                  placeholder="Enter your name"
                />
              </div>
            )}
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2 ml-1">Email Address</label>
              <input 
                required 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-50 border-0 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-emerald-500 transition-all font-semibold"
                placeholder="email@example.com"
              />
            </div>
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2 ml-1">Password</label>
              <input 
                required 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-50 border-0 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-emerald-500 transition-all font-semibold"
                placeholder="••••••••"
              />
            </div>

            {error && <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest text-center">{error}</p>}

            <button className="w-full bg-emerald-600 text-white font-black py-5 rounded-2xl uppercase tracking-[0.3em] text-xs shadow-xl shadow-emerald-800/20 hover:bg-emerald-700 transition-all active:scale-95">
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <div className="mt-8 text-center">
            <button 
              onClick={() => { setIsLogin(!isLogin); setError(''); }}
              className="text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-emerald-600 transition-colors"
            >
              {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
