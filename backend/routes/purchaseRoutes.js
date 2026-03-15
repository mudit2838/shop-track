const express = require("express");
const router = express.Router();

const purchaseController = require("../controllers/purchaseController");
const authMiddleware = require("../middleware/authMiddleware");


// all purchase routes require login
router.use(authMiddleware);


// add purchase
router.post("/", purchaseController.addPurchase);

module.exports = router;