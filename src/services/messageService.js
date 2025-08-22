class MessageService {
  constructor(messageRepository) {
    this.messageRepository = messageRepository;
  }

  async sendMessage(data) {
    return await this.messageRepository.saveMessage({
      sender: { id: data.senderId },
      receiver: { id: data.receiverId },
      content: data.content
    });
  }

  async fetchChatHistory(senderId, receiverId) {
    return await this.messageRepository.getMessagesBetweenUsers(senderId, receiverId);
  }
  async getAllMessages() {
  return await this.messageRepository.getAllMessages();
  }

}

module.exports = MessageService;
