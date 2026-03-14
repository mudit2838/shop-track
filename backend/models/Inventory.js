const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
  shopId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Shop",
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
});

module.exports = mongoose.model("Inventory",inventorySchema);