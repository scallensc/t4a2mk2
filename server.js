require('dotenv').config()

const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const users = require("./routes/api/users");
const forum = require("./routes/api/forum");
const path = require('path');
const app = express();
const cors = require('cors')
const db = require("./sequelize");

// Cors middleware
app.use(cors())

// Bodyparser middleware
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Routes
app.use("/api/users", users);
app.use("/api/forum", passport.authenticate('jwt'), forum);

db.sequelize.sync({ force: false });

// Redirect catch all
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server spun up at http://localhost:${port} !`));

module.exports = app;