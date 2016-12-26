var express = require('express');
var middleware = require('./middleware.js');
var path = require('path');
//var fs = require('fs');
var jsonfile = require('jsonfile')
var app = express();
var PORT = process.env.PORT || 3000;

app.use('/static', express.static(path.join(__dirname, 'public')));
//app.use(express.static(__dirname + '/public'));
//app.use(middleware.requireAuthentication);
app.use(middleware.logger);

app.get('/', function(req, res) {
    res.send('Song Tracker Application');
});

app.get('/about', middleware.requireAuthentication, function(req, res) {

    res.send('About Us');
});

app.get('/api/songs', function(req, res) {
    res.sendFile(path.join(__dirname, 'public/data/songs.json'));
});

app.get('/api/song/:id', function(req, res) {
    var id = parseInt(req.params.id);
    var matchedSong;


    jsonfile.readFile(path.join(__dirname, 'public/data/songs.json'),
            function(err, data) {
                for (let song of data) {
                    if (song.id === id) {
                      matchedSong = song;
                      break;
                    }
                }
                if(matchedSong){
                  res.json(matchedSong);
                }else{
                  res.status(404).send();
                }
            });
});





app.listen(PORT, function() {
    console.log("Express server started on port " + PORT);
});
