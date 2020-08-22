const Sequelize = require('sequelize');

require('dotenv').config(); // Pulls environment variables from '../.env'

// Create connection to database; use MySQL; username and password parameters
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.PW, {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
});
  
module.exports = sequelize;