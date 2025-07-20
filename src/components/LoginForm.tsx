import React, { useState } from 'react';
import { Shield, Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    const success = await login(email, password);
    if (!success) {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-gray-700">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
              <img
                src="/assets/grid360-login-logo.JPG"
                alt="SAPS Logo"
                className="w-25 h-25 object-contain rounded-sm  mx-auto"
              />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">SAPS <span className="text-blue-400 font-normal">360</span></h1>
            <p className="text-gray-400">AI Situational Awareness</p>
                <div className="hidden md:block text-gray-400 text-sm">
              <span className="text-white">v1.0.0 BETA</span>
            </div>
          </div>
      
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3 text-red-400 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            >
              {isLoading ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>
  
          <div className="mt-6 text-center text-gray-400 text-sm">
            
            {/* <p className="text-blue-400">admin@saps.gov.za / secure123</p> */}
          </div>
        </div>
      </div>
       <footer className="fixed bottom-0 left-0 right-0 z-40 bg-gray-900/50 backdrop-blur-sm">
	    <img
                src="/assets/grid logo.png"
                alt="SAPS Logo"
                className="w-25 h-25 object-contain rounded-sm  mx-auto"
              />
          <div className="container mx-auto px-4 py-3 flex justify-between items-center pl-[30%]">
            <p className="text-white/80 text-xs md:text-sm">
              Copyright © {new Date().getFullYear()} GRID AI, a wholly-owned subsidiary of Next Group South Africa. All rights reserved.
            </p>
          </div>
    </footer>
    </div>
  );
};

export default LoginForm;