const Purchase = require("../models/Purchase");
const Inventory = require("../models/Inventory");

// ADD PURCHASE
exports.addPurchase = async (req, res) => {

try {

const { productId, quantity, price } = req.body;

const qty = Number(quantity);
const costPrice = Number(price);

// create purchase record
await Purchase.create({
productId,
quantity: qty,
price: costPrice,
shopId: req.user.shopId
});

// check inventory
let item = await Inventory.findOne({
productId,
shopId: req.user.shopId
});

if (item) {

item.stock += qty;
await item.save();

} else {

await Inventory.create({
productId,
shopId: req.user.shopId,
stock: qty
});

}

res.json({
message: "Purchase added successfully"
});

} catch (error) {

res.status(500).json({
error: error.message
});

}

};