const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    caption:{
        type:String,
    },
    image:{
        type:String,
        required:true
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    likes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }],
    comments:[
        {
            user:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"user"
            },
            text:{
                type:String,
                required:true
            },
            createdAt:{
                type:Date,
                default:Date.now
            }

        }
    ],
    updatedAt:{
        type:Date,
        default:Date.now
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    dailyPrompt:{
        id:{
            type:String,
            default:null
        },
        text:{
            type:String,
            default:null
        }
    },
    
    
},{timestamps:true})
const postModel = mongoose.model("post",postSchema)
module.exports=postModel