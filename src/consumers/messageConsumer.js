const { getChannel } = require('../../Infrastructure/rabbitmq');
const MessageRepository = require('../repositories/messageRepository');
const MessageService = require('../services/messageService');
const { validate: isUUID } = require('uuid');
async function startMessageConsumer(io) {
  const channel = getChannel();

  const messageRepo = new MessageRepository();
  const messageService = new MessageService(messageRepo);
      

  await channel.consume('messages_queue', async (msg) => {
    if (msg !== null) {
      const content = JSON.parse(msg.content.toString());
      //console.log('Received message:', content);

      console.log("Consumer received message:", content);

      // Validate UUIDs
      if (!isUUID(content.senderId) || !isUUID(content.receiverId)) {
        console.error('Invalid UUID detected:', content.senderId, content.receiverId);
        channel.ack(msg); // Acknowledge to prevent re-processing
        return;
      }

      // Save message to DB
      const savedMessage = await messageService.sendMessage(content);

      // Emit message to receiver's socket room
      io.to(content.receiverId).emit('receive_message', savedMessage);

      // Acknowledge message consumed
      channel.ack(msg);

      console.log('Message consumed, saved, and emitted:', savedMessage);
    }
  });
}


module.exports = startMessageConsumer;
