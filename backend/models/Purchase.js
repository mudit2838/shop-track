const mongoose = require("mongoose");

const purchaseSchema = new mongoose.Schema({
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
  quantity:{
    type:Number,
    required:true
  },
  price:{
    type:Number
  },
  date:{
    type:Date,
    default:Date.now
  }
});

module.exports = mongoose.model("Purchase",purchaseSchema);