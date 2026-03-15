const express = require("express");
const router = express.Router();

const { getInventory } = require("../controllers/inventoryController");
const authMiddleware = require("../middleware/authMiddleware");


// GET INVENTORY OF LOGGED SHOP
router.get("/", authMiddleware, getInventory);

module.exports = router;