import React from 'react'
import { FiArrowLeft, FiHome, FiFileText, FiPlus, FiLogOut, FiMenu, FiX } from 'react-icons/fi'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../utils/context'

export const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = React.useState(true);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const navItems = [
    { path: '/', icon: FiHome, label: 'Dashboard' },
    { path: '/bills', icon: FiFileText, label: 'Invoices' },
    { path: '/create-bill', icon: FiPlus, label: 'Create' },
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 md:hidden bg-gradient-to-r from-amber-500 to-orange-600 text-white p-2 rounded-lg transform hover:scale-110 transition-transform hover:shadow-lg"
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Vertical Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-indigo-900 via-indigo-800 to-indigo-900 text-white shadow-2xl transition-all duration-300 z-40 ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        } md:translate-x-0`}
      >
        {/* Logo Section */}
        <div className="p-6 border-b border-indigo-700/50">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center group-hover:shadow-lg group-hover:shadow-amber-500/50 transition-all transform group-hover:scale-110">
              <FiFileText className="text-indigo-900 text-2xl font-bold" />
            </div>
            <div>
              <h1 className="text-lg font-black text-white">Smart</h1>
              <p className="text-xs text-amber-300 font-semibold">Billing</p>
            </div>
          </Link>
        </div>

        {/* Navigation Items */}
        <nav className="py-8 px-4 space-y-2 flex-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-300 group ${
                  isActive(item.path)
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 shadow-lg shadow-amber-500/40 scale-105'
                    : 'text-indigo-200 hover:bg-indigo-700/40'
                }`}
              >
                <Icon
                  size={24}
                  className={`transition-transform group-hover:scale-110 ${
                    isActive(item.path) ? 'text-white' : 'text-indigo-300 group-hover:text-white'
                  }`}
                />
                <span
                  className={`font-semibold transition-colors ${
                    isActive(item.path) ? 'text-white' : 'text-indigo-200 group-hover:text-white'
                  }`}
                >
                  {item.label}
                </span>
                {isActive(item.path) && (
                  <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse"></div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User Info & Logout */}
        <div className="p-4 border-t border-indigo-700/50">
          <div className="mb-4 px-4 py-3 bg-indigo-700/30 rounded-lg backdrop-blur-sm">
            <p className="text-xs text-indigo-300 mb-1 font-semibold">Logged in as</p>
            <p className="font-bold text-white truncate">{user?.name || user?.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-red-500/50"
          >
            <FiLogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export const BackButton = () => {
  return (
    <button
      onClick={() => window.history.back()}
      className="flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-6 transition-colors"
    >
      <FiArrowLeft />
      Go Back
    </button>
  );
};

export const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center py-12">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
    </div>
  );
};

export const EmptyState = ({ icon: Icon, title, description, action }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <Icon className="text-slate-300 text-6xl mb-4" />
      <h3 className="text-xl font-semibold text-slate-700 mb-2">{title}</h3>
      <p className="text-slate-500 text-center max-w-sm mb-6">{description}</p>
      {action && action}
    </div>
  );
};

export const StatCard = ({ icon: Icon, label, value, trend }) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-600">{label}</p>
          <p className="text-3xl font-bold text-slate-900 mt-2">{value}</p>
          {trend && <p className="text-xs text-green-600 mt-2">{trend}</p>}
        </div>
        <div className="p-3 bg-primary-50 rounded-lg">
          <Icon className="text-primary-600 text-2xl" />
        </div>
      </div>
    </div>
  );
};
