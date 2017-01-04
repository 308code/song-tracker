var express = require('express');
var app = express();
var mongoose = require('mongoose');
var config = require('./config');

var apiController = require('./controllers/apiController');
//var homePageController = require('./controllers/homePageController');

var PORT = process.env.PORT || 3000;

app.use('/static', express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

mongoose.Promise = global.Promise;
mongoose.connect(config.getDbConnectionString());

app.get('/', function (req, res) {
    res.render('index');
});

apiController(app);
//homePageController(app);

app.listen(PORT, function() {
     console.log("Express server started on port " + PORT);
});
