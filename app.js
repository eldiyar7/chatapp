var express = require('express');
var app = express();
var rooms = require('./data/rooms.json');
var bodyParser = require('body-parser');
var uuid = require('node-uuid');

app.use(express.static('public')); // makes possible serving static assets
app.use(express.static('node_modules/bootstrap/dist'));
app.use(bodyParser.urlencoded({ extended : true }));

app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.render('index', { title: "Home" });
});

app.get('/admin/rooms', function (req, res) {
    res.render('rooms',
        {
            title: "Admin rooms",
            rooms: rooms
        });
});

app.get('/admin/rooms/add', function (req, res) {
    res.render('add', { title : "Create Chat Room" });
});

app.post('/admin/rooms/add', function (req, res) {
    var room = {
        name : req.body.name,
        id : uuid.v4()
    }
    rooms.push(room);
    res.redirect('/admin/rooms');
});

app.get('/admin/rooms/delete/:id', function (req, res) {
    var roomId = req.params.id;
    res.send(roomId);
});

app.get('/admin/users', function (req, res) {
    res.render('users', { title: "Admin users" });
});

app.listen(3000, function () {
    console.log('Server is running...');
});