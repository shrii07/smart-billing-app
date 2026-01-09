import Bill from '../models/Bill.js';
import Customer from '../models/Customer.js';

// Get Dashboard Statistics
export const getDashboardStats = async (req, res) => {
  try {
    const bills = await Bill.find({ createdBy: req.user.id });

    const totalBills = bills.length;
    const totalRevenue = bills.reduce((sum, bill) => sum + bill.grandTotal, 0);
    const totalTax = bills.reduce((sum, bill) => sum + bill.tax, 0);
    const totalPaid = bills.reduce((sum, bill) => sum + bill.amountPaid, 0);
    const totalPending = totalRevenue - totalPaid;
    const averageValue =
      totalBills > 0 ? totalRevenue / totalBills : 0;

    // Count by status
    const statusCounts = {
      pending: bills.filter((b) => b.paymentStatus === 'pending').length,
      partial: bills.filter((b) => b.paymentStatus === 'partial').length,
      paid: bills.filter((b) => b.paymentStatus === 'paid').length,
      overdue: bills.filter((b) => b.paymentStatus === 'overdue').length,
    };

    const totalCustomers = await Customer.countDocuments({
      createdBy: req.user.id,
    });

    res.status(200).json({
      success: true,
      data: {
        totalBills,
        totalRevenue,
        totalTax,
        totalPaid,
        totalPending,
        averageValue,
        totalCustomers,
        statusCounts,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Monthly Revenue Report
export const getMonthlyReport = async (req, res) => {
  try {
    const { year } = req.query;
    const currentYear = year ? parseInt(year) : new Date().getFullYear();

    const bills = await Bill.find({
      createdBy: req.user.id,
      createdAt: {
        $gte: new Date(`${currentYear}-01-01`),
        $lte: new Date(`${currentYear}-12-31`),
      },
    });

    const monthlyData = Array(12)
      .fill(null)
      .map((_, i) => ({
        month: new Date(2024, i).toLocaleString('default', {
          month: 'long',
        }),
        revenue: 0,
        tax: 0,
        bills: 0,
      }));

    bills.forEach((bill) => {
      const month = new Date(bill.createdAt).getMonth();
      monthlyData[month].revenue += bill.grandTotal;
      monthlyData[month].tax += bill.tax;
      monthlyData[month].bills += 1;
    });

    res.status(200).json({
      success: true,
      year: currentYear,
      data: monthlyData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Payment Status Report
export const getPaymentReport = async (req, res) => {
  try {
    const bills = await Bill.find({ createdBy: req.user.id });

    const report = {
      totalBills: bills.length,
      paid: {
        count: bills.filter((b) => b.paymentStatus === 'paid').length,
        amount: bills
          .filter((b) => b.paymentStatus === 'paid')
          .reduce((sum, b) => sum + b.grandTotal, 0),
      },
      pending: {
        count: bills.filter((b) => b.paymentStatus === 'pending').length,
        amount: bills
          .filter((b) => b.paymentStatus === 'pending')
          .reduce((sum, b) => sum + b.grandTotal, 0),
      },
      partial: {
        count: bills.filter((b) => b.paymentStatus === 'partial').length,
        amount: bills
          .filter((b) => b.paymentStatus === 'partial')
          .reduce((sum, b) => sum + (b.grandTotal - b.amountPaid), 0),
      },
      overdue: {
        count: bills.filter((b) => b.paymentStatus === 'overdue').length,
        amount: bills
          .filter((b) => b.paymentStatus === 'overdue')
          .reduce((sum, b) => sum + (b.grandTotal - b.amountPaid), 0),
      },
    };

    res.status(200).json({
      success: true,
      data: report,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Top Customers Report
export const getTopCustomersReport = async (req, res) => {
  try {
    const bills = await Bill.find({ createdBy: req.user.id }).sort({
      createdAt: -1,
    });

    const customerStats = {};

    bills.forEach((bill) => {
      if (!customerStats[bill.customerName]) {
        customerStats[bill.customerName] = {
          name: bill.customerName,
          email: bill.customerEmail,
          totalBills: 0,
          totalAmount: 0,
          totalPaid: 0,
        };
      }

      customerStats[bill.customerName].totalBills += 1;
      customerStats[bill.customerName].totalAmount += bill.grandTotal;
      customerStats[bill.customerName].totalPaid += bill.amountPaid;
    });

    const topCustomers = Object.values(customerStats)
      .sort((a, b) => b.totalAmount - a.totalAmount)
      .slice(0, 10);

    res.status(200).json({
      success: true,
      count: topCustomers.length,
      data: topCustomers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Tax Report
export const getTaxReport = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    let query = { createdBy: req.user.id };

    if (startDate && endDate) {
      query.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const bills = await Bill.find(query);

    const totalTax = bills.reduce((sum, bill) => sum + bill.tax, 0);
    const totalRevenue = bills.reduce((sum, bill) => sum + bill.grandTotal, 0);
    const taxableAmount = totalRevenue - totalTax;

    const taxByPercentage = {};
    bills.forEach((bill) => {
      const percentage = bill.taxPercentage;
      if (!taxByPercentage[percentage]) {
        taxByPercentage[percentage] = {
          percentage,
          taxableAmount: 0,
          taxAmount: 0,
        };
      }
      taxByPercentage[percentage].taxableAmount += bill.subTotal;
      taxByPercentage[percentage].taxAmount += bill.tax;
    });

    res.status(200).json({
      success: true,
      data: {
        totalRevenue,
        taxableAmount,
        totalTax,
        byPercentage: Object.values(taxByPercentage),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
