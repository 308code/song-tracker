var express = require('express');

//MiddleWare
var middleware = require('./middleware.js');
var bodyParser = require('body-parser');

var _ = require('underscore');

var path = require('path');
//var fs = require('fs');
//var jsonfile = require('jsonfile')
var app = express();
var PORT = process.env.PORT || 3000;

app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(middleware.logger);
app.use(bodyParser.json());

////////////////////////////////////////////////////////////////////
//DATA//
var data = [{
  id: 1,
  title: '10000 Reasons',
  aka: ["Bless The Lord"],
  machine: 'A',
  played: '2016-12-17',
  sequence: ["C", "V1", "|","C","V2","C","||","C","C","E","E"],
  tithing: false,
  note: 'Pastor Tim'
},
{
  id: 2,
  title: 'None But Jesus',
  aka: [],
  machine: 'A',
  played: '2016-09-03',
  sequence: ["C", "C", "C","C","||","C"],
  tithing: false,
  note: ''
},
{
  id: 3,
  title: 'Holy Spirit',
  aka: [],
  machine: 'B',
  played: '2016-07-30',
  sequence: ["V1", "C", "|","V1","C", "C", "||","B","B","B","B","B","|","C","C","|","B","B","B","B"],
  tithing: false,
  note: ''
}];

////////////////////////////////////////////////////////////////////

app.get('/api/songs', function(req, res) {
    res.json(data).toString();
});

app.delete('/api/song/:id',function(req, res){
  var matchedSong = _.findWhere(data, {id: parseInt(req.params.id)});

  if(! matchedSong){
    res.status(404).json({"error": "No song found with that id."});
  }else{
    data = _.without(data,matchedSong);
    res.json(matchedSong);
  }
});

app.get('/api/song/:id', function(req, res) {
    var matchedSong = _.findWhere(data, {id: parseInt(req.params.id)});
    if (matchedSong) {
        res.json(matchedSong).toString();
    } else {
        res.status(404).send();
    }
});

app.post('/api/songs', function(req, res) {
    var body = _.pick(req.body,'title','aka','machine','played','sequence',
     'tithing','note');
    if ((!_.isBoolean(body.tithing)) || (!_.isString(body.title)) ||
        (!_.isArray(body.aka)) || (!_.isString(body.played)) ||
        (!_.isArray(body.sequence)) || (!_.isString(body.note)) ||
        (body.title.trim().length === 0)) {
        return res.status(400).send();
    }
    body.title = body.title.trim();

    var maxId = _.max(data, function(data) {
        return parseInt(data.id);
    }).id;
    maxId++;

    var newItem = {
        "id": maxId,
        "title": body.title,
        "aka": body.aka,
        "machine": body.machine,
        "played": body.played,
        "sequence": body.sequence,
        "tithing": body.tithing,
        "note": body.note
    };
    data.push(newItem);
    res.json(data).toString();
});

app.listen(PORT, function() {
    console.log("Express server started on port " + PORT);
});
