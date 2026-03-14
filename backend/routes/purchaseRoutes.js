const express = require("express");
const router = express.Router();

const {addPurchase} = require("../controllers/purchaseController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/",authMiddleware,addPurchase);

module.exports = router;