const mongoose = require("mongoose");

const shopSchema = new mongoose.Schema({

  shopName:{
    type:String,
    required:true,
    trim:true
  },

  owner:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
  },

  address:{
    type:String,
    trim:true
  }

},{
  timestamps:true
});

module.exports = mongoose.model("Shop",shopSchema);