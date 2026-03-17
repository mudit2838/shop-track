const Product = require("../models/Product");


// ADD PRODUCT
exports.addProduct = async (req,res)=>{

try{

const {productName,category} = req.body;

const product = await Product.create({

productName,
category,
shopId:req.user.shopId

});

res.json(product);

}catch(err){

res.status(500).json({error:err.message});

}

};


// GET PRODUCTS (with search support)
exports.getProducts = async (req,res)=>{

try{

const search = req.query.search || "";

const products = await Product.find({
shopId:req.user.shopId,
productName: { $regex: search, $options: "i" }
});

res.json(products);

}catch(err){

res.status(500).json({error:err.message});

}

};



// DELETE PRODUCT
exports.deleteProduct = async (req,res)=>{

try{

await Product.findByIdAndDelete(req.params.id);

res.json({message:"Product deleted"});

}catch(err){

res.status(500).json({error:err.message});

}

};