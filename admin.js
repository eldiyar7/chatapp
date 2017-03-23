var express = require('express');
var router = express.Router();
var rooms = require('./data/rooms.json');
var uuid = require('node-uuid');
var _ = require('lodash');

// Get rooms
router.get('/rooms', function (req, res) {
    res.render('rooms',
        {
            title: "Admin rooms",
            rooms: rooms,
            request: req
        });
});

// Add room
router.route('/rooms/add')
    .get(function (req, res) {
        res.render('add',
            {
                title: "Create Chat Room",
                request: req
            });
    })
    .post(function (req, res) {
        var room = {
            name: req.body.name,
            id: uuid.v4()
        }
        rooms.push(room);
        res.redirect(req.baseUrl + "/rooms");
    });

// Edit room
router.route('/rooms/edit/:id')
    .all(function (req, res, next) {
        var roomId = req.params.id;
        var room = _.find(rooms, r => r.id === roomId);
        if (!room) {
            next(new Error("Something went wrong."));
            return;
        }
        res.locals.room = room;
        next();
    })
    .get(function (req, res) {
        res.render('edit',
            {
                title: 'Edit room name',
                request: req
            });
    })
    .post(function (req, res) {
        res.locals.room.name = req.body.name;
        res.redirect(req.baseUrl + "/rooms");
    });

// Delete room
router.route('/rooms/delete/:id')
    .get(function (req, res) {
        var roomId = req.params.id;
        rooms = rooms.filter(r => r.id !== roomId);
        res.redirect(req.baseUrl + "/rooms");
    });

module.exports = router;
