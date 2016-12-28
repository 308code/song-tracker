var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var songSchema = new Schema({
    title : String,
    aka: [{
      type: String
    }],
    machine: String,
    played : Date,
    sequence : [{
      type: String
    }],
    tithing : Boolean,
    note : String
});

var Songs = mongoose.model('Songs', songSchema);

module.exports = Songs;
