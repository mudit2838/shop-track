const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema({

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

  quantity:{
    type:Number,
    required:true,
    min:1
  },

  price:{
    type:Number
  },

  date:{
    type:Date,
    default:Date.now
  }

},{timestamps:true});

module.exports = mongoose.model("Sale",saleSchema);