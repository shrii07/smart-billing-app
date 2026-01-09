import React from 'react'
import toast from 'react-hot-toast'
import { useParams, useNavigate } from 'react-router-dom'
import { FiArrowLeft, FiPrinter, FiEdit2, FiTrash2 } from 'react-icons/fi'
import { api } from '../services/api'
import { LoadingSpinner, BackButton } from '../components/Layout'
import { formatCurrency, formatDate } from '../utils/formatters'

const BillDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bill, setBill] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetchBill();
  }, [id]);

  const fetchBill = async () => {
    try {
      setLoading(true);
      const response = await api.bills.getById(id);
      if (response.success) {
        setBill(response.data);
      } else {
        toast.error('Failed to fetch bill');
        navigate('/bills');
      }
    } catch (error) {
      toast.error('Error fetching bill');
      navigate('/bills');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this bill?')) {
      try {
        const response = await api.bills.delete(id);
        if (response.success) {
          toast.success('Bill deleted successfully');
          navigate('/bills');
        } else {
          toast.error('Failed to delete bill');
        }
      } catch (error) {
        toast.error('Error deleting bill');
      }
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!bill) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <p className="text-slate-500">Bill not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <BackButton />

      {/* Header */}
      <div className="card mb-6 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">{bill.billNumber}</h1>
          <p className="text-slate-600 mt-2">{bill.customerName}</p>
          <p className="text-sm text-slate-500 mt-1">Created: {formatDate(bill.createdAt)}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => window.open(`/print/${bill._id}`)}
            className="btn-secondary flex items-center gap-2"
          >
            <FiPrinter />
            Print
          </button>
          <button
            onClick={handleDelete}
            className="btn-danger flex items-center gap-2"
          >
            <FiTrash2 />
            Delete
          </button>
        </div>
      </div>

      {/* Bill Details */}
      <div className="card mb-6">
        {/* Items Table */}
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Items</h2>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-3 font-medium text-slate-700">Product</th>
                <th className="text-center py-3 px-3 font-medium text-slate-700">Qty</th>
                <th className="text-right py-3 px-3 font-medium text-slate-700">Price</th>
                <th className="text-right py-3 px-3 font-medium text-slate-700">Total</th>
              </tr>
            </thead>
            <tbody>
              {bill.items.map((item, index) => (
                <tr key={index} className="border-b border-slate-100">
                  <td className="py-3 px-3 text-slate-900">{item.productName}</td>
                  <td className="py-3 px-3 text-center text-slate-700">{item.quantity}</td>
                  <td className="py-3 px-3 text-right text-slate-700">{formatCurrency(item.price)}</td>
                  <td className="py-3 px-3 text-right font-medium text-slate-900">
                    {formatCurrency(item.total)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="flex justify-end mb-6">
          <div className="w-full sm:w-96">
            <div className="bg-slate-50 rounded-lg p-4 space-y-2">
              <div className="flex justify-between text-slate-700">
                <span>Subtotal:</span>
                <span className="font-medium">{formatCurrency(bill.subTotal)}</span>
              </div>
              {bill.tax > 0 && (
                <div className="flex justify-between text-slate-700">
                  <span>Tax ({bill.taxPercentage}%):</span>
                  <span className="font-medium">{formatCurrency(bill.tax)}</span>
                </div>
              )}
              <div className="border-t border-slate-200 pt-2 flex justify-between text-lg font-bold text-slate-900">
                <span>Grand Total:</span>
                <span className="text-primary-600">{formatCurrency(bill.grandTotal)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Notes */}
        {bill.notes && (
          <div className="mt-6 pt-6 border-t border-slate-200">
            <h3 className="text-sm font-medium text-slate-700 mb-2">Notes</h3>
            <p className="text-slate-600">{bill.notes}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BillDetailPage;
