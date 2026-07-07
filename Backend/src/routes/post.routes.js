const express = require('express');
const router = express.Router();
const postController = require('../controllers/post.controllers')
const authMiddleware = require('../middleware/auth.middleware')
const validationMiddleware = require('../middleware/validation.middleware');
const multer = require('multer')
const upload = multer({
    storage:multer.memoryStorage()
});
router.post('/create',authMiddleware.authUser,upload.single("image"),validationMiddleware.validatePostCreation,validationMiddleware.validateImageUpload("image" , true),postController.createPost)
router.get('/getpost' , authMiddleware.authUser , postController.getAllPosts)
router.get('/:id/getpost',authMiddleware.authUser,validationMiddleware.validateIdParam, postController.getPostById)
router.delete('/:id/delete', authMiddleware.authUser, validationMiddleware.validateIdParam, postController.deletePost)
router.patch('/:id/likes',authMiddleware.authUser,validationMiddleware.validateIdParam, postController.likeDislikePost)
router.post('/:id/comment' , authMiddleware.authUser, validationMiddleware.validateIdParam, postController.commentOnPost)
router.get('/:id/post', authMiddleware.authUser , validationMiddleware.validateIdParam, postController.getAllComments)
router.delete('/:postId/comment/:commentId' , authMiddleware.authUser,validationMiddleware.validateCommentIdAndPostIdParam, postController.deleteComment)
router.get('/:id/user',authMiddleware.authUser , validationMiddleware.validateIdParam, postController.getUsersPosts)
router.get('/feed' , authMiddleware.authUser , postController.feed)
router.put('/:id/post' , authMiddleware.authUser, validationMiddleware.validateIdParam, postController.editPost)
router.delete('/:id/post' , authMiddleware.authUser , validationMiddleware.validateIdParam, postController.deletePost)
router.get('/daily-prompt' , authMiddleware.authUser , postController.getTodayDailyPrompt)
module.exports=router;