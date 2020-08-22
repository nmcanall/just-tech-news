const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection');

// Build server
const app = express();
const PORT = process.env.PORT || 3001;

// App middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Turn on routes
app.use(routes);

// Turn on connection to database and server
// Change 'force: true' to 'false' in order to drop and rebuild table, then revert to false
sequelize.sync({force: false}).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});