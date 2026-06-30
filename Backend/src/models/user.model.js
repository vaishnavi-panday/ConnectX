const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    profilepic:{
        type:String
    },
    bio:{
        type:String
    },
    followers:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
        }],
    following:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }],
    
})
const userModel = mongoose.model("user",userSchema);
module.exports = userModel;