const { Sequelize } = require('sequelize');
require('dotenv').config();

const dbName = process.env.NODE_ENV === 'test' ? process.env.POSTGRES_TEST_DB : process.env.POSTGRES_DB;

const sequelize = new Sequelize(dbName, process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  dialect: 'postgres',
});

module.exports = sequelize;