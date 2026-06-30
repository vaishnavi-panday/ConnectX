const express = require('express');
const router = express.Router();
const postController = require('../controllers/post.controllers')
const authMiddleware = require('../middleware/auth.middleware')
const multer = require('multer')
const upload = multer({
    storage:multer.memoryStorage()
});
router.post('/create',authMiddleware.authUser,upload.single("image"),postController.createPost)
router.get('/getpost' , authMiddleware.authUser , postController.getAllPosts)
router.get('/:id/getpost',authMiddleware.authUser,postController.getPostById)
router.delete('/:id/delete', authMiddleware.authUser , postController.deletePost)
router.patch('/:id/likes',authMiddleware.authUser,postController.likeDislikePost)
router.post('/:id/comment' , authMiddleware.authUser, postController.commentOnPost)
router.get('/:id/post', authMiddleware.authUser , postController.getAllComments)
router.delete('/:postId/comment/:commentId' , authMiddleware.authUser,postController.deleteComment)
router.get('/:id/user',authMiddleware.authUser , postController.getUsersPosts)
router.get('/feed' , authMiddleware.authUser , postController.feed)
router.put('/:id/post' , authMiddleware.authUser, postController.editPost)
router.delete('/:id/post' , authMiddleware.authUser , postController.deletePost)
module.exports=router;