const Sale = require("../models/Sale");
const Inventory = require("../models/Inventory");

exports.addSale = async (req,res)=>{

    try{

        const {shopId,productId,quantity,price} = req.body;

        const inventory = await Inventory.findOne({shopId,productId});

        if(!inventory || inventory.stock < quantity){

            return res.status(400).json({
                message:"Not enough stock"
            });

        }

        const sale = await Sale.create({
            shopId,
            productId,
            quantity,
            price
        });

        inventory.stock -= quantity;

        await inventory.save();

        res.json({
            message:"Sale recorded",
            sale,
            inventory
        });

    }
    catch(error){

        res.status(500).json({error:error.message});

    }

};