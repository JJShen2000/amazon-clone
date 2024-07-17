const Sequelize = require('sequelize');
const sequelize = require('../configs/database');

const User = require('./user')(sequelize, Sequelize.DataTypes);

const db = {
  User,
  sequelize,
  Sequelize,
};

module.exports = db;
