const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'User',
  tableName: 'users',
  target: 'User',
  columns: {
    id: {
      primary: true,
      type: 'uuid',
      generated: 'uuid',
      default: () => 'uuid_generate_v4()',
    },
    name: {
      type: 'varchar',
      length: 100,
      nullable: false,
    },
    email: {
      type: 'varchar',
      length: 150,
      unique: true,
      nullable: false,
    },
    password: {
      type: 'varchar',
      length: 255,
      nullable: false,
    },
    createdAt: {
      type: 'timestamp',
      default: () => 'CURRENT_TIMESTAMP',
    },
    isDeleted: {
      type: 'boolean',
      default: false,
    },
  },
});
