var express = require('express');
var app = express();
var rooms = require('./data/rooms.json');

app.use(express.static('public')); // makes possible serving static assets
app.use(express.static('node_modules/bootstrap/dist'));

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

app.get('/admin/users', function (req, res) {
    res.render('users', { title: "Admin users" });
});

app.listen(3000, function () {
    console.log('Server is running...');
});