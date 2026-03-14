const express = require("express");
const router = express.Router();

const {addSale} = require("../controllers/salesController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/",authMiddleware,addSale);

module.exports = router;