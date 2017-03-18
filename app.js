var express = require('express');
var app = express();
var rooms = require('./data/rooms.json');
var bodyParser = require('body-parser');
var adminRouter = require('./admin');



app.use(express.static('public')); // makes possible serving static assets
app.use(express.static('node_modules/bootstrap/dist'));
app.use(bodyParser.urlencoded({ extended : true }));
app.use(adminRouter);

app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.render('index', { title: "Home" });
});

app.get('/admin/users', function (req, res) {
    res.render('users', { title: "Admin users" });
});

app.listen(3000, function () {
    console.log('Server is running...');
});