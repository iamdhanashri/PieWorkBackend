const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Weather = sequelize.define('Weather', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  temperature: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

module.exports = Weather;
