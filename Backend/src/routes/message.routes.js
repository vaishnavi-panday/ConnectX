const express = require('express');
const authMiddleware = require('../middleware/auth.middleware');
const messageController = require('../controllers/message.controller');
const validationMiddleware = require('../middleware/validation.middleware');
const router = express.Router();
const multer = require('multer')
const upload = multer({
    storage:multer.memoryStorage()
});
router.post('/:id/chat' ,upload.fields([
    {name:"image" , maxCount:1},
    {name:"file" , maxCount:1}
]), authMiddleware.authUser ,validationMiddleware.validateIdParam, messageController.sendMessage);
router.get('/:id/chat' , authMiddleware.authUser , validationMiddleware.validateIdParam, messageController.getMessage);
router.get('/chats' , authMiddleware.authUser , messageController.getAllChat)
router.patch('/seen/:id' , authMiddleware.authUser , validationMiddleware.validateIdParam, messageController.seenUnseen )
router.delete('/:msgId' , authMiddleware.authUser , validationMiddleware.validateMessageIdParam, messageController.deleteMessage)
router.patch('/:msgId' , authMiddleware.authUser , validationMiddleware.validateMessageIdParam, messageController.deleteForMeMessage)
router.patch('/:msgId/react' , authMiddleware.authUser , validationMiddleware.validateMessageIdParam, messageController.reactionOnMessage)
router.get('/unread-count' , authMiddleware.authUser , messageController.getUnreadMessages)
router.patch('/:id/read' , authMiddleware.authUser , validationMiddleware.validateIdParam, messageController.markMessagesAsRead)
module.exports = router