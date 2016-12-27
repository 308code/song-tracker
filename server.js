var express = require('express');

//MiddleWare
var middleware = require('./middleware.js');
var bodyParser = require('body-parser');


var path = require('path');
//var fs = require('fs');
var jsonfile = require('jsonfile')
var app = express();
var PORT = process.env.PORT || 3000;

app.use('/static', express.static(path.join(__dirname, 'public')));
//app.use(express.static(__dirname + '/public'));
//app.use(middleware.requireAuthentication);
app.use(middleware.logger);
app.use(bodyParser.json());

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
            if (matchedSong) {
                res.json(matchedSong);
            } else {
                res.status(404).send();
            }
        });
});

app.post('/api/songs', function(req, res) {
    var body = req.body;
    var data = [];
    var maxId = 0;
    var file = path.join(__dirname, 'public/data/songs.json');
    jsonfile.readFile(file,
        function(err, obj) {
            for (let song of obj) {
                if (song.id > maxId) {
                    maxId = song.id;
                }
                data.push(song);
            }
            maxId++;

            var newItem = {
                "id": maxId,
                "title": body.title,
                "aka": body.aka,
                "played": body.played,
                "sequence": body.sequence,
                "tithing": body.tithing,
                "note": body.note
            };
            data.push(newItem);
            jsonfile.writeFile(file, data, function(err) {
                if (err) {
                    console.log(err);
                } else {
                    res.sendFile(file);
                }
            });
        });
});
/*
{
  "title":"Heartbeats",
  "aka":[""],
  "played":"2016-12-17",
  "sequence":[
    "V1","PC","C","C","V2"
  ],
  "tithing":false,
  "note": "Anna Marie"
}
*/
//     console.log('description: ' + body.description);
//     res.json(body);
// });





app.listen(PORT, function() {
    console.log("Express server started on port " + PORT);
});
