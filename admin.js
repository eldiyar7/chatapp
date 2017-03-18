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

router.get('/rooms/add', function (req, res) {
    res.render('add',
        {
            title: "Create Chat Room",
            request: req
        });
});

router.post('/rooms/add', function (req, res) {
    var room = {
        name: req.body.name,
        id: uuid.v4()
    }
    rooms.push(room);
    res.redirect(req.baseUrl + "/rooms");  // /admin/rooms
});

router.get('/rooms/edit/:id', function (req, res) {
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
});

router.post('/rooms/edit/:id', function (req, res) {
    var roomId = req.params.id;
    var room = _.find(rooms, r => r.id == roomId);
    if (!room) {
        res.sendStatus(404);
        return;
    }
    room.name = req.body.name;
    res.redirect(req.baseUrl + "/rooms");
});

router.get('/rooms/delete/:id', function (req, res) {
    var roomId = req.params.id;
    rooms = rooms.filter(r => r.id !== roomId);
    res.redirect(req.baseUrl + "/rooms");
});

module.exports = router;
