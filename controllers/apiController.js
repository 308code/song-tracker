var Songs = require('../models/songModel');
var bodyParser = require('../node_modules/body-parser');

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

    //GET all songs
    app.get('/api/songs', function(req, res) {
        Songs.find({}, null,{sort: {played: -1}}, function(err, songs) {
            if (err) throw err;
            res.send(songs);
        });
    });

    //GET a single song instance
    app.get('/api/song/:id', function(req, res) {
        Songs.findById({
            _id: req.params.id
        }, function(err, song) {
            if (err) throw err;
            res.send(song);
        });
    });

    //CREATE an new entry if _id doesn't exist or update if it does.
    app.post('/api/songs', function(req, res) {
        if (req.body._id) {
            //update existing show
            Shows.findByIdAndUpdate(req.body._id, {
                title: req.body.title,
                aka: req.body.aka,
                machine: req.body.machine,
                played: req.body.played,
                sequence: req.body.sequence,
                tithing: req.body.tithing,
                note: req.body.note
            }, function(err, song) {
                if (err) throw err;
                res.send(song);
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
                if (err) throw err;
                res.send(song);
            });
        }
    });

    //DELETE a single song instance
    app.delete('/api/song/:id', function(req, res) {
        Songs.findByIdAndRemove(req.params.id,
            function(err) {
                if (err) throw err;
                Songs.find({}, function(err, songs) {
                    if (err) throw err;
                    res.send(songs);
                });
            });
    });
}
