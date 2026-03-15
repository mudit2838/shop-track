const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// REGISTER SHOP
exports.register = async(req,res)=>{

try{

const {shopName,email,password} = req.body;

if(!shopName || !email || !password){
return res.status(400).json({
message:"All fields are required"
});
}

// check if email already exists
const existingUser = await User.findOne({email});

if(existingUser){
return res.status(400).json({
message:"Email already registered"
});
}

// hash password
const hashedPassword = await bcrypt.hash(password,10);

// create user
const user = await User.create({
shopName,
email,
password:hashedPassword
});

res.status(201).json({
message:"Shop registered successfully"
});

}catch(err){

res.status(500).json({error:err.message});

}

};




// LOGIN SHOP
exports.login = async(req,res)=>{

try{

const {email,password} = req.body;

if(!email || !password){
return res.status(400).json({
message:"Email and password required"
});
}

// find user
const user = await User.findOne({email});

if(!user){
return res.status(400).json({
message:"User not found"
});
}

// compare password
const isMatch = await bcrypt.compare(password,user.password);

if(!isMatch){
return res.status(400).json({
message:"Invalid password"
});
}

// generate token
const token = jwt.sign(
{
userId:user._id,
shopId:user._id,
shopName:user.shopName
},
process.env.JWT_SECRET,
{expiresIn:"7d"}
);

res.json({
token,
shopName:user.shopName
});

}catch(err){

res.status(500).json({error:err.message});

}

};




// GET CURRENT SHOP INFO
exports.getMe = async(req,res)=>{

try{

res.json({
shopId:req.user.shopId,
shopName:req.user.shopName
});

}catch(err){

res.status(500).json({error:err.message});

}

};