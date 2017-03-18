var express = require('express');
var router = express.Router();
var uuid = require('node-uuid');
var _ = require('lodash');

router.get('/admin/rooms', function (req, res) {
    res.render('rooms',
        {
            title: "Admin rooms",
            rooms: rooms
        });
});

router.get('/admin/rooms/add', function (req, res) {
    res.render('add', { title : "Create Chat Room" });
});

router.post('/admin/rooms/add', function (req, res) {
    var room = {
        name : req.body.name,
        id : uuid.v4()
    }
    rooms.push(room);
    res.redirect('/admin/rooms');
});

router.get('/admin/rooms/edit/:id', function (req, res) {
    var roomId = req.params.id;
    var room = _.find(rooms, r => r.id === roomId);
    if(!room) {
        res.sendStatus(404);
        return;
    }
    res.render('edit', {
        title : 'Edit room name',
        room : room
    });
});

router.post('/admin/rooms/edit/:id', function (req, res) {
    var roomId = req.params.id;
    var room = _.find(rooms, r => r.id == roomId);
    if(!room) {
        res.sendStatus(404);
        return;
    }
    room.name = req.body.name;
    res.redirect('/admin/rooms');
});

router.get('/admin/rooms/delete/:id', function (req, res) {
    var roomId = req.params.id;
    rooms = rooms.filter(r => r.id !== roomId);
    res.redirect('/admin/rooms');
});

module.exports = router;
