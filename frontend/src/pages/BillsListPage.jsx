import React from 'react'
import toast from 'react-hot-toast'
import { api } from '../services/api'
import BillTable from '../components/BillTable'
import { LoadingSpinner, EmptyState } from '../components/Layout'
import { FiFileText, FiPlus, FiSearch } from 'react-icons/fi'
import { Link } from 'react-router-dom'

const BillsListPage = () => {
  const [bills, setBills] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [searchTerm, setSearchTerm] = React.useState('');

  React.useEffect(() => {
    fetchBills();
  }, []);

  const fetchBills = async () => {
    try {
      setLoading(true);
      const response = await api.bills.getAll();
      console.log('BillsList API Response:', response);
      
      let billsData = [];
      if (response.success && response.data) {
        billsData = response.data;
      } else if (Array.isArray(response)) {
        billsData = response;
      }
      
      setBills(billsData || []);
    } catch (error) {
      toast.error('Error fetching bills');
      console.error(error);
      setBills([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (deletedId) => {
    setBills(bills.filter((bill) => bill._id !== deletedId));
  };

  const filteredBills = bills.filter(bill =>
    bill.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bill.billNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h1 className="text-4xl font-black text-gray-900 mb-2">Invoices</h1>
            <p className="text-gray-600 text-lg">Manage and view all your bills</p>
          </div>
          <Link 
            to="/create-bill" 
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 font-semibold"
          >
            <FiPlus className="text-xl" />
            New Invoice
          </Link>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
            <input
              type="text"
              placeholder="Search by customer name or bill number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-6 py-3 rounded-xl border border-gray-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
            />
          </div>
        </div>

        {/* Bills Table Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {bills.length === 0 && !loading ? (
            <div className="px-8 py-16 text-center">
              <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiFileText className="text-gray-400 text-4xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No invoices yet</h3>
              <p className="text-gray-600 mb-6">Start creating invoices to see them here</p>
              <Link 
                to="/create-bill" 
                className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-all font-semibold"
              >
                Create First Invoice
              </Link>
            </div>
          ) : loading ? (
            <div className="px-8 py-16 flex justify-center">
              <LoadingSpinner />
            </div>
          ) : filteredBills.length > 0 ? (
            <BillTable bills={filteredBills} onDelete={handleDelete} loading={loading} />
          ) : (
            <div className="px-8 py-12 text-center">
              <FiSearch className="text-gray-400 text-4xl mx-auto mb-4" />
              <p className="text-gray-600 font-semibold">No results found for "{searchTerm}"</p>
              <button 
                onClick={() => setSearchTerm('')}
                className="mt-4 text-blue-600 hover:text-blue-700 font-semibold"
              >
                Clear search
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BillsListPage;
