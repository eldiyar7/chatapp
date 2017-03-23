var express = require('express');
var router = express.Router();
var rooms = require('./data/rooms.json');
var messages = require('./data/messages.json');
var _ = require('lodash');
var uuid = require('node-uuid');

router.get('/rooms', function (req, res) {
    res.json(rooms);
});

router.route('/rooms/:roomId/messages')
    .get(function (req, res) {
        var roomId = req.params.roomId;
        var roomMessages = messages.filter(m => m.roomId == roomId);

        var room = _.find(rooms, r => r.id === roomId);
        if (!room) {
            res.sendStatus(404);
            return;
        }

        res.json({
            room: room,
            messages: roomMessages
        });
    })
    .post(function (req, res) {
        var roomId = req.params.roomId;

        var message = {
            text: req.body.text,
            roomId: roomId,
            userId: "44f885e8-87e9-4911-973c-4074188f408a",
            id: uuid.v4()
        }

        messages.push(message);
        res.sendStatus(200);
    });

module.exports = router;