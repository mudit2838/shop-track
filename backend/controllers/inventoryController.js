const Inventory = require("../models/Inventory");
const Purchase = require("../models/Purchase");

exports.getInventory = async (req,res)=>{

try{

const inventory = await Inventory.find({
shopId:req.user.shopId
}).populate("productId","productName category");

const data = await Promise.all(

inventory.map(async(item)=>{

// latest purchase price
const purchase = await Purchase.findOne({
productId:item.productId._id,
shopId:req.user.shopId
}).sort({date:-1});

return{
_id:item._id,
productName:item.productId.productName,
category:item.productId.category,
stock:item.stock,
price: purchase ? purchase.price : 0
};

})

);

res.json(data);

}catch(error){

res.status(500).json({error:error.message});

}

};