var express = require('express');
var router = express.Router();
var rooms = require('./data/rooms.json');
var messages = require('./data/messages.json');
var _ = require('lodash');

router.get('/rooms', function (req, res) {
    res.json(rooms);
});

router.get('/rooms/:roomId/messages', function (req, res) {
    var roomId = req.params.roomId;
    var roomMessages = messages.filter(m => m.roomId == roomId);

    var room = _.find(rooms, r => r.id === roomId);
    if (!room) {
        nres.sendStatus(404);
        return;
    }

    res.json({
        room: room,
        messages: roomMessages
    });
});


module.exports = router;