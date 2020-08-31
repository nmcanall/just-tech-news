// Front-end dependencies
const path = require('path');
const exphbs = require("express-handlebars");
const helpers = require("./utils/helpers");
const hbs = exphbs.create({helpers});

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

// Session dependencies
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const sess = {
    secret: "Super secret secret",
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

// Session middleware
app.use(session(sess));

// Turn on routes
app.use(routes);

// Turn on connection to database and server
// Change 'force: true' to 'false' in order to drop and rebuild table, then revert to false
sequelize.sync({force: false}).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});