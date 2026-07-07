const messageModel = require('../models/message.model');
const userModel = require('../models/user.model');
const { uploadFiles } = require('../services/storage.services');
const {getReceiverSocketId ,getIo } = require('../socket/socket')
async function sendMessage(req, res){
    try{
    const reciever = req.params.id;
    const sender = req.user.id;
    const recieverUser = await userModel.findById(reciever);
    const senderUser = await userModel.findById(sender);
    
    if(reciever === sender){
        return res.status(400).json({
            message:"You can not send message to yourself"
        })
    }
    if(!recieverUser){
        return res.status(404).json({
            message:"user not found"
        })
    }
    const connected = senderUser.followers.some(userId=> userId.toString() === reciever) && recieverUser.followers.some(userId => userId.toString() === sender);
    if(!connected){
        return res.status(403).json({
            message:"You need to conneect first"
        })
    }
    const {text, replyTo} = req.body;
    const image = req.files?.image?.[0];
    const file = req.files?.file?.[0];
    let result = null;
    if(image){
       result =  await uploadFiles(image.buffer.toString("base64"))
    }
    let fileResult = null
    if(file){
        fileResult=await uploadFiles(file.buffer.toString("base64"))
    }
    if(!text?.trim() && !result && !fileResult){
        return res.status(400).json({
            message:"message cannot be empty"
        })
    }
    const message = await messageModel.create({
        sender : sender,
        reciever : reciever,
        text : text,
        image: result ? result.url : null,
file: fileResult ? fileResult.url : null,
        fileName:file?.originalname,
        replyTo:replyTo
    })
    
    const receiverSocketId = getReceiverSocketId(reciever);

if(receiverSocketId){
    getIo().to(receiverSocketId).emit("newMessage", message);
}
    res.status(201).json({
        message:"Message send",
        messageDetail: {
            sender:message.sender,
            reciever:message.reciever,
            text:message.text,
            image:message.image
            

        }
    })

}catch(error){
    console.log(error)
    return res.status(500).json({
        message:"something went wrong"
    })
}}
async function getMessage(req , res){
    try{
    const sender = req.params.id;
    const reciever = req.user.id;
    const senderUser = await userModel.findById(sender);
    
    if(!senderUser){
        return res.status(404).json({
            message:"User not found"
        })
    }
    const messages = await messageModel.find({
        $or:[
            {
                sender:sender,
                reciever:reciever
            },
            {
                sender:reciever,
                reciever:sender
            }
        ],
        deleteFor:{
            $ne:req.user.id
        }
    }).populate("replyTo" , "text sender").sort({createdAt:1})
    res.status(200).json({
        message:"Messages fetched",
        messages
    })
}catch(error){
    return res.status(500).json({
        message:"Something went wrong"
    })
}}
async function getAllChat(req, res){
    try{
    const user = req.user.id;
    const userChat = await messageModel.find({
        $or:[{sender:user} , {reciever:user}]
    }).sort({createdAt: -1})
    const myset = new Set();
    userChat.forEach(element => {
        if(element.sender.toString() == user){
           myset.add(element.reciever.toString())
        }else{
            myset.add(element.sender.toString())
        }
    });
    
 const chatUsers = [...myset];
 const chat = [];
 
 for( const chatUserId of chatUsers) {
    const friend = await userModel.findById(chatUserId).select("username  profilepic isOnline")
    if(!friend) continue;
    const lastMessage = await messageModel.findOne({
        $or:[
            {
                sender:user,
                reciever:chatUserId
            },
            {
                sender:chatUserId,
                reciever:user
            }
        ]
    }).sort({createdAt:-1})
    chat.push({
        _id:friend._id,
        username:friend.username,
        profilepic:friend.profilepic,
        lastMessage:lastMessage?.text || "",
        createdAt:lastMessage?.createdAt || null,
        isOnline:friend.isOnline
    })
 };
chat.sort(
      (a, b) =>
        new Date(b.createdAt || 0) -
        new Date(a.createdAt || 0)
    );
    

 res.status(200).json({
    message:"chats fetched",
    chat
 })
  
}catch(error){
    return res.status(500).json({
        message:"something went wrong"
    })
}
}
async function seenUnseen(req, res){
    try{
    const id = req.params.id;
    const senderSocketId = getReceiverSocketId(id);
    await messageModel.updateMany({
        sender:id,
        reciever:req.user.id,
        read:false
    },{
        read:true
    })
    getIo().to(senderSocketId).emit('messageseen')
    res.status(200).json({
        message:"seen"
    })
}catch(error){
    console.log(error)
    return res.status(500).json({
        message:"Something went wrong"
    })
}}
async function deleteMessage(req,res){
    try{
    const msgId = req.params.msgId;
    const message = await messageModel.findById(msgId);
    
    if(!message){
        return res.status(404).json({
            message:"Message not found"
        })
    }
    if(req.user.id !== message.sender.toString()){
        return res.status(403).json({
            message:"You can not delete message"
        })
    }
    await message.deleteOne();
    const recieverSocketId = getReceiverSocketId(message.reciever.toString())
    if(recieverSocketId){
    getIo().to(recieverSocketId).emit('deletForEveryone' , msgId)
    }
    return res.status(200).json({
        message:"message deleted"
    })

}catch(error){
    console.log(error);
    return res.status(500).json({
        message:"something  went wrong"
    })
    
}}
async function deleteForMeMessage(req,res){
    try{
    const msgId = req.params.msgId;
    console.log(req.user);
    const msg = await messageModel.findById(msgId);
    if(!msg){
        return res.status(404).json({
            message:"message not found"
        })
    }
    await messageModel.findByIdAndUpdate(msgId , {
        $addToSet:{deleteFor:req.user.id}
    })
    return res.status(200).json({
        message:"deleted"
    })

}catch(error){
    console.log(error);
    return res.status(500).json({
        message:"Something went wrong"
    })
    
}}
async function reactionOnMessage(req,res){
    try{
    const msgId = req.params.msgId;
    const msg = await messageModel.findById(msgId);
    if(!msg){
        return res.status(404).json({
            message:"message not found"
        })
    }
    const {reaction} = req.body;
    if(!reaction){
        return res.status(400).json({
            message:"reaction is required"
        })
    }
    const currentReaction = msg.reactions.find((reaction)=>reaction.user.toString() === req.user.id);
    if(currentReaction){
        if(currentReaction.emoji === reaction){
            msg.reactions.pull(currentReaction)
        }else{
            currentReaction.emoji=reaction
        }
    }else{
        msg.reactions.push({
            user:req.user.id,
            emoji:reaction
        })
    }
    await msg.save()
    const recieverSocketId = getReceiverSocketId(msg.reciever.toString());
    if(recieverSocketId){
        getIo().to(recieverSocketId).emit("reactionUpdated",{
            messageId:msg._id,
            reactions:msg.reactions
        })
    }
    return res.status(200).json({
        message:"reaction",
        reactions:msg.reactions
    })
}catch(error){
    console.log(error);
    return res.status(500).json({
       message:"something went wrong" 
    })

}}
async function getUnreadMessages(req,res){
    try{
        const unreadCount = await messageModel.countDocuments({
            reciever:req.user.id,
            read:false,
        })
        res.status(200).json({
        message:"uread messages count",
        unreadCount:unreadCount
    })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            message:"something went wrong"
        })
    }
    
}
async function getUnreadMessagePerUser(req,res){
    try{
    const unreadMessages = await messageModel.aggregate([
        {
            $match:{
                reciever:new mongoose.Types.ObjectId(req.user.id),
                read:false
            },
        },
        {
            $group:{
                _id:"$sender",
                unreadCount:{$sum:1},
            }
        }
    ])
    return res.status(200).json({
        message:"unread messages per user",
        unreadMessages:unreadMessages
    })
    } catch(error){
        console.log(error);
        return res.status(500).json({
            message:"something went wrong"
        })
    } 
}
module.exports = {sendMessage , getMessage , getAllChat , seenUnseen , deleteMessage,deleteForMeMessage , reactionOnMessage, getUnreadMessages, getUnreadMessagePerUser}