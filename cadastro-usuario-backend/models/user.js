'use strict';
const {
  Model, DataTypes,
} = require('sequelize');

const sequelize = require('../orm');

class User extends Model {};

User.init({
  code: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    primaryKey: true,
  },
  name: DataTypes.STRING,
  birthday: DataTypes.DATE,
  photo: DataTypes.TEXT
}, {
  sequelize,
  modelName: 'User',
});

module.exports = User;