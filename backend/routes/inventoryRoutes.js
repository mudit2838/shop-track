const express = require("express");
const router = express.Router();

const {getInventory} = require("../controllers/inventoryController");

const authMiddleware = require("../middleware/authMiddleware");


router.get("/:shopId",authMiddleware,getInventory);

module.exports = router;