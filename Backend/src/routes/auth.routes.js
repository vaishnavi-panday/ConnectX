const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controllers')
const authMiddleware = require('../middleware/auth.middleware');
const multer = require('multer')
const upload = multer({
    storage:multer.memoryStorage()
});
router.post('/register', upload.single("profilepic"), authController.registerUser);
router.post('/login' , authController.loginUser)
router.get('/me',authMiddleware.authUser, authController.getDetails )
router.post('/logout' , authController.logoutUser)
module.exports = router;