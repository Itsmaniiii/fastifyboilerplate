class MessageController {
  constructor(messageService) {
    this.messageService = messageService;
  }

  async sendMessage(req, reply) {
    const savedMessage = await this.messageService.sendMessage(req.body);
    return reply.send(savedMessage);
  }

  async getChatHistory(req, reply) {
    const { senderId, receiverId } = req.params;
    const messages = await this.messageService.fetchChatHistory(senderId, receiverId);
    return reply.send(messages);
  }
  async getAllMessages(request, reply) {
    try {
      const messages = await this.messageService.getAllMessages();
      reply.send(messages);
    } catch (error) {
      console.error("❌ Error in getAllMessages:", error);  // <-- add this
      reply.status(500).send({ error: error.message });
    }
  }
}

module.exports = MessageController;
