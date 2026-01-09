import React, { useState, useEffect } from 'react'
import { FiFileText, FiDollarSign, FiBarChart2, FiTrendingUp, FiArrowUp, FiArrowDown, FiPlus, FiEye } from 'react-icons/fi'
import { api } from '../services/api'
import { StatCard, LoadingSpinner } from '../components/Layout'
import { formatCurrency, formatDate } from '../utils/formatters'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'

const Dashboard = () => {
  const [stats, setStats] = React.useState({
    totalBills: 0,
    totalRevenue: 0,
    averageValue: 0,
    totalTax: 0,
  });
  const [loading, setLoading] = React.useState(true);
  const [recentBills, setRecentBills] = React.useState([]);
  const [growth, setGrowth] = React.useState({
    billsGrowth: 0,
    revenueGrowth: 0,
  });

  React.useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await api.bills.getAll();
      console.log('Dashboard API Response:', response);

      let bills = [];
      if (response.success && response.data) {
        bills = response.data;
      } else if (Array.isArray(response)) {
        bills = response;
      }

      if (bills && bills.length > 0) {
        const totalBills = bills.length;
        const totalRevenue = bills.reduce((sum, bill) => sum + (bill.grandTotal || 0), 0);
        const totalTax = bills.reduce((sum, bill) => sum + (bill.tax || 0), 0);
        const averageValue = totalBills > 0 ? totalRevenue / totalBills : 0;

        setStats({
          totalBills,
          totalRevenue,
          averageValue,
          totalTax,
        });

        // Calculate growth (mock - in real app this would compare to previous period)
        setGrowth({
          billsGrowth: 12.5,
          revenueGrowth: 8.3,
        });

        setRecentBills(bills.slice(0, 5));
      } else {
        setStats({
          totalBills: 0,
          totalRevenue: 0,
          averageValue: 0,
          totalTax: 0,
        });
        setRecentBills([]);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
      toast.error('Failed to load dashboard');
      setStats({
        totalBills: 0,
        totalRevenue: 0,
        averageValue: 0,
        totalTax: 0,
      });
      setRecentBills([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-slate-100 py-8 animate-fadeIn">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 animate-slideDown">
          <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-900 to-indigo-600 mb-2">Dashboard</h1>
          <p className="text-indigo-600 text-lg font-semibold">Welcome back! Here's your billing overview</p>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Bills */}
          <div className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-amber-300 cursor-pointer transform hover:scale-105 hover:translate-y-[-8px] animate-slideUp" style={{animationDelay: '0.1s'}}>
            <div className="flex items-start justify-between mb-4">
              <div className="bg-gradient-to-br from-amber-100 to-orange-50 p-3 rounded-xl group-hover:from-amber-200 transition-all">
                <FiFileText className="text-amber-600 text-2xl" />
              </div>
              <span className="flex items-center gap-1 text-green-600 font-semibold text-sm bg-green-50 px-3 py-1 rounded-full">
                <FiArrowUp className="text-lg" />
                {growth.billsGrowth}%
              </span>
            </div>
            <h3 className="text-gray-600 text-sm font-semibold mb-1">Total Bills</h3>
            <p className="text-3xl font-black text-gray-900">{stats.totalBills}</p>
            <p className="text-xs text-gray-500 mt-2">Bills created this month</p>
          </div>

          {/* Total Revenue */}
          <div className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-emerald-300 cursor-pointer transform hover:scale-105 hover:translate-y-[-8px] animate-slideUp" style={{animationDelay: '0.2s'}}>
            <div className="flex items-start justify-between mb-4">
              <div className="bg-gradient-to-br from-emerald-100 to-green-50 p-3 rounded-xl group-hover:from-emerald-200 transition-all">
                <FiDollarSign className="text-emerald-600 text-2xl" />
              </div>
              <span className="flex items-center gap-1 text-green-600 font-semibold text-sm bg-green-50 px-3 py-1 rounded-full">
                <FiArrowUp className="text-lg" />
                {growth.revenueGrowth}%
              </span>
            </div>
            <h3 className="text-gray-600 text-sm font-semibold mb-1">Total Revenue</h3>
            <p className="text-3xl font-black text-gray-900">{formatCurrency(stats.totalRevenue)}</p>
            <p className="text-xs text-gray-500 mt-2">Income from all bills</p>
          </div>

          {/* Average Value */}
          <div className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-indigo-300 cursor-pointer transform hover:scale-105 hover:translate-y-[-8px] animate-slideUp" style={{animationDelay: '0.3s'}}>
            <div className="flex items-start justify-between mb-4">
              <div className="bg-gradient-to-br from-indigo-100 to-indigo-50 p-3 rounded-xl group-hover:from-indigo-200 transition-all">
                <FiTrendingUp className="text-indigo-600 text-2xl" />
              </div>
              <span className="flex items-center gap-1 text-gray-600 font-semibold text-sm bg-gray-100 px-3 py-1 rounded-full">
                <FiArrowDown className="text-lg" />
                2.1%
              </span>
            </div>
            <h3 className="text-gray-600 text-sm font-semibold mb-1">Average Value</h3>
            <p className="text-3xl font-black text-gray-900">{formatCurrency(stats.averageValue)}</p>
            <p className="text-xs text-gray-500 mt-2">Per bill average</p>
          </div>

          {/* Total Tax */}
          <div className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-rose-300 cursor-pointer transform hover:scale-105 hover:translate-y-[-8px] animate-slideUp" style={{animationDelay: '0.4s'}}>
            <div className="flex items-start justify-between mb-4">
              <div className="bg-gradient-to-br from-rose-100 to-red-50 p-3 rounded-xl group-hover:from-rose-200 transition-all">
                <FiBarChart2 className="text-rose-600 text-2xl" />
              </div>
              <span className="text-gray-600 font-semibold text-sm bg-gray-100 px-3 py-1 rounded-full">
                {stats.totalBills > 0 ? ((stats.totalTax / stats.totalRevenue) * 100).toFixed(1) : 0}%
              </span>
            </div>
            <h3 className="text-gray-600 text-sm font-semibold mb-1">Total Tax</h3>
            <p className="text-3xl font-black text-gray-900">{formatCurrency(stats.totalTax)}</p>
            <p className="text-xs text-gray-500 mt-2">Tax collected</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Link
            to="/create-bill"
            className="bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:translate-y-[-8px] flex items-center gap-4 group animate-slideUp"
          >
            <div className="bg-white/20 p-4 rounded-xl group-hover:bg-white/30 transition-all">
              <FiPlus className="text-3xl" />
            </div>
            <div>
              <h3 className="text-lg font-bold">Create New Bill</h3>
              <p className="text-amber-100">Generate invoice instantly</p>
            </div>
          </Link>

          <Link
            to="/bills"
            className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:translate-y-[-8px] flex items-center gap-4 group animate-slideUp"
          >
            <div className="bg-white/20 p-4 rounded-xl group-hover:bg-white/30 transition-all">
              <FiEye className="text-3xl" />
            </div>
            <div>
              <h3 className="text-lg font-bold">View All Bills</h3>
              <p className="text-indigo-100">Manage your invoices</p>
            </div>
          </Link>
        </div>

        {/* Recent Bills */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden animate-slideUp">
          <div className="bg-gradient-to-r from-indigo-900 to-indigo-800 px-8 py-6 border-b border-indigo-700">
            <h2 className="text-2xl font-bold text-white">Recent Bills</h2>
            <p className="text-indigo-200 text-sm mt-1">Latest invoices created</p>
          </div>

          {recentBills && recentBills.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="px-8 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Bill ID</th>
                    <th className="px-8 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Customer</th>
                    <th className="px-8 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Amount</th>
                    <th className="px-8 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Date</th>
                    <th className="px-8 py-4 text-center text-xs font-bold text-gray-600 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recentBills.map((bill, idx) => (
                    <tr
                      key={bill._id}
                      className="border-b border-gray-100 hover:bg-indigo-50 transition-colors duration-200 animate-fadeIn"
                      style={{animationDelay: `${idx * 0.1}s`}}
                    >
                      <td className="px-8 py-4">
                        <span className="font-mono text-sm font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-lg">
                          {bill.billNumber?.substring(0, 12)}...
                        </span>
                      </td>
                      <td className="px-8 py-4">
                        <p className="font-semibold text-gray-900">{bill.customerName}</p>
                      </td>
                      <td className="px-8 py-4">
                        <p className="font-bold text-gray-900">{formatCurrency(bill.grandTotal)}</p>
                      </td>
                      <td className="px-8 py-4 text-gray-600 text-sm">
                        {formatDate(bill.createdAt)}
                      </td>
                      <td className="px-8 py-4 text-center">
                        <Link
                          to={`/bills/${bill._id}`}
                          className="inline-block bg-indigo-100 text-indigo-600 hover:bg-indigo-600 hover:text-white rounded-lg p-2 transition-all duration-200 transform hover:scale-110"
                        >
                          <FiEye className="text-lg" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="px-8 py-16 text-center">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiFileText className="text-indigo-400 text-3xl" />
              </div>
              <p className="text-gray-600 font-semibold mb-4">No bills yet</p>
              <Link
                to="/create-bill"
                className="inline-block bg-gradient-to-r from-amber-500 to-orange-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all font-semibold transform hover:scale-105"
              >
                Create First Bill
              </Link>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.6s ease-out forwards;
          opacity: 0;
        }
        .animate-slideDown {
          animation: slideDown 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
