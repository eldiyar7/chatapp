var express = require('express');
var router = express.Router();
var rooms = require('./data/rooms.json');

router.get('/rooms', function (req, res) {
   res.json(rooms);
});

module.exports = router;