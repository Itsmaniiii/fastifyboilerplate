const MessageRepository = require('../repositories/messageRepository');
const MessageService = require('../services/messageService');
const MessageController = require('../controllers/messageController');

function messageRoutes(fastify, options, done) {
  const messageRepo = new MessageRepository();
  const messageService = new MessageService(messageRepo);
  const messageController = new MessageController(messageService);

  // messageRoutes.js
    fastify.post('/', messageController.sendMessage.bind(messageController));
    fastify.get('/:senderId/:receiverId', messageController.getChatHistory.bind(messageController));
    fastify.get('/', messageController.getAllMessages.bind(messageController));



  done();
}

module.exports = messageRoutes;
