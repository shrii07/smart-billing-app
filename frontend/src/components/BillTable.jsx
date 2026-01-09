import React from 'react'
import toast from 'react-hot-toast'
import { FiTrash2, FiEye, FiPrinter } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { api } from '../services/api'
import { formatCurrency, formatDate } from '../utils/formatters'

const BillTable = ({ bills, onDelete, loading }) => {
  const [deleting, setDeleting] = React.useState(null);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this bill?')) {
      setDeleting(id);
      try {
        const response = await api.bills.delete(id);
        if (response.success) {
          toast.success('Bill deleted successfully');
          if (onDelete) onDelete(id);
        } else {
          toast.error('Failed to delete bill');
        }
      } catch (error) {
        toast.error('Error deleting bill');
        console.error(error);
      } finally {
        setDeleting(null);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!bills || bills.length === 0) {
    return (
      <div className="card text-center py-12">
        <p className="text-slate-500">No bills found. Create your first bill!</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b-2 border-slate-200">
            <th className="text-left py-4 px-4 font-semibold text-slate-700">Bill #</th>
            <th className="text-left py-4 px-4 font-semibold text-slate-700">Customer</th>
            <th className="text-right py-4 px-4 font-semibold text-slate-700">Amount</th>
            <th className="text-center py-4 px-4 font-semibold text-slate-700">Date</th>
            <th className="text-right py-4 px-4 font-semibold text-slate-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bills.map((bill) => (
            <tr key={bill._id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
              <td className="py-4 px-4 font-medium text-slate-900">{bill.billNumber}</td>
              <td className="py-4 px-4 text-slate-700">{bill.customerName}</td>
              <td className="py-4 px-4 text-right font-semibold text-slate-900">
                {formatCurrency(bill.grandTotal)}
              </td>
              <td className="py-4 px-4 text-center text-slate-600 text-sm">
                {formatDate(bill.createdAt)}
              </td>
              <td className="py-4 px-4 text-right">
                <div className="flex items-center justify-end gap-2">
                  <Link
                    to={`/bills/${bill._id}`}
                    className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                    title="View"
                  >
                    <FiEye />
                  </Link>
                  <Link
                    to={`/print/${bill._id}`}
                    className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                    title="Print"
                  >
                    <FiPrinter />
                  </Link>
                  <button
                    onClick={() => handleDelete(bill._id)}
                    disabled={deleting === bill._id}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                    title="Delete"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BillTable;
