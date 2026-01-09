import express from 'express';
import {
  getDashboardStats,
  getMonthlyReport,
  getPaymentReport,
  getTopCustomersReport,
  getTaxReport,
} from '../controllers/reportController.js';
import { protectRoute } from '../middleware/auth.js';

const router = express.Router();

// All routes require authentication
router.use(protectRoute);

router.get('/stats/dashboard', getDashboardStats);
router.get('/monthly', getMonthlyReport);
router.get('/payment', getPaymentReport);
router.get('/customers/top', getTopCustomersReport);
router.get('/tax', getTaxReport);

export default router;
