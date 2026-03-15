const Sale = require("../models/Sale");
const Inventory = require("../models/Inventory");

exports.addSale = async (req, res) => {

try {

const { productId, quantity, price } = req.body;

const qty = Number(quantity);
const sellPrice = Number(price);

if (!productId || !qty || !sellPrice) {
return res.status(400).json({
message: "All fields required"
});
}

// find inventory
const item = await Inventory.findOne({
productId,
shopId: req.user.shopId
});

if (!item) {
return res.status(400).json({
message: "Product not found in inventory"
});
}

if (item.stock < qty) {
return res.status(400).json({
message: "Not enough stock"
});
}

// decrease stock
item.stock -= qty;
await item.save();

// create sale
await Sale.create({
productId,
quantity: qty,
price: sellPrice,
shopId: req.user.shopId
});

res.json({
message: "Sale recorded successfully"
});

} catch (error) {

res.status(500).json({
error: error.message
});

}

};