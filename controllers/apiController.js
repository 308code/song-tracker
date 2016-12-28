var Songs = require('../models/songModel');
var bodyParser = require('../node_modules/body-parser');

module.exports = function(app) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.get('/api/songs', function(req, res) {
        Songs.find({}, null,{sort: {played: -1}}, function(err, songs) {
            if (err) throw err;
            res.send(songs);
        });
    });
  }
