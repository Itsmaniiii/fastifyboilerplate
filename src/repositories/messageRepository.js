const dataSource = require('../../Infrastructure/postgres');

class MessageRepository {
  constructor() {
    this.repo = dataSource.getRepository('Message');
  }

  async saveMessage(messageData) {
    return await this.repo.save(messageData);
  }

  async getMessagesBetweenUsers(userA, userB) {
    return await this.repo.find({
      where: [
        { sender: { id: userA }, receiver: { id: userB } },
        { sender: { id: userB }, receiver: { id: userA } }
      ],
      relations: ['sender', 'receiver'],
      order: { timestamp: 'ASC' }
    });
  }
  async getAllMessages() {
    return await this.repo.find({
      order: {
      timestamp: "DESC"   // ✅ correct column name
    },
    relations: ["sender", "receiver"] // optional, if you also want user details
    });
  }
}

module.exports = MessageRepository;
