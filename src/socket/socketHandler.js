const { getChannel } = require('../../Infrastructure/rabbitmq');
const MessageRepository = require('../repositories/messageRepository');
const MessageService = require('../services/messageService');

module.exports = (io) => {
  const messageRepo = new MessageRepository();
  const messageService = new MessageService(messageRepo);

  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('join_room', (userId) => {
      socket.join(userId);
      console.log(`Socket ${socket.id} joined room: ${userId}`);
    });

    socket.on('send_message', async (data) => {
      try {
        const channel = getChannel();
        // Publish message data to RabbitMQ queue
        channel.sendToQueue('messages_queue', Buffer.from(JSON.stringify(data)), {
          persistent: true,
        });
        console.log('Message sent to RabbitMQ queue');

        // Optionally send ack to sender (or broadcast)
        socket.emit('message_queued', { status: 'queued' });

      } catch (err) {
        console.error('Error sending message to RabbitMQ:', err);
      }
    });
  });
};
