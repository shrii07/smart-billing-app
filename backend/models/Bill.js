import mongoose from 'mongoose';

const billSchema = new mongoose.Schema(
  {
    billNumber: {
      type: String,
      unique: true,
      sparse: true,
      required: true,
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
    },
    customerName: {
      type: String,
      required: [true, 'Please provide customer name'],
      trim: true,
      maxlength: 100,
    },
    customerEmail: {
      type: String,
      lowercase: true,
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
        },
        productName: {
          type: String,
          required: [true, 'Please provide product name'],
          trim: true,
        },
        quantity: {
          type: Number,
          required: [true, 'Please provide quantity'],
          min: 1,
        },
        price: {
          type: Number,
          required: [true, 'Please provide price'],
          min: 0,
        },
        tax: {
          type: Number,
          default: 0,
          min: 0,
        },
        total: {
          type: Number,
          required: true,
        },
      },
    ],
    subTotal: {
      type: Number,
      required: true,
      default: 0,
    },
    discountPercentage: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    discountAmount: {
      type: Number,
      default: 0,
      min: 0,
    },
    tax: {
      type: Number,
      default: 0,
      min: 0,
    },
    taxPercentage: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    grandTotal: {
      type: Number,
      required: true,
      default: 0,
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'partial', 'paid', 'overdue'],
      default: 'pending',
    },
    paymentMethod: {
      type: String,
      enum: ['cash', 'card', 'check', 'bank_transfer', 'other'],
    },
    amountPaid: {
      type: Number,
      default: 0,
      min: 0,
    },
    dueDate: {
      type: Date,
    },
    status: {
      type: String,
      enum: ['draft', 'finalized', 'paid', 'cancelled'],
      default: 'draft',
    },
    notes: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    paymentHistory: [
      {
        amount: Number,
        date: {
          type: Date,
          default: Date.now,
        },
        method: String,
        reference: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Bill = mongoose.model('Bill', billSchema);

export default Bill;
