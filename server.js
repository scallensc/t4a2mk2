require('dotenv').config()

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// DB Config
const db = process.env.DB_CONNECTION_STRING;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB connection established"))
  .catch(err => console.log(err, "MongoDB connection failed"));

const port = process.env.PORT || 5000; // process.env.port is for Heroku deployment
app.listen(port, () => console.log(`server up at http://localhost:${port} !`));
