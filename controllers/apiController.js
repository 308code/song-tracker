var Songs = require('../models/songModel');
var bodyParser = require('body-parser');
var _ = require('underscore');

module.exports = function(app) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    function arrayContains(array, value) {
        if (array && value) {
            for (var i = 0; i < array.length; i++) {
                if (array[i].toLowerCase().indexOf(
                        value.toLowerCase()) !== -1) {
                    return true;
                }
            }
        }
        return false;
    }

    //GET all songs by model methods
    app.get('/api/songs', function(req, res) {
        var queryParams = validateQueryParams(req);
        Songs.find(queryParams, null, {
            sort: {
                played: -1
            }
        }, function(err, songs) {
            if (err) {
                res.status(400).send(err.errors);
            } else if (songs) {
                res.send(songs);
            } else {
                res.sendStatus(404);
            }
        });
    });

    //GET a single song instance
    app.get('/api/song/:id', function(req, res) {
        var queryParams = validateQueryParams(req);
        Songs.findById({
            _id: req.params.id
        }, function(err, song) {
            if (err) {
                res.status(400).send(err.errors);
            } else if (song) {
                res.send(song);
            } else {
                res.sendStatus(404);
            }
        });
    });

    //CREATE an new entry if _id doesn't exist or update if it does.
    app.post('/api/songs', function(req, res) {
        if (req.body._id) {
            //update existing song
            Songs.findByIdAndUpdate(req.body._id, {
                title: req.body.title,
                aka: req.body.aka,
                machine: req.body.machine,
                played: req.body.played,
                sequence: req.body.sequence,
                tithing: req.body.tithing,
                note: req.body.note
            }, function(err, song) {
                if (err) {
                    res.status(400).send(err.errors);
                } else if (song) {
                    res.status(202).send(song);
                } else {
                    res.sendStatus(404);
                }
            });
        } else {
            //create new showModel
            var newSong = Songs({
                title: req.body.title,
                aka: req.body.aka,
                machine: req.body.machine,
                played: req.body.played,
                sequence: req.body.sequence,
                tithing: req.body.tithing,
                note: req.body.note
            });
            newSong.save(function(err, song) {
                if (err) {
                    res.status(400).send(err.errors);
                } else if (song) {
                    res.status(201).send(song);
                } else {
                    res.sendStatus(404);
                }
            });
        }
    });

    ///////////////
    app.post('/api/song/:id', function(req, res) {
        Songs.findById({
            _id: req.params.id
        }, function(err, song) {
            if (err) throw err;
            var newSong = Songs({
              title: song.title,
              aka: song.aka,
              machine: song.machine,
              played: song.played,
              sequence: song.sequence,
              tithing: song.tithing,
              note: song.note
            });
            newSong.save(function(err, song) {
                if (err) throw err;
                res.send(song);
            });
        });
    });


    //DELETE a single song instance
    app.delete('/api/song/:id', function(req, res) {
        Songs.findByIdAndRemove(req.params.id, function(err) {
            if (err) {
                res.status(400).send(err.errors);
            }
            Songs.find({}, null, {
                sort: {
                    played: -1
                }
            }, function(err, songs) {
                if (err) {
                    res.status(400).send(err.errors);
                } else if (songs) {
                    res.send(songs);
                } else {
                    res.sendStatus(404);
                }
            });
        });
    });

    // //////////////
    // app.delete('/api/show/delete/:id', function(req, res) {
    //     Shows.findByIdAndRemove(req.params.id,
    //         function(err) {
    //             if (err) throw err;
    //             Shows.find({}, function(err, shows) {
    //                 if (err) throw err;
    //                 res.send(shows);
    //             });
    //             //res.send('Successfully Removed!');
    //         });
    // });
    // //////////////

    //UPDATE a single song instance from queryParams
    app.put('/api/song/:id', function(req, res) {
        //update existing show
        Songs.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, function(err, song) {
            if (err) {
                res.status(400).send(err.errors);
            } else if (song) {
                res.status(202).send(song);
            } else {
                res.sendStatus(404);
            }
        });
    });

    function validateQueryParams(req) {
        var queryParams = req.query;
        var validParams = {};

        if (!queryParams) {
            return validParams;
        }

        if (queryParams.hasOwnProperty('title') &&
            queryParams.title.trim().length > 0) {
            title = new RegExp(queryParams.title.trim(), "i");
            aka = {
                $in: [new RegExp(queryParams.title.trim(), "i")]
            };

            validParams.$or = [{
                'title': title
            }, {
                'aka': aka
            }];
        }
        if (queryParams.hasOwnProperty('aka')) {
            //Don't do anything even if the user entered in aka
            console.log("Querying by aka isn't allowed.");
        }
        if (queryParams.hasOwnProperty('machine')) {
            if (queryParams.machine.trim().toUpperCase() === "A") {
                validParams.machine = "A";
            } else if (queryParams.machine.trim().toUpperCase() === "B") {
                validParams.machine = "B";
            } else {
                //Don't do anything even if the user entered in incorrect machine value
                console.log("machine must be only one character long and either A or B.");
            }
        }
        if (queryParams.hasOwnProperty('played')) {
            validParams.played = {
                $gt: new Date(queryParams.played)
            };
        }
        if (queryParams.hasOwnProperty('sequence')) {
            //Don't do anything even if the enter in sequence
            console.log("Querying by sequence isn't allowed.");
        }
        if (queryParams.hasOwnProperty('tithing')) {
            if (queryParams.tithing === 'true' || queryParams.tithing === 't') {
                validParams.tithing = true;
            } else if (queryParams.tithing === 'false' || queryParams.tithing === 'f') {
                validParams.tithing = false;
            }
        }
        if (queryParams.hasOwnProperty('note') &&
            queryParams.note.trim().length > 0) {
            validParams.note = new RegExp(queryParams.note.trim(), "i");
        }
        return validParams;
    }
}
