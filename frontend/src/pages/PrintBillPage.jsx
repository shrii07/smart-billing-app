import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { api } from '../services/api'
import { LoadingSpinner } from '../components/Layout'
import { formatCurrency, formatDate } from '../utils/formatters'
import { FiArrowLeft, FiPrinter } from 'react-icons/fi'

const PrintBillPage = () => {
  const { id } = useParams();
  const [bill, setBill] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetchBill();
    // Hide sidebar and navbar on print
    const style = document.createElement('style');
    style.innerHTML = `
      @media print {
        aside, nav, button, [role="navigation"] { display: none !important; }
        main { margin-left: 0 !important; }
        body { background: white; }
        .print-container { width: 100%; margin: 0; padding: 0; }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const fetchBill = async () => {
    try {
      const response = await api.bills.getById(id);
      if (response.success) {
        setBill(response.data);
      }
    } catch (error) {
      console.error('Error fetching bill:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!bill) {
    return (
      <div className="p-8">
        <div className="text-center py-12">
          <p className="text-lg text-gray-600 mb-4">Bill not found</p>
          <Link to="/bills" className="text-blue-600 hover:text-blue-700 font-semibold">
            Back to Bills
          </Link>
        </div>
      </div>
    );
  }

  const subTotal = bill.items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
  const tax = (subTotal * bill.taxPercentage) / 100;
  const grandTotal = subTotal + tax;

  return (
    <div className="print-container min-h-screen bg-gray-100 p-8">
      <div className="mb-6 no-print flex gap-4">
        <Link
          to={`/bills/${id}`}
          className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-all"
        >
          <FiArrowLeft />
          Back
        </Link>
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-2 rounded-lg transition-all font-semibold"
        >
          <FiPrinter />
          Print
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-2xl p-12 max-w-4xl mx-auto">
        {/* Company Header */}
        <div className="mb-12 pb-8 border-b-2 border-gray-300">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-5xl font-black text-gray-900 mb-2">
                Smart <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Billing</span>
              </h1>
              <p className="text-gray-600 text-sm">Professional Invoice Management System</p>
            </div>
            <div className="text-right">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-2xl p-6">
                <p className="text-sm font-semibold mb-1">Invoice #</p>
                <p className="text-2xl font-black">{bill.billNumber?.substring(0, 12)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bill Details */}
        <div className="grid grid-cols-2 gap-12 mb-12">
          <div>
            <h3 className="text-xs font-black text-gray-500 uppercase mb-4 tracking-wider">Bill To</h3>
            <p className="text-2xl font-bold text-gray-900">{bill.customerName}</p>
          </div>
          <div className="text-right">
            <div className="space-y-3">
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase">Issue Date</p>
                <p className="text-lg font-bold text-gray-900">{formatDate(bill.createdAt)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Items Table */}
        <div className="mb-12">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b-2 border-blue-200">
                <th className="text-left py-4 px-6 font-bold text-gray-900 text-sm uppercase">Description</th>
                <th className="text-center py-4 px-6 font-bold text-gray-900 text-sm uppercase">Quantity</th>
                <th className="text-right py-4 px-6 font-bold text-gray-900 text-sm uppercase">Unit Price</th>
                <th className="text-right py-4 px-6 font-bold text-gray-900 text-sm uppercase">Amount</th>
              </tr>
            </thead>
            <tbody>
              {bill.items.map((item, index) => (
                <tr key={index} className="border-b border-gray-200 hover:bg-blue-50 transition-colors">
                  <td className="py-4 px-6 text-gray-900 font-semibold">{item.productName}</td>
                  <td className="text-center py-4 px-6 text-gray-700">{item.quantity}</td>
                  <td className="text-right py-4 px-6 text-gray-700">{formatCurrency(item.price)}</td>
                  <td className="text-right py-4 px-6 font-bold text-gray-900">
                    {formatCurrency(item.quantity * item.price)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals Section */}
        <div className="flex justify-end mb-12">
          <div className="w-full max-w-sm">
            <div className="space-y-4">
              <div className="flex justify-between py-3 border-b border-gray-300">
                <span className="text-gray-700 font-semibold">Subtotal</span>
                <span className="text-gray-900 font-bold text-lg">{formatCurrency(subTotal)}</span>
              </div>
              
              {bill.taxPercentage > 0 && (
                <div className="flex justify-between py-3 border-b border-gray-300">
                  <span className="text-gray-700 font-semibold">Tax ({bill.taxPercentage}%)</span>
                  <span className="text-gray-900 font-bold text-lg">{formatCurrency(tax)}</span>
                </div>
              )}
              
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl p-6 flex justify-between items-center">
                <span className="font-bold text-lg">TOTAL DUE</span>
                <span className="text-3xl font-black">{formatCurrency(grandTotal)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Notes Section */}
        {bill.notes && (
          <div className="mb-12 p-6 bg-gray-50 rounded-lg border-l-4 border-blue-600">
            <h3 className="text-sm font-black text-gray-600 uppercase mb-3 tracking-wider">Notes</h3>
            <p className="text-gray-700 leading-relaxed">{bill.notes}</p>
          </div>
        )}

        {/* Footer */}
        <div className="border-t-2 border-gray-300 pt-8 mt-12">
          <div className="text-center space-y-2 mb-6">
            <p className="text-gray-700 font-semibold">Thank you for your business!</p>
            <p className="text-gray-500 text-sm">This is an electronically generated invoice</p>
          </div>
          
          <div className="text-center text-xs text-gray-400 space-y-1">
            <p>Generated on {formatDate(new Date())} - Smart Billing System</p>
            <p>© 2026 Smart Billing. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrintBillPage;
