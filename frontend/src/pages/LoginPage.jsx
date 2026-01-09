import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FiMail, FiLock, FiLogIn, FiUserPlus, FiArrowRight, FiCheck, FiArrowLeft } from 'react-icons/fi';
import { useAuth } from '../utils/context';

const LoginPage = ({ onLogin }) => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [email, setEmail] = useState('admin@billing.com');
  const [password, setPassword] = useState('password123');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetLoading, setResetLoading] = useState(false);

  // Load saved email on mount
  useEffect(() => {
    const savedEmail = localStorage.getItem('rememberedEmail');
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const payload = isLogin
        ? { email, password }
        : { email, password, name, company };

      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success) {
        // Save email if remember me is checked
        if (rememberMe && isLogin) {
          localStorage.setItem('rememberedEmail', email);
        } else {
          localStorage.removeItem('rememberedEmail');
        }
        
        // Update AuthContext with login info
        login(data.user, data.token);
        toast.success(data.message);
        onLogin();
        navigate('/');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Connection error');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!resetEmail) {
      toast.error('Please enter your email address');
      return;
    }

    setResetLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: resetEmail }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Password reset email sent! Check your inbox.');
        setIsForgotPassword(false);
        setResetEmail('');
      } else {
        toast.error(data.message || 'Failed to send reset email');
      }
    } catch (error) {
      toast.error('Connection error');
      console.error(error);
    } finally {
      setResetLoading(false);
    }
  };

  const features = [
    { icon: '📊', title: 'Smart Billing', desc: 'Professional invoices' },
    { icon: '🔐', title: 'Secure', desc: 'JWT protected access' },
    { icon: '⚡', title: 'Fast', desc: 'Instant bill creation' },
    { icon: '📱', title: 'Mobile Friendly', desc: 'Works anywhere' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-indigo-800 to-purple-900 flex items-center justify-center p-4 overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-amber-400 opacity-10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-400 opacity-10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="w-full max-w-5xl relative z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left Side - Features */}
          <div className="hidden md:block text-white animate-slideDown">
            <h1 className="text-5xl font-black mb-4 leading-tight">
              Smart <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">Billing</span>
            </h1>
            <p className="text-lg text-indigo-200 mb-8 leading-relaxed">
              Professional invoice management made simple. Create, manage, and track bills with ease.
            </p>
            
            <div className="space-y-4">
              {features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3 bg-white/10 backdrop-blur-md p-4 rounded-xl hover:bg-white/20 transition-all transform hover:scale-105 hover:translate-x-2" style={{animationDelay: `${idx * 0.1}s`}}>
                  <span className="text-3xl">{feature.icon}</span>
                  <div>
                    <h3 className="font-bold text-white">{feature.title}</h3>
                    <p className="text-indigo-200 text-sm">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex gap-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-1 bg-white/30 rounded-full flex-1" style={{ 
                  animation: `pulse 2s ease-in-out ${i * 0.3}s infinite`,
                  backgroundColor: i === 0 ? '#fbbf24' : 'rgba(255,255,255,0.3)'
                }}></div>
              ))}
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="animate-slideUp">
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
              {isForgotPassword ? (
                <>
                  {/* Forgot Password Form */}
                  <div className="text-center mb-8">
                    <div className="inline-block bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-4 mb-4 transform hover:scale-110 transition-transform">
                      <FiMail className="text-white text-4xl" />
                    </div>
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-900 to-indigo-600 bg-clip-text text-transparent mb-1">
                      Reset Password
                    </h2>
                    <p className="text-gray-600">
                      Enter your email to receive a password reset link
                    </p>
                  </div>

                  <form onSubmit={handleForgotPassword} className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <FiMail className="absolute left-4 top-4 text-gray-400 text-lg" />
                        <input
                          type="email"
                          value={resetEmail}
                          onChange={(e) => setResetEmail(e.target.value)}
                          placeholder="admin@billing.com"
                          required
                          className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition-all placeholder-gray-400"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={resetLoading}
                      className={`w-full py-3 px-4 rounded-xl font-bold text-white transition-all duration-300 flex items-center justify-center gap-2 ${
                        resetLoading
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-gradient-to-r from-amber-500 to-orange-600 hover:shadow-xl hover:scale-105 transform'
                      }`}
                    >
                      {resetLoading ? (
                        <>
                          <span className="animate-spin">⚙️</span>
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Reset Link
                          <FiArrowRight />
                        </>
                      )}
                    </button>
                  </form>

                  <button
                    onClick={() => {
                      setIsForgotPassword(false);
                      setResetEmail('');
                    }}
                    className="w-full mt-4 py-3 px-4 rounded-xl font-bold text-amber-600 hover:text-orange-600 border-2 border-amber-200 hover:border-orange-300 transition-all flex items-center justify-center gap-2"
                  >
                    <FiArrowLeft />
                    Back to Login
                  </button>
                </>
              ) : (
                <>
                  {/* Login/Register Form */}
                  <div className="text-center mb-8">
                    <div className="inline-block bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-4 mb-4 transform hover:scale-110 transition-transform">
                      <FiLock className="text-white text-4xl" />
                    </div>
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-900 to-indigo-600 bg-clip-text text-transparent mb-1">
                      {isLogin ? 'Welcome Back' : 'Join Us'}
                    </h2>
                    <p className="text-gray-600">
                      {isLogin ? 'Login to your account' : 'Create your account'}
                    </p>
                  </div>

                  {/* Tabs */}
                  <div className="flex gap-2 mb-8 bg-gray-100 p-1 rounded-xl">
                    <button
                      onClick={() => setIsLogin(true)}
                      className={`flex-1 py-3 px-4 rounded-lg font-bold transition-all duration-300 ${
                        isLogin
                          ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg transform scale-105'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      <FiLogIn className="inline mr-2" />
                      Login
                    </button>
                    <button
                      onClick={() => setIsLogin(false)}
                      className={`flex-1 py-3 px-4 rounded-lg font-bold transition-all duration-300 ${
                        !isLogin
                          ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg transform scale-105'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      <FiUserPlus className="inline mr-2" />
                      Register
                    </button>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {!isLogin && (
                      <>
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">
                            Full Name
                          </label>
                          <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="John Doe"
                            required={!isLogin}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition-all placeholder-gray-400"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">
                            Company Name
                          </label>
                          <input
                            type="text"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            placeholder="Your Company"
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition-all placeholder-gray-400"
                          />
                        </div>
                      </>
                    )}

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <FiMail className="absolute left-4 top-4 text-gray-400 text-lg" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="admin@billing.com"
                          required
                          className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition-all placeholder-gray-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        Password
                      </label>
                      <div className="relative">
                        <FiLock className="absolute left-4 top-4 text-gray-400 text-lg" />
                        <input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••"
                          required
                          className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition-all placeholder-gray-400"
                        />
                      </div>
                    </div>

                    {isLogin && (
                      <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center gap-2 cursor-pointer group">
                          <input 
                            type="checkbox" 
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            className="w-4 h-4 rounded border-gray-300 accent-amber-500 cursor-pointer" 
                          />
                          <span className="text-gray-600 font-medium group-hover:text-gray-900 transition-colors">Remember me</span>
                        </label>
                        <button 
                          type="button" 
                          onClick={() => setIsForgotPassword(true)}
                          className="text-amber-600 hover:text-orange-600 font-bold transition-colors"
                        >
                          Forgot password?
                        </button>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className={`w-full py-3 px-4 rounded-xl font-bold text-white transition-all duration-300 flex items-center justify-center gap-2 ${
                        loading
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-gradient-to-r from-amber-500 to-orange-600 hover:shadow-xl hover:scale-105 transform'
                      }`}
                    >
                      {loading ? (
                        <>
                          <span className="animate-spin">⚙️</span>
                          {isLogin ? 'Logging in...' : 'Creating account...'}
                        </>
                      ) : (
                        <>
                          {isLogin ? 'Login to Dashboard' : 'Create Account'}
                          <FiArrowRight />
                        </>
                      )}
                    </button>
                  </form>

                  {/* Demo Credentials */}
                  {isLogin && (
                    <div className="mt-6 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border-2 border-amber-200">
                      <p className="text-sm font-bold text-amber-900 mb-2 flex items-center gap-2">
                        <FiCheck className="text-green-600" />
                        Demo Credentials:
                      </p>
                      <p className="text-sm text-amber-800 font-mono">
                        <strong>Email:</strong> admin@billing.com
                      </p>
                      <p className="text-sm text-amber-800 font-mono">
                        <strong>Password:</strong> password123
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Footer */}
            <p className="text-center text-white/80 text-sm mt-6 font-medium">
              © 2024 Smart Billing. All rights reserved.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideUp {
          animation: slideUp 0.6s ease-out;
        }
        .animate-slideDown {
          animation: slideDown 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default LoginPage;
