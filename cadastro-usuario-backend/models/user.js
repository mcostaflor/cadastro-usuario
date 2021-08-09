'use strict';
const {
  Model, DataTypes,
} = require('sequelize');

const sequelize = require('../orm');

class User extends Model {};

User.init({
  code: DataTypes.STRING,
  name: DataTypes.STRING,
  birthday: DataTypes.DATE,
  photo: DataTypes.TEXT
}, {
  sequelize,
  modelName: 'User',
});

module.exports = User;