const express = require("express");
const router = express.Router();

const {
  getDashboardStats,
  getTopProducts,
  getLowStock
} = require("../controllers/dashboardController");

const authMiddleware = require("../middleware/authMiddleware");


// Dashboard main stats
router.get("/", authMiddleware, getDashboardStats);


// Top selling products
router.get("/top-products", authMiddleware, getTopProducts);


// Low stock alerts
router.get("/low-stock", authMiddleware, getLowStock);


module.exports = router;