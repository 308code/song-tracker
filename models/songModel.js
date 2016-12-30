var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var songSchema = new Schema({
    title : {
      type: String,
      required: [true,"Tile is required!"]
    },
    aka: [{
      type: String
    }],
    machine: {
      type: String,
      enum: ['A', 'B']
    },
    played: {
      type: Date,
      required: [true,"Date played is required!"],
      default: Date.now
    },
    sequence : [{
      type: String
    }],
    tithing : {
      type: Boolean
    },
    note : {
      type: String
    }
});

var Songs = mongoose.model('Songs', songSchema);

module.exports = Songs;
