import Bill from '../models/Bill.js';

// Generate unique bill number
const generateBillNumber = () => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 11);
  return `BILL-${timestamp}-${random}`;
};

// Create a new bill
export const createBill = async (req, res) => {
  try {
    const { customerName, items, taxPercentage, notes } = req.body;

    // Validation
    if (!customerName || !items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide customer name and at least one item',
      });
    }

    // Calculate totals
    let subTotal = 0;
    const processedItems = items.map((item) => {
      const total = item.quantity * item.price;
      subTotal += total;
      return { ...item, total };
    });

    const tax = taxPercentage ? (subTotal * taxPercentage) / 100 : 0;
    const grandTotal = subTotal + tax;

    const bill = new Bill({
      customerName,
      items: processedItems,
      subTotal,
      tax,
      taxPercentage: taxPercentage || 0,
      grandTotal,
      billNumber: generateBillNumber(),
      notes,
    });

    await bill.save();

    res.status(201).json({
      success: true,
      message: 'Bill created successfully',
      data: bill,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all bills
export const getBills = async (req, res) => {
  try {
    const bills = await Bill.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: bills.length,
      data: bills,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get single bill
export const getBillById = async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.id);

    if (!bill) {
      return res.status(404).json({
        success: false,
        message: 'Bill not found',
      });
    }

    res.status(200).json({
      success: true,
      data: bill,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update bill
export const updateBill = async (req, res) => {
  try {
    const { customerName, items, taxPercentage, notes } = req.body;

    let subTotal = 0;
    const processedItems = items.map((item) => {
      const total = item.quantity * item.price;
      subTotal += total;
      return { ...item, total };
    });

    const tax = taxPercentage ? (subTotal * taxPercentage) / 100 : 0;
    const grandTotal = subTotal + tax;

    const bill = await Bill.findByIdAndUpdate(
      req.params.id,
      {
        customerName,
        items: processedItems,
        subTotal,
        tax,
        taxPercentage: taxPercentage || 0,
        grandTotal,
        notes,
      },
      { new: true, runValidators: true }
    );

    if (!bill) {
      return res.status(404).json({
        success: false,
        message: 'Bill not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Bill updated successfully',
      data: bill,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete bill
export const deleteBill = async (req, res) => {
  try {
    const bill = await Bill.findByIdAndDelete(req.params.id);

    if (!bill) {
      return res.status(404).json({
        success: false,
        message: 'Bill not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Bill deleted successfully',
      data: bill,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
