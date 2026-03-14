const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  shopId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Shop",
    required:true
  },
  productName:{
    type:String,
    required:true
  },
  category:{
    type:String
  },
  price:{
    type:Number
  },
  createdAt:{
    type:Date,
    default:Date.now
  }
});

module.exports = mongoose.model("Product",productSchema);