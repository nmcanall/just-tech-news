// Front-end path
const path = require('path');
const exphbs = require("express-handlebars");
const hbs = exphbs.create({});

// Back-end dependencies
const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');

// Build server
const app = express();
const PORT = process.env.PORT || 3001;

// Front-end middleware
app.use(express.static(path.join(__dirname, 'public')));
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// Back-end middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Turn on routes
app.use(routes);

// Turn on connection to database and server
// Change 'force: true' to 'false' in order to drop and rebuild table, then revert to false
sequelize.sync({force: false}).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});