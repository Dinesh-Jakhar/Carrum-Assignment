const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
        trim:true,
    },
    lastname:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum: ['driver', 'customer'],
        required: true,
    }
});
module.exports=mongoose.model("User",userSchema);