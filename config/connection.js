const Sequelize = require('sequelize');

require('dotenv').config(); // Pulls environment variables from '../.env'

// Create connection to database; use MySQL; username and password parameters
let sequelize;

// If ran from Heroku using JAWSDB_URL plugin, build database with those connections
if(process.env.JAWSDB_URL) {
    sequelize = new Sequelize(process.env.JAWSDB_URL);
}
// Otherwise, use connections in local .env file
else {
    sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.PW, {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306
    });
}
  
module.exports = sequelize;