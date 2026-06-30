const userModel = require('../models/user.model.js')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { uploadFiles } = require('../services/storage.services.js');

async function registerUser(req,res){
    const {username , email , password} = req.body; 
    // destructure data as req.body me data object form me aata hai 
    const file = req.file;
    const isUserAlreadyPresent = await userModel.findOne({
        $or:[{username} , {email}]
    })
    
    if(isUserAlreadyPresent){
       return res.status(409).json({
            message:"username or email is already registered"
        })
    }
    const hash= await bcrypt.hash(password , 10);
   
    let profilepic = "";
    if(file){
       const result = await uploadFiles(file.buffer.toString("base64"));
       profilepic=result.url;
    }
    const user = await  userModel.create({
        username,
        email,
        password:hash,
        profilepic

    })
    const token = jwt.sign({
        id:user._id
    },process.env.JWT_SECRET_KEY,{expiresIn:'7d'})
    console.log("new user" , user.username);
    console.log("new id" , user._id)
    res.cookie("token", token ,  {httpOnly: true,
  secure: true,
  sameSite: "none"});
    res.status(201).json({
        message:"user registered successfully",
        user:{
            id:user._id,
            username : user.username,
            email:user.email,
            profilepic:user.profilepic
            
        }
    })
    
}
async function loginUser(req,res){
    const {username , email , password} = req.body;

    
    
    
    const user = await userModel.findOne({
        $or:[{username} , {email}]
    })
    
    if(!user){
        return res.status(401).json({
            message:"please enter correct username or email"
        })
    }
    const isPasswordCorrrect = await bcrypt.compare(password , user.password);
    if(!isPasswordCorrrect){
         return res.status(409).json({
            message:"invalid password"
         })
    }
    const token = jwt.sign({
        id:user._id
    },process.env.JWT_SECRET_KEY,{expiresIn:'7d'})
    res.cookie("token",token , {httpOnly: true,
  secure: true,
  sameSite: "none"})
    res.status(200).json({
        message:"logged in successfully",
        
    })
}
async function getDetails(req,res){
    
        const details = await userModel.findOne({
            _id:req.user.id
        })
     
        

        res.status(200).json({
          message:"detailed fetched",
          details:{
            id:details._id,
            username:details.username,
            email:details.email,
            profilepic:details.profilepic,
            bio:details.bio,
            followers:details.followers.length,
            following:details.following.length,
            followerList:details.followers,
            followingList:details.following

            
          }
        })
}
async function logoutUser(req,res){
    res.clearCookie("token");
    res.status(200).json({
        message:"logged out successfully"
    })
}
module.exports={registerUser , loginUser ,getDetails , logoutUser}