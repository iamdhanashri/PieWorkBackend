const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('your_database_name', 'your_mysql_user', 'your_mysql_password', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
