var express = require('express');
var router = express.Router();
var rooms = require('./data/rooms.json');
var uuid = require('node-uuid');
var _ = require('lodash');

router.get('/rooms', function (req, res) {
    res.render('rooms',
        {
            title: "Admin rooms",
            rooms: rooms,
            request: req
        });
});

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
        res.redirect(req.baseUrl + "/rooms");  // /admin/rooms
    });

router.route('/rooms/edit/:id')
    .get(function (req, res) {
        var roomId = req.params.id;
        var room = _.find(rooms, r => r.id === roomId);
        if (!room) {
            res.sendStatus(404);
            return;
        }
        res.render('edit',
            {
                title: 'Edit room name',
                room: room,
                request: req
            });
    })
    .post(function (req, res) {
        var roomId = req.params.id;
        var room = _.find(rooms, r => r.id == roomId);
        if (!room) {
            res.sendStatus(404);
            return;
        }
        room.name = req.body.name;
        res.redirect(req.baseUrl + "/rooms");
    });

router.route('/rooms/delete/:id')
    .get(function (req, res) {
        var roomId = req.params.id;
        rooms = rooms.filter(r => r.id !== roomId);
        res.redirect(req.baseUrl + "/rooms");
    });

module.exports = router;
