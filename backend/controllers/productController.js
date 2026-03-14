const Product = require("../models/Product");


// ADD PRODUCT
exports.addProduct = async (req,res)=>{
    
    try{

        const {shopId,productName,category,price} = req.body;

        const product = await Product.create({
            shopId,
            productName,
            category,
            price
        });

        res.status(201).json({
            message:"Product added successfully",
            product
        });

    }
    catch(error){

        res.status(500).json({error:error.message});

    }

};



// GET PRODUCTS BY SHOP
exports.getProducts = async (req,res)=>{

    try{

        const products = await Product.find({shopId:req.params.shopId});

        res.json(products);

    }
    catch(error){

        res.status(500).json({error:error.message});

    }

};



// DELETE PRODUCT
exports.deleteProduct = async (req,res)=>{

    try{

        await Product.findByIdAndDelete(req.params.id);

        res.json({message:"Product deleted"});

    }
    catch(error){

        res.status(500).json({error:error.message});

    }

};