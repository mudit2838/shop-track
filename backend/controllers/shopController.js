const Shop = require("../models/Shop");

// CREATE SHOP
exports.createShop = async (req, res) => {
  try {

    const { shopName, address } = req.body;

    const shop = await Shop.create({
      shopName,
      address,
      owner: req.user.id
    });

    res.status(201).json({
      message: "Shop created successfully",
      shop
    });

  } catch (error) {

    res.status(500).json({ error: error.message });

  }
};


// GET USER SHOPS
exports.getShops = async (req, res) => {

  try {

    const shops = await Shop.find({ owner: req.user.id });

    res.json(shops);

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};


// DELETE SHOP
exports.deleteShop = async (req, res) => {

  try {

    const shop = await Shop.findById(req.params.id);

    if (!shop) {
      return res.status(404).json({ message: "Shop not found" });
    }

    if (shop.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await shop.deleteOne();

    res.json({ message: "Shop deleted successfully" });

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};