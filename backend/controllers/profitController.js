const Sale = require("../models/Sale");
const Purchase = require("../models/Purchase");

exports.getProfitAnalytics = async (req,res)=>{

try{

const sales = await Sale.find({ shopId:req.user.shopId });

const purchases = await Purchase.find({ shopId:req.user.shopId });

let totalProfit = 0;
let dailyProfit = 0;
let weeklyProfit = 0;
let monthlyProfit = 0;

const today = new Date();
today.setHours(0,0,0,0);

const weekStart = new Date();
weekStart.setDate(today.getDate()-7);

const monthStart = new Date();
monthStart.setDate(today.getDate()-30);

sales.forEach(sale=>{

// find purchase record for same product
const purchase = purchases.find(p =>
p.productId.toString() === sale.productId.toString()
);

if(!purchase) return;

const costPrice = purchase.price;
const sellPrice = sale.price;

let profitPerItem = sellPrice - costPrice;

// never allow negative profit
if(profitPerItem < 0) profitPerItem = 0;

const profit = profitPerItem * sale.quantity;

totalProfit += profit;

const saleDate = new Date(sale.date);

if(saleDate >= today){
dailyProfit += profit;
}

if(saleDate >= weekStart){
weeklyProfit += profit;
}

if(saleDate >= monthStart){
monthlyProfit += profit;
}

});

res.json({
totalProfit,
dailyProfit,
weeklyProfit,
monthlyProfit
});

}catch(err){

res.status(500).json({error:err.message});

}

};