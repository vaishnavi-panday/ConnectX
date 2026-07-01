const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controllers')
const authMiddleware = require('../middleware/auth.middleware');
const validationMiddleware = require('../middleware/validation.middleware');
const multer = require('multer')
const upload = multer({
    storage:multer.memoryStorage()
});
router.post('/register', upload.single("profilepic"), validationMiddleware.validateUserRegistration, authController.registerUser);
router.post('/login' , validationMiddleware.validateUserLogin, authController.loginUser)
router.get('/me',authMiddleware.authUser, authController.getDetails )
router.post('/logout' ,authMiddleware.authUser, authController.logoutUser)
module.exports = router;