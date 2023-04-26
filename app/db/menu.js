const mongoose= require("mongoose");

const ourmenu = new mongoose.Schema({
    title:{
     type:String,
     require:true,
    },
    thumbnail:{
        type:String,
        require:true,       
    },
    price:{
        type:Number,
        require:true,
    },
    category:{
        type:String,
        require:true,
    }
})

const menu = new mongoose.model("menu",ourmenu);
module.exports=menu;