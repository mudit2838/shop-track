const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({

  shopId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",   // shop account
    required:true
  },

  productId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Product",
    required:true
  },

  stock:{
    type:Number,
    default:0
  }

},{timestamps:true});

module.exports = mongoose.model("Inventory",inventorySchema);