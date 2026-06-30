const postModel = require('../models/post.model');
const userModel = require('../models/user.model')
const {uploadFiles} = require('../services/storage.services')
const { getReceiverSocketId } = require("../socket/socket");
async function updateProfile(req , res){
    try{
    const {bio} = req.body;
    const file = req.file;
    const update = {};
    if(bio){
        update.bio = bio;
    }
    if(file){
        const result = await uploadFiles(file.buffer.toString("base64"))
        update.profilepic = result.url;
    }
     
    const updatedUser= await userModel.findByIdAndUpdate(req.user.id,update , {new:true}).select("-password")
    res.status(200).json({
        message:"profile updated",
        user:updatedUser
    })
    }catch(error){
    console.log(error);
    res.status(500).json({
        message:"something went wrong"
    })
}
}
async function getUserById(req,res){
    const id = req.params.id;
    const getUser = await userModel.findById(id).select("-email -password")
    if(!getUser){
        return res.status(400).json({
            message:"user not found"
        })
    }
    res.status(200).json({
        message:"found user",
        user:getUser
    })
}
async function followSomeone(req,res){
 if(req.user.id == req.params.id){
    return res.status(400).json({
        message:"bad request"
    })
 }
 console.log("USER:", req.user);
console.log("PARAM:", req.params.id);
 const user = await userModel.findById(req.user.id);
 const followedPerson = await userModel.findById(req.params.id)
 if(!user || !followedPerson){
    return res.status(400).json({
        message:"bad request"
    })
 }
 const following = user.following.find(id => id.toString() === req.params.id)
 if(following){
    user.following.pull(req.params.id);
    followedPerson.followers.pull(req.user.id);
    await user.save();
    await followedPerson.save()
    return res.status(200).json({
        message:"unfollowed"
    })
 }
 user.following.push(req.params.id);
 followedPerson.followers.push(req.user.id)
 await user.save()
 await followedPerson.save()
 res.status(200).json({
    message:"followed"
 })
}
async function followersList(req,res){
    try{
    const id = req.params.id;
    const user = await userModel.findById(id).populate("followers","username  profilepic")
    if(!user){
        return res.status(404).json({
            message:"user not found"
        })
    }
    res.status(200).json({
        message:"followers",
        followers:user.followers,
        followersCount:user.followers.length
    })
}catch(error){
    console.log(error)
    return res.status(400).json({
        message:"something went wrong"
    })
}
}
async function followingList(req,res){
    try{
    const id = req.params.id;
    const user = await userModel.findById(id).populate("following" , "username profilepic")
    if(!user){
      return res.status(404).json({
        message:"user not found"
      })
    }
    res.status(200).json({
        message:"following",
        following:user.following,
        followingCount:user.following.length
    })
}catch(error){
    console.log(error)
    res.status(400).json({
        message:"something went wrong"
    })
}
}
async function getUserDetailsById(req,res){
    try{
    const id = req.params.id;
    const user1 = await userModel.findById(id);
    const user2 = await userModel.findById(req.user.id)
    if(!user1){
      return  res.status(404).json({
            message:"user not found"
        })
    }
    const posts = await postModel.countDocuments({author:id})
    const isFollowing = user1.followers.some(
    followerId => followerId.toString() === req.user.id
);
    const isMutualFollower =
  user1.followers.includes(req.user.id) &&
  user2.followers.includes(id);
   const isOnline = !!getReceiverSocketId(req.user.id)
    res.status(200).json({
       message:"user details",
       details:{
        _id:user1._id,
        username:user1.username,
        profilepic:user1.profilepic,
        bio:user1.bio,
        follwersCount:user1.followers.length,
        followingCount:user1.following.length,
        postCount:posts,
        isFollowing,
        isMutualFollower,
        isOnline
       }
    })}catch(error){
        console.log(error);
        return res.status(400).json({
            message:"bad request"
        })
    }

}
async function searchUsers(req, res) {
  try {
    const q = req.query.q;

    const users = await userModel.find({
      username: {
        $regex: q,
        $options: "i",
      },
    }).select("-password -email");;

    res.status(200).json({
      users,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Something went wrong",
    });
  }
}
async function findAllUser(req,res){
    try{
    const users = await userModel.find({
        _id:{$ne:req.user.id}
    }).select("username profilepic bio followers following")
    return res.status(200).json({
        message:"All users fetched",
        users
    })
}catch(error){
    console.log(error)
    return res.status(500).json({
        message:"something went wrong"
    })
}}

module.exports = {updateProfile , getUserById , followSomeone , followersList ,followingList , getUserDetailsById , searchUsers, findAllUser }