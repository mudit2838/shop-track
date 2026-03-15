const Product = require("../models/Product");
const Sale = require("../models/Sale");
const Purchase = require("../models/Purchase");
const Inventory = require("../models/Inventory");

// Dashboard stats
exports.getDashboardStats = async (req, res) => {

try {

const totalProducts = await Product.countDocuments({
shopId: req.user.shopId
});

const sales = await Sale.find({
shopId: req.user.shopId
});

const purchases = await Purchase.find({
shopId: req.user.shopId
});

const inventory = await Inventory.find({
shopId: req.user.shopId
});

let totalSales = 0;
let totalPurchase = 0;
let totalStock = 0;

sales.forEach(s => {
totalSales += s.price * s.quantity;
});

purchases.forEach(p => {
totalPurchase += p.price * p.quantity;
});

inventory.forEach(i => {
totalStock += i.stock;
});

const profit = totalSales - totalPurchase;

res.json({
totalProducts,
totalStock,
totalSales,
totalPurchase,
profit
});

} catch (error) {

res.status(500).json({ error: error.message });

}

};


// Top selling products
exports.getTopProducts = async (req, res) => {

try {

const data = await Sale.aggregate([
{
$match: {
shopId: req.user.shopId
}
},
{
$group: {
_id: "$productId",
totalSold: { $sum: "$quantity" }
}
},
{
$sort: { totalSold: -1 }
},
{
$limit: 5
}
]);

res.json(data);

} catch (error) {

res.status(500).json({ error: error.message });

}

};


// Low stock
exports.getLowStock = async (req, res) => {

try {

const data = await Inventory.find({
shopId: req.user.shopId,
stock: { $lt: 5 }
}).populate("productId");

res.json(data);

} catch (error) {

res.status(500).json({ error: error.message });

}

};