var express = require('express');
var app = express();
var mongoose = require('mongoose');
var config = require('./config');

//var setupController = require('./controllers/setupController');
var apiController = require('./controllers/apiController');
//var homePageController = require('./controllers/homePageController');
var PORT = process.env.PORT || 3000;


//app.use('/static', express.static(__dirname + '/public'));
//app.set('view engine', 'ejs');

mongoose.Promise = global.Promise;
console.log(config.getDbConnectionString());
mongoose.connect(config.getDbConnectionString());
//setupController(app);
apiController(app);
//homePageController(app);

app.listen(PORT, function() {
     console.log("Express server started on port " + PORT);
});







// var express = require('express');
//
// //MiddleWare
// var middleware = require('./middleware.js');
// var bodyParser = require('body-parser');
//
// var _ = require('underscore');
//
// var path = require('path');
// //var fs = require('fs');
// //var jsonfile = require('jsonfile')
// var app = express();
// var PORT = process.env.PORT || 3000;
//
// app.use('/static', express.static(path.join(__dirname, 'public')));
// app.use(middleware.logger);
// app.use(bodyParser.json());
//
// function arrayContains(array, value) {
//     if (array && value) {
//         for (var i = 0; i < array.length; i++) {
//             if (array[i].toLowerCase().indexOf(value.toLowerCase()) !== -1) {
//                 return true;
//             }
//         }
//     }
//     return false;
// }
//
// ////////////////////////  DATA  ////////////////////////////////////
// var data = [{
//     id: 1,
//     title: '10,000 Reasons',
//     aka: ["Bless The Lord"],
//     machine: 'A',
//     played: '2016-12-17',
//     sequence: ["C", "V1", "|", "C", "V2", "C", "||", "C", "C", "E", "E"],
//     tithing: false,
//     note: 'Pastor Tim'
// }, {
//     id: 2,
//     title: 'None But Jesus',
//     aka: [],
//     machine: 'A',
//     played: '2016-09-03',
//     sequence: ["C", "C", "C", "C", "||", "C"],
//     tithing: true,
//     note: ''
// }, {
//     id: 3,
//     title: 'Holy Spirit',
//     aka: ["Bless The Lord"],
//     machine: 'B',
//     played: '2016-07-30',
//     sequence: ["V1", "C", "|", "V1", "C", "C", "||", "B", "B", "B", "B", "B", "|", "C", "C", "|", "B", "B", "B", "B"],
//     tithing: false,
//     note: ''
// }];
//
// ////////////////////////////////////////////////////////////////////
//
// app.get('/api/songs', function(req, res) {
//     var queryParams = req.query;
//     var filteredSongs = data;
//
//     if (queryParams.hasOwnProperty('title') && queryParams.title.length > 0) {
//         filteredSongs = _.filter(filteredSongs, function(song) {
//             return (
//                 (song.title.toLowerCase().indexOf(
//                     queryParams.title.trim().toLowerCase()) > -1) ||
//                 arrayContains(song.aka, queryParams.title.trim()))
//         });
//     }
//     if (queryParams.hasOwnProperty('machine')) {
//         filteredSongs = _.where(filteredSongs, {
//             machine: queryParams.machine.trim()
//         });
//     }
//     if (queryParams.hasOwnProperty('played')) {
//         filteredSongs = _.where(filteredSongs, {
//             played: queryParams.played.trim()
//         });
//     }
//     if (queryParams.hasOwnProperty('tithing')) {
//         if (queryParams.tithing.toLowerCase() === 'true' ||
//             queryParams.tithing.toLowerCase() === 't') {
//             filteredSongs = _.where(filteredSongs, {
//                 tithing: true
//             });
//         } else if (queryParams.tithing.toLowerCase().trim() === 'false' ||
//             queryParams.tithing.toLowerCase().trim() === 'f') {
//             filteredSongs = _.where(filteredSongs, {
//                 tithing: false
//             });
//         }
//     }
//     if (queryParams.hasOwnProperty('note') && queryParams.note.length > 0) {
//         filteredSongs = _.filter(filteredSongs, function(song) {
//             return (
//                 song.note.toLowerCase().indexOf(
//                     queryParams.note.trim().toLowerCase()) > -1)
//         });
//     }
//
//     res.json(filteredSongs).toString();
// });
//
// app.delete('/api/song/:id', function(req, res) {
//     var matchedSong = _.findWhere(data, {
//         id: parseInt(req.params.id)
//     });
//
//     if (!matchedSong) {
//         res.status(404).json({
//             "error": "No song found with that id."
//         });
//     } else {
//         data = _.without(data, matchedSong);
//         res.json(matchedSong);
//     }
// });
//
// app.put('/api/song/:id', function(req, res) {
//     var matchedSong = _.findWhere(data, {
//         id: parseInt(req.params.id)
//     });
//     var body = _.pick(req.body, 'title', 'aka', 'machine', 'played', 'sequence',
//         'tithing', 'note');
//     var validAttributes = {};
//
//     if (!matchedSong) {
//         return res.status(404).send();
//     }
//     if (body.hasOwnProperty('title')) {
//         if (_.isString(body.title) && body.title.trim().length > 0) {
//             validAttributes.title = body.title.trim();
//         } else {
//             return res.status(400).json({
//                 "error": "title must exist and not be empty."
//             });
//         }
//     }
//     if (body.hasOwnProperty('aka')) {
//         if (_.isArray(body.aka) && body.aka.length > 0) {
//             validAttributes.aka = body.aka;
//         } else {
//             return res.status(400).json({
//                 "error": "aka must exist."
//             });
//         }
//     }
//     if (body.hasOwnProperty('machine')) {
//         if (_.isString(body.machine) &&
//             (body.machine.trim() === 'A' ||
//                 body.machine.trim() === 'B')) {
//             validAttributes.machine = body.machine.trim();
//         } else {
//             return res.status(400).json({
//                 "error": "machine must exist and be either A or B."
//             });
//         }
//     }
//     if (body.hasOwnProperty('played')) {
//         if (_.isString(body.played) && body.played.trim().length === 10) {
//             validAttributes.played = body.played.trim();
//         } else {
//             return res.status(400).json({
//                 "error": "played must be in the proper date format: yyyy-MM-dd"
//             });
//         }
//     }
//     if (body.hasOwnProperty('sequence')) {
//         if (_.isArray(body.sequence) && body.sequence.length > 0) {
//             validAttributes.sequence = body.sequence;
//         } else {
//             return res.status(400).json({
//                 "error": "sequence must exist."
//             });
//         }
//     }
//     if (body.hasOwnProperty('tithing')) {
//         if (_.isBoolean(body.tithing)) {
//             validAttributes.tithing = body.tithing;
//         } else {
//             return res.status(400).json({
//                 "error": "tithing must be true or false."
//             });
//         }
//     }
//     if (body.hasOwnProperty('note')) {
//         if (_.isString(body.note)) {
//             validAttributes.note = body.note.trim();
//         } else {
//             return res.status(400).json({
//                 "error": "not must be a string."
//             });
//         }
//     }
//     _.extend(matchedSong, validAttributes);
//     res.json(matchedSong);
// });
//
// app.get('/api/song/:id', function(req, res) {
//     var matchedSong = _.findWhere(data, {
//         id: parseInt(req.params.id)
//     });
//     if (matchedSong) {
//         res.json(matchedSong).toString();
//     } else {
//         res.status(404).send();
//     }
// });
//
// app.post('/api/songs', function(req, res) {
//     var body = _.pick(req.body, 'title', 'aka', 'machine', 'played', 'sequence',
//         'tithing', 'note');
//     if ((!_.isBoolean(body.tithing)) || (!_.isString(body.title)) ||
//         (!_.isArray(body.aka)) || (!_.isString(body.played)) ||
//         (!_.isArray(body.sequence)) || (!_.isString(body.note)) ||
//         (body.title.trim().length === 0)) {
//         return res.status(400).send();
//     }
//     body.title = body.title.trim();
//
//     var maxId = _.max(data, function(data) {
//         return parseInt(data.id);
//     }).id;
//     maxId++;
//
//     var newItem = {
//         "id": maxId,
//         "title": body.title,
//         "aka": body.aka,
//         "machine": body.machine,
//         "played": body.played,
//         "sequence": body.sequence,
//         "tithing": body.tithing,
//         "note": body.note
//     };
//     data.push(newItem);
//     res.json(data).toString();
// });
//
// app.listen(PORT, function() {
//     console.log("Express server started on port " + PORT);
// });
