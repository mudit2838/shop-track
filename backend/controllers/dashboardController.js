const Shop = require("../models/Shop");
const Product = require("../models/Product");
const Inventory = require("../models/Inventory");
const Sale = require("../models/Sale");


// Dashboard Stats
exports.getDashboardStats = async (req,res)=>{

try{

const totalShops = await Shop.countDocuments();

const totalProducts = await Product.countDocuments();

const totalSales = await Sale.countDocuments();

const inventory = await Inventory.find();

let totalStock = 0;

inventory.forEach(item=>{
totalStock += item.stock;
});

res.json({
totalShops,
totalProducts,
totalSales,
totalStock
});

}
catch(error){

res.status(500).json({error:error.message});

}

};




// Top Selling Products
exports.getTopProducts = async(req,res)=>{

try{

const data = await Sale.aggregate([

{
$group:{
_id:"$productId",
totalSold:{ $sum:"$quantity" }
}
},

{
$sort:{ totalSold:-1 }
},

{
$limit:5
},

{
$lookup:{
from:"products",
localField:"_id",
foreignField:"_id",
as:"product"
}
},

{
$unwind:"$product"
}

]);

res.json(data);

}
catch(err){

res.status(500).json({error:err.message});

}

};




// Low Stock Alerts
exports.getLowStock = async(req,res)=>{

try{

const data = await Inventory.find({
stock:{ $lt:5 }
}).populate("productId");

res.json(data);

}
catch(err){

res.status(500).json({error:err.message});

}

};