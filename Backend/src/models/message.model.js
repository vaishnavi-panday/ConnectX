const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    reciever:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    text:{
        type:String,
    },
    image:{
        type:String,
    },
    seen:{
        type:Boolean,
        default:false
    },
    deleteFor:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }],
    replyTo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"message",
        default:null
    },
    reactions:[{
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'user'
        },
        emoji:{
            type:String
        }
    }],
    read: {
      type: Boolean,
      default: false,
    },
    file:{
        type:String,
        default:""
    },
    fileName:{
        type:String,
        default:""
    },
    fileType:{
        type:String,
        default:""
    }
    
} , {timestamps:true})

const messageModel = mongoose.model('message' , messageSchema)

module.exports = messageModel