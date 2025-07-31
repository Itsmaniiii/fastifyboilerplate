const { DataSource } = require('typeorm');
const path = require('path');
require('dotenv').config();

const { PinoLogger, logger } = require('./logger.js');

const dataSource = new DataSource({
  type: process.env.DB_DIALECT || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'postgres',
  synchronize: true,
  logging: true,
  logger: new PinoLogger(),
  entities: [path.join(__dirname, '../src/entities/userEntity.js')], // ✅ picks up userEntity.js and others
});

module.exports = dataSource;
