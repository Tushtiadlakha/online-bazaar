const mongoose = require("mongoose");
const validator = require("validator");

const nuser = new mongoose.Schema({
 name:{
  type:String,
  require:true,
 },
 email:{
type:String,
 	require:true,
 	unique:true	
},
 password:{
 type:String,
 require:true

 },
 role:{
 	type:String,
 	default:"coustomer"	
 }
}, { timestamps: true });
const users = new mongoose.model("user",nuser);
module.exports=users;