const Inventory = require("../models/Inventory");
const Product = require("../models/Product");


// GET INVENTORY BY SHOP
exports.getInventory = async (req,res)=>{

    try{

        const {shopId} = req.params;

        const inventory = await Inventory.find({shopId})
        .populate("productId","productName category price");

        res.json(inventory);

    }
    catch(error){

        res.status(500).json({error:error.message});

    }

};