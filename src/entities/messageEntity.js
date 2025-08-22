const { EntitySchema } = require('typeorm');
const User = require('./userEntity'); // User entity import

module.exports = new EntitySchema({
  name: 'Message',
  tableName: 'messages',

  columns: {
    id: {
      primary: true,
      type: 'uuid',
      generated: 'uuid',
      default: () => 'uuid_generate_v4()',
    },
    content: {
      type: 'text',
      nullable: false,
    },
    timestamp: {
      type: 'timestamp',
      createDate: true,
    },
  },

  relations: {
    sender: {
      type: 'many-to-one',
      target: 'User', // Entity ka naam
      joinColumn: { name: 'senderId' }, // Column ka naam in DB
      nullable: false,
      onDelete: 'CASCADE',
    },
    receiver: {
      type: 'many-to-one',
      target: 'User',
      joinColumn: { name: 'receiverId' },
      nullable: false,
      onDelete: 'CASCADE',
    },
  },
});
