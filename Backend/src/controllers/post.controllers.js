const postModel = require('../models/post.model');
const userModel = require('../models/user.model')
const {uploadFiles} = require('../services/storage.services')
const {getTodayPrompt} = require('../data/dailyPrompts')
async function createPost(req,res){
    const {caption, dailyPromptId, dailyPromptText} = req.body;
    const file = req.file;
    if(!file){
       return  res.status(400).json({
            message:"please upload image"
        })
    }
    const result = await uploadFiles(file.buffer.toString("base64"))
    const post = await postModel.create({
       caption,
       image:result.url,
       author:req.user.id,
       dailyPrompt:dailyPromptId && dailyPromptText ? {id:dailyPromptId , text:dailyPromptText} : null
    })
   
    res.status(201).json({
        message:"post created successfully",
        post:{
            caption:post.caption,
            image:post.image,
            author:post.author
        }
    })
}
async function getAllPosts(req,res){
    const posts = await postModel.find().sort({createdAt:-1}).populate("author" ,"-email -password")
    res.status(200).json({
        message:"posts fetched successfully",
        posts:posts,
    
    })
}
async function getPostById(req,res){
    try{
    const id = req.params.id;
    const post = await postModel.findById(id).populate("author" , "-email -password");
    if(!post){
        return res.status(404).json({
            message:"post not found"
        })
    }
    res.status(200).json({
        message:"post fetched successfully",
        post
    })
}catch(error){
    console.log(error)
    res.status(400).json({
        message:"error"
    })
}
}
async function deletePost(req,res){
    try{
    const id = req.params.id;
    const post = await postModel.findById(id);
    if(!post){
       return res.status(404).json({
            message:"post not found"
        })
    }
    if(post.author.toString() !== req.user.id){
       return  res.status(403).json({
            message:"you are not authorized to  delete the post"
        })
    }
    await post.deleteOne();
    res.status(200).json({
        message:"post deleted successsfully"
    })
}catch(error){
    console.log(error)
    res.status(400).json({
        message:"something went wrong"
    })
}}
async function likeDislikePost(req,res){
    const postId = req.params.id;
    const userId = req.user.id
    const post = await postModel.findById(postId);
    
    if(!post){
        return res.status(404).json({
            message:"post not found"
        })
    }
    const isUserAlreadyLiked = post.likes.includes(userId)
    if(isUserAlreadyLiked){
        post.likes.pull(userId)
        await post.save();
        return res.status(200).json({
            message:"unliked post",
            likesCount:post.likes.length
        })
    }
    post.likes.push(userId);
    await post.save();
    return res.status(200).json({
        message:"liked post",
        likesCount:post.likes.length
    })
}
async function commentOnPost(req, res){
    const postId = req.params.id;
    const post = await postModel.findById(postId);
    if(!post){
        return res.status(404).json({
            message:"post not found"
        })
    }
    const {text} = req.body;
    if(!text){
        return res.status(400).json({
            message:"add text"
        })
    }
    const comment =  {
        user:req.user.id,
        text:text
    }
    post.comments.push(comment);
    await post.save();
    res.status(200).json({
        message:"comment added",
        commentsNumber : post.comments.length
    })

}
async function deleteComment(req, res){
    const commentId = req.params.commentId;
    const postId = req.params.postId;
    const post = await postModel.findById(postId)
    if(!post){
        return res.status(404).json({
            message:"post not found"
        })
    }
    const Comment = post.comments.find(comment=> comment._id.toString() === commentId)
    if(!Comment){
        return res.status(404).json({
            message:"comment not found"
        })
    }
    if(req.user.id !== Comment.user.toString() ){
        return res.status(403).json({
            message:"unauthorized"
        })
    }
    post.comments.pull(Comment)
    await post.save();
    res.status(200).json({
        message:"comment deleted successfully"
    })
}
async function getAllComments(req,res){
    const id = req.params.id;
    const post = await postModel.findById(id);
    if(!post){
        return res.status(404).json({
            message:"post not found"
        })
    }
    res.status(200).json({
        message:"Comments are fetched",
        comments:post.comments,
        commentsCount:post.comments.length
})
}
async function getUsersPosts(req,res){
    try{
    const id = req.params.id;
    const user = await userModel.findById(id);
    if(!user){
        return res.status(404).json({
             message:"user not found"
        })
    }
    const posts = await postModel.find({author:id}).sort({createdAt:-1})
    res.status(200).json({
        message:"posts fetched successfully",
        posts:posts,
        postCount:posts.length
    })
}catch(error){
    console.log(error)
    res.status(400).json({
        message:"something wwent wrong"
    })
}
}
async function feed(req,res){
    try{
    const id = req.user.id 
    const user = await userModel.findById(id);
    if(!user){
        return res.status(404).json({
            message:"user not found"
        })
    }
    const posts = await postModel.find({author:{$in:[...user.following || [] , user._id]}}).sort({createdAt:-1}).populate("author" , "-password -email")
    res.status(200).json({
        message:"feed",
        feedPostCount:posts.length,
        feed:posts
    })
}catch(error){
    console.log(error)
    res.status(400).json({
        message:"something went wrong"
    })
}

}
async function editPost(req,res){
    try{
    const id = req.params.id;
    const post = await postModel.findById(id);
    if(!post){
        return res.status(404).json({
            message:"post does not exist"
        })
    }
    if(post.author.toString() !== req.user.id){
        return res.status(403).json({
            message:"You cannot edit someone else's post"
        })
    }
    const {caption} = req.body;
    if(caption){
        post.caption=caption;
       await post.save();
    }
    res.status(200).json({
        message:"edited post",
        updatedPost:post 
    })}catch(error){
        console.log(error)
        return res.status(400).json({
            message:"something went wrong"
        })
    }
}
async function deletePost(req,res){
    try{
    const id = req.params.id;
    const post = await postModel.findById(id);
    if(!post){
       return res.status(404).json({
            message:"Post does not exist"
        })
    }
    if(post.author.toString() != req.user.id){
        return res.status(403).json({
            message:"unauthorized"
        })
    }
    await post.deleteOne();
    res.status(200).json({
        message:"post deleted successfully"
    })}catch(error){
        console.log(error);
        res.status(500).json(
            {
              message:"something went wrong"  
            }
        )
        
    }

}
async function getTodayDailyPrompt(req,res){
    const prompt = getTodayPrompt();
    return res.status(200).json({
        message:"daily prompt",
        prompt
    })
}
module.exports={createPost , getAllPosts , getPostById, deletePost , likeDislikePost , commentOnPost ,getAllComments, deleteComment , getUsersPosts , feed , editPost , deletePost, getTodayDailyPrompt}