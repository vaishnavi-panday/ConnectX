const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware')
const userController = require('../controllers/user.controller')
const multer = require('multer')
const upload = multer({
    storage:multer.memoryStorage()
});
router.put('/updateprofile/:id',authMiddleware.authUser,upload.single("profilepic"), userController.updateProfile )
router.get('/user/:id' , userController.getUserById);
router.post('/:id/user', authMiddleware.authUser , userController.followSomeone )
router.get('/:id/followers' , authMiddleware.authUser , userController.followersList)
router.get('/:id/following' , authMiddleware.authUser , userController.followingList)
router.get('/:id/user' , authMiddleware.authUser , userController.getUserDetailsById)
router.get('/search' , authMiddleware.authUser , userController.searchUsers)
router.get('/all' , authMiddleware.authUser, userController.findAllUser)
module.exports=router