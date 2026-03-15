const express = require("express");
const router = express.Router();

const dashboardController = require("../controllers/dashboardController");

const authMiddleware = require("../middleware/authMiddleware");

// Dashboard stats
router.get("/", authMiddleware, dashboardController.getDashboardStats);

// Top products
router.get("/top-products", authMiddleware, dashboardController.getTopProducts);

// Low stock alerts
router.get("/low-stock", authMiddleware, dashboardController.getLowStock);

module.exports = router;