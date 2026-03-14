const express = require("express");
const router = express.Router();

const {
  createShop,
  getShops,
  deleteShop
} = require("../controllers/shopController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, createShop);

router.get("/", authMiddleware, getShops);

router.delete("/:id", authMiddleware, deleteShop);

module.exports = router;