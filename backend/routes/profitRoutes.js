const express = require("express");
const router = express.Router();

const {getProfitAnalytics} = require("../controllers/profitController");

const authMiddleware = require("../middleware/authMiddleware");

router.get("/",authMiddleware,getProfitAnalytics);

module.exports = router;