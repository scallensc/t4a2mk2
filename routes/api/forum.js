require('dotenv').config()

const express = require("express");
const router = express.Router();
const db = require("../../sequelize");
const sequelize = db.sequelize;

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
        res.json(result);
        return;
    });
})

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
        console.log('From routes/api/forum.js', '/topic:id? request: ')
        res.json(result);
        return
    });
});

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
        res.json(result);
        return;
    })
})

module.exports = router;