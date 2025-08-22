// Infrastructure/rabbitmq.js
const amqp = require('amqplib');

let channel;

async function connectRabbitMQ() {
  try {
    const connection = await amqp.connect('amqp://admin:admin@localhost:5672'); // Use your RabbitMQ URL
    channel = await connection.createChannel();
    await channel.assertQueue('messages_queue', { durable: true });
    console.log('RabbitMQ connected and queue asserted');
  } catch (error) {
    console.error('RabbitMQ connection error:', error);
  }
}

function getChannel() {
  if (!channel) {
    throw new Error('RabbitMQ channel is not initialized!');
  }
  return channel;
}

module.exports = { connectRabbitMQ, getChannel };
