const Purchase = require("../models/Purchase");
const Inventory = require("../models/Inventory");

// ADD PURCHASE
exports.addPurchase = async (req,res)=>{

    try{

        const {shopId,productId,quantity,price} = req.body;

        const purchase = await Purchase.create({
            shopId,
            productId,
            quantity,
            price
        });

        // inventory update
        let inventory = await Inventory.findOne({shopId,productId});

        if(!inventory){

            inventory = await Inventory.create({
                shopId,
                productId,
                stock:quantity
            });

        }else{

            inventory.stock += quantity;
            await inventory.save();

        }

        res.status(201).json({
            message:"Purchase added",
            purchase,
            inventory
        });

    }
    catch(error){

        res.status(500).json({error:error.message});

    }

};