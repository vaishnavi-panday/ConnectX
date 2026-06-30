const express = require('express');
const authMiddleware = require('../middleware/auth.middleware');
const messageController = require('../controllers/message.controller');
const router = express.Router();
const multer = require('multer')
const upload = multer({
    storage:multer.memoryStorage()
});
router.post('/:id/chat' ,upload.fields([
    {name:"image" , maxCount:1},
    {name:"file" , maxCount:1}
]), authMiddleware.authUser , messageController.sendMessage);
router.get('/:id/chat' , authMiddleware.authUser , messageController.getMessage);
router.get('/chats' , authMiddleware.authUser , messageController.getAllChat)
router.patch('/seen/:id' , authMiddleware.authUser , messageController.seenUnseen )
router.delete('/:msgId' , authMiddleware.authUser , messageController.deleteMessage)
router.patch('/:msgId' , authMiddleware.authUser , messageController.deleteForMeMessage)
router.patch('/:msgId/react' , authMiddleware.authUser , messageController.reactionOnMessage)

module.exports = router