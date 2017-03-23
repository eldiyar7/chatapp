var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(express.static('public'));
app.use(express.static('node_modules/bootstrap/dist'));
app.use(express.static('node_modules/jquery/dist'));
app.use(bodyParser.urlencoded({ extended : true }));

app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.render('home', { title: "Home" });
});

var adminRouter = require('./admin');
app.use("/admin", adminRouter);

var apiRouter = require('./api');
app.use('/api', apiRouter);

app.get('/admin/users', function (req, res) {
    res.render('users', { title: "Admin users" });
});

app.listen(3000, function () {
    console.log('Server is running...');
});