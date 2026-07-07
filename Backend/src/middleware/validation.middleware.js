const {body, check, param , validationResult, query} = require('express-validator');

const validateRequest = (req, res , next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    next();
}
const validateUserRegistration = [
    body('username').notEmpty().withMessage('Username is required').isLength({min:3, max:20}).withMessage('Username must be between 3 and 20 characters').trim().matches(/^[a-zA-Z0-9_]+$/).withMessage('Username can only contain letters, numbers, and underscores'),
    body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email address').normalizeEmail(),
    body('password').notEmpty().withMessage('Password is required').matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/).withMessage('Password must be between 8 and 20 characters and include at least one uppercase letter, one lowercase letter, one number, and one special character'),
    validateRequest
]

const validateUserLogin = [
    body('username').notEmpty().withMessage('Username is required'),
    body('password').notEmpty().withMessage('Password is required'),
    validateRequest
]
 const validateIdParam = [
    param('id').isMongoId().withMessage('Invalid user ID'),
    validateRequest
]
 const validatePostCreation = [
    body('caption').optional().isLength({max:200}).withMessage('Caption must be between 2 and 200 characters').trim(),
    validateRequest
]
const validateSearchQuery = [
    query('q').notEmpty().withMessage('Search query is required').trim(),
    validateRequest
]
const validateEditProfile = [
    body('bio').optional().isLength({max:150}).withMessage('Bio must be less than 150 characters').trim(),
    validateRequest
]
const validateCommentCreation = [
    body('comment').notEmpty().withMessage('Comment is required').isLength({max:200}).withMessage('Comment must be less than 200 characters').trim(),
    validateRequest
]
const validateMessageIdParam = [
    param('msgId').isMongoId().withMessage('Invalid message ID'),
    validateRequest
]
const validatePostIdParam = [
    param('postId').isMongoId().withMessage('Invalid post ID'),
    validateRequest
]
const validateCommentIdAndPostIdParam = [
    param('postId').isMongoId().withMessage('Invalid post ID'),
    param('commentId').isMongoId().withMessage('Invalid comment ID'),
    validateRequest
]
const validateImageUpload = (fieldName , required=true)=> [
    check(fieldName).custom((value, { req }) => {
        if (!req.file) {
            if(required){
                throw new Error('Image file is required');
                
            }
            return true;
        }
        const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg' , 'image/webp'];
        if (!allowedMimeTypes.includes(req.file.mimetype)) {
            throw new Error('Invalid image file type. Only JPEG, PNG, and JPG are allowed.');
        }
        const maxSizeInBytes = 5 * 1024 * 1024;
        if (req.file.size > maxSizeInBytes) {
            throw new Error('Image file size exceeds the maximum limit of 5MB.');
        }
        return true;
    }),
    validateRequest
]
 module.exports = {
    validateUserRegistration,
    validateUserLogin,
    validateIdParam,
    validatePostCreation,
    validateSearchQuery,
    validateEditProfile,
    validateCommentCreation,
    validateMessageIdParam,
    validatePostIdParam,
    validateCommentIdAndPostIdParam,
    validateImageUpload
}