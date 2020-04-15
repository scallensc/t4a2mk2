require('dotenv').config()

const express = require("express");
// const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const users = require("./routes/api/users");
const path = require('path');
const app = express();
const cors = require('cors')
const db =  require("./sequelize");
const sequelize = db.sequelize;

// Cors middleware
app.use(cors())

// Bodyparser middleware
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());

// Commented
// DB Config
// const db = process.env.DB_CONNECTION_STRING;

// Connect to MongoDB
// mongoose
//     .connect(
//         db,
//         { useNewUrlParser: true }
//     )
//     .then(() => console.log("MongoDB successfully connected"))
//     .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Routes
app.use("/api/users", users);

db.sequelize.sync({force:false});

app.get('/topics', (req, res) => {
    db.Topic.findAll({
        attributes: [
            'id', 'name',
            [sequelize.fn('count', sequelize.col('Threads.id')) ,'thread_count']
        ],
        include: [
            {
                model: db.Thread,
                attributes: []
            }
        ],
        group: ['Topic.id']
    }).then(result => {
        res.send(result);
    });
})

app.get('/topic/:id?', (req, res) => {
    db.Topic.findOne({ 
        where: { 
            id: req.params.id 
        },
        include: [
            { 
                model: db.Thread,
                attributes: ['id', 'name', [sequelize.fn('count', sequelize.col('Threads->Comments.id')) ,'comment_count']],
                include: [
                    {
                        model: db.Comment,
                        attributes: []
                    }, {
                        model: db.User
                    }
                ]
            }
        ],
        group: ['Threads.id']
    }).then(result => {
        res.send(result);
    });
});

app.get('/thread/:id?', (req, res) => {
    db.Thread.findOne({ 
        where: { 
            id: req.params.id 
        },
        include: [{
            model: db.Comment,
            include: [{model: db.User}]
        }, {
            model: db.User
        }]
    }).then(result => {
        res.send(result);
    })
})

// Redirect catch all
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server spun up at http://localhost:${port} !`));