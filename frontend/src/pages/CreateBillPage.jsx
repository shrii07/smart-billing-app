import React from 'react'
import BillForm from '../components/BillForm'

const CreateBillPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-black text-gray-900 mb-2">Create Invoice</h1>
          <p className="text-gray-600 text-lg">Enter customer details and items to create a new invoice</p>
        </div>

        {/* Form Container */}
        <BillForm />
      </div>
    </div>
  );
};

export default CreateBillPage;
