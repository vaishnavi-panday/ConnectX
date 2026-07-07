const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware')
const userController = require('../controllers/user.controller')
const validationMiddleware = require('../middleware/validation.middleware');
const multer = require('multer')
const upload = multer({
    storage:multer.memoryStorage()
});
router.put('/updateprofile/:id',authMiddleware.authUser,upload.single("profilepic"),validationMiddleware.validateIdParam, validationMiddleware.validateEditProfile, validationMiddleware.validateImageUpload("profilepic", false), userController.updateProfile )
router.get('/user/:id' , authMiddleware.authUser,validationMiddleware.validateIdParam , userController.getUserById);
router.post('/:id/user', authMiddleware.authUser , validationMiddleware.validateIdParam, userController.followSomeone )
router.get('/:id/followers' , authMiddleware.authUser , validationMiddleware.validateIdParam, userController.followersList)
router.get('/:id/following' , authMiddleware.authUser , validationMiddleware.validateIdParam, userController.followingList)
router.get('/:id/user' , authMiddleware.authUser , validationMiddleware.validateIdParam,  userController.getUserDetailsById)
router.get('/search' , authMiddleware.authUser ,validationMiddleware.validateSearchQuery, userController.searchUsers)
router.get('/all' , authMiddleware.authUser, userController.findAllUser)
module.exports=router