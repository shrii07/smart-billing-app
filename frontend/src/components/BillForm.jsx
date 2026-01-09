import React from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { FiTrash2, FiDollarSign, FiPlus, FiCheck } from 'react-icons/fi'
import { api } from '../services/api'
import { formatCurrency, formatDate } from '../utils/formatters'

const BillForm = ({ initialData = null, onSuccess }) => {
  const navigate = useNavigate();
  const [customerName, setCustomerName] = React.useState(initialData?.customerName || '');
  const [items, setItems] = React.useState(
    initialData?.items || [{ productName: '', quantity: 1, price: 0 }]
  );
  const [taxPercentage, setTaxPercentage] = React.useState(initialData?.taxPercentage || 0);
  const [notes, setNotes] = React.useState(initialData?.notes || '');
  const [loading, setLoading] = React.useState(false);

  const subTotal = items.reduce((sum, item) => sum + item.quantity * item.price, 0);
  const tax = (subTotal * taxPercentage) / 100;
  const grandTotal = subTotal + tax;

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: field === 'productName' ? value : parseFloat(value) || 0 };
    setItems(newItems);
  };

  const addItem = () => {
    setItems([...items, { productName: '', quantity: 1, price: 0 }]);
  };

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!customerName.trim()) {
      toast.error('Please enter customer name');
      return;
    }

    if (items.some((item) => !item.productName || !item.quantity || !item.price)) {
      toast.error('Please fill all item details');
      return;
    }

    setLoading(true);

    try {
      const billData = {
        customerName,
        items,
        taxPercentage: parseFloat(taxPercentage) || 0,
        notes,
      };

      const response = initialData
        ? await api.bills.update(initialData._id, billData)
        : await api.bills.create(billData);

      if (response.success) {
        toast.success(initialData ? 'Bill updated successfully' : 'Bill created successfully');
        if (onSuccess) onSuccess(response.data);
        else navigate('/bills');
      } else {
        toast.error(response.message || 'Failed to save bill');
      }
    } catch (error) {
      toast.error('Error saving bill');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-5xl mx-auto">
      {/* Customer Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-8 py-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">
            {initialData ? 'Edit Invoice' : 'Invoice Details'}
          </h2>
          <p className="text-gray-600 text-sm mt-1">Enter customer and item information</p>
        </div>

        <div className="p-8">
          {/* Customer Name */}
          <div className="mb-8">
            <label className="block text-sm font-bold text-gray-900 mb-3">Customer Name *</label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Enter customer name"
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all bg-white text-gray-900 placeholder-gray-500"
              required
            />
          </div>

          {/* Items Section */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Invoice Items</h3>
                <p className="text-gray-600 text-sm mt-1">Add products and services to this invoice</p>
              </div>
              <button
                type="button"
                onClick={addItem}
                className="flex items-center gap-2 bg-blue-50 text-blue-600 hover:bg-blue-100 px-4 py-2 rounded-lg font-semibold transition-all"
              >
                <FiPlus className="text-lg" />
                Add Item
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b-2 border-gray-200">
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Product/Service</th>
                    <th className="px-6 py-4 text-center text-xs font-bold text-gray-700 uppercase">Quantity</th>
                    <th className="px-6 py-4 text-right text-xs font-bold text-gray-700 uppercase">Unit Price</th>
                    <th className="px-6 py-4 text-right text-xs font-bold text-gray-700 uppercase">Total</th>
                    <th className="px-6 py-4 text-center text-xs font-bold text-gray-700 uppercase">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-blue-50 transition-colors">
                      <td className="px-6 py-4">
                        <input
                          type="text"
                          value={item.productName}
                          onChange={(e) => handleItemChange(index, 'productName', e.target.value)}
                          placeholder="e.g., Web Design Service"
                          className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-sm"
                          required
                        />
                      </td>
                      <td className="px-6 py-4">
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                          placeholder="1"
                          className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-sm text-center"
                          min="1"
                          required
                        />
                      </td>
                      <td className="px-6 py-4">
                        <input
                          type="number"
                          value={item.price}
                          onChange={(e) => handleItemChange(index, 'price', e.target.value)}
                          placeholder="0.00"
                          className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-sm text-right"
                          min="0"
                          step="0.01"
                          required
                        />
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="font-bold text-gray-900 text-sm">
                          {formatCurrency(item.quantity * item.price)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          type="button"
                          onClick={() => removeItem(index)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-all"
                        >
                          <FiTrash2 className="text-lg" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Tax & Notes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-3">Tax Percentage (%)</label>
              <input
                type="number"
                value={taxPercentage}
                onChange={(e) => setTaxPercentage(e.target.value)}
                placeholder="0"
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all bg-white text-gray-900 placeholder-gray-500"
                min="0"
                max="100"
                step="0.01"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-900 mb-3">Notes</label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g., Payment terms, delivery info..."
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all bg-white text-gray-900 placeholder-gray-500"
              />
            </div>
          </div>

          {/* Totals Summary */}
          <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-6 border-2 border-gray-200 mb-8">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-700 font-semibold">Subtotal:</span>
                <span className="text-gray-900 font-bold text-lg">{formatCurrency(subTotal)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700 font-semibold">Tax ({taxPercentage}%):</span>
                <span className="text-gray-900 font-bold text-lg">{formatCurrency(tax)}</span>
              </div>
              <div className="border-t-2 border-gray-300 pt-3 flex justify-between items-center">
                <span className="text-gray-900 font-bold text-lg">Grand Total:</span>
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-lg text-2xl font-black">
                  {formatCurrency(grandTotal)}
                </span>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl hover:shadow-lg transition-all duration-300 font-bold text-lg flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
          >
            {loading ? (
              <>
                <div className="animate-spin">⏳</div>
                Saving...
              </>
            ) : (
              <>
                <FiCheck className="text-2xl" />
                {initialData ? 'Update Invoice' : 'Create Invoice'}
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default BillForm;
