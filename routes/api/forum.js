require('dotenv').config()

const express = require("express");
const router = express.Router();
const db = require("../../sequelize");
const sequelize = db.sequelize;

// Topic creation route, this will be removed for production as topics remain fixed now
// router.post("/topic", (req, res) => {
//     console.log('hitting post route for topic')
//     if (!req.body.name || !req.body.user || !req.body.topic) {
//         console.log("Post comment failed, incomplete post data")
//         return res.status(400).json({ error: "Incomplete post data" });
//     } else {
//         db.Topic.create({
//             name: req.body.name,
//         }).then(result => {
//             console.log('From routes/api/forum.js', '/topic post: ')
//             console.log(result)
//             res.json(result);
//             return;
//         });
//     }
// })

// Thread creation route
router.post("/thread", (req, res) => {
    console.log('hitting post route for thread')
    if (!req.body.name || !req.body.user || !req.body.topic) {
        console.log('Post thread failed, incomplete post data')
        return res.status(400).json({ error: "Incomplete post data" });
    } else {
        db.Thread.create({
            name: req.body.name,
            UserId: req.body.user,
            TopicId: req.body.topic,
        }).then(result => {
            console.log('From routes/api/forum.js', '/thread post: ')
            console.log(result)
            res.json(result);
            return;
        });
    };
});

// Comment creation route
router.post("/comment", (req, res) => {
    console.log('hitting post route for comment')
    if (!req.body.text || !req.body.user || !req.body.topic || !req.body.thread) {
        console.log('Post comment failed, incomplete post data')
        return res.status(400).json({ error: "Incomplete post data" });
    } else {
        db.Comment.create({
            text: req.body.text,
            UserId: req.body.user,
            ThreadId: req.body.thread,
        }).then(result => {
            console.log('From routes/api/forum.js', '/comment post: ')
            console.log(result)
            res.json(result);
            return;
        });
    };
});

// Get route to list available topics and threads
router.get('/topics', (req, res) => {
    db.Topic.findAll({
        attributes: [
            'id', 'name',
            [sequelize.fn('count', sequelize.col('Threads.id')), 'thread_count']
        ],
        include: [
            {
                model: db.Thread,
                attributes: []
            }
        ],
        group: ['Topic.id']
    }).then(result => {
        console.log('From routes/api/forum.js', '/topics request: ')
        console.log(result)
        res.json(result);
        return;
    });
});

// Get route for specific topic
router.get('/topic/:id?', (req, res) => {
    db.Topic.findOne({
        where: {
            id: req.params.id
        },
        include: [
            {
                model: db.Thread,
                attributes: ['id', 'name', [sequelize.fn('count', sequelize.col('Threads->Comments.id')), 'comment_count']],
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
        console.log('From routes/api/forum.js', '/topic/:id? request: ')
        console.log(result)
        res.json(result);
        return
    });
});

// Get route for specific thread
router.get('/thread/:id?', (req, res) => {
    db.Thread.findOne({
        where: {
            id: req.params.id
        },
        include: [{
            model: db.Comment,
            include: [{ model: db.User }]
        }, {
            model: db.User
        }]
    }).then(result => {
        console.log('From routes/api/forum.js', '/thread/:id? request: ')
        console.log(result)
        res.json(result);
        return;
    });
});

module.exports = router;