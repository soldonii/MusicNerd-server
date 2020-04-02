const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const gameSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxlength: 20,
    unique: true
  },
  genre: {
    type: String,
    required: true
  },
  thumbnail: {
    type: String,
    required: true
  },
  is_playing: {
    type: Boolean,
    required: true,
    default: false
  },
  created_by: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  participants: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  play_result: [{
    userId: mongoose.Types.ObjectId,
    score: {
      type: Number,
      required: true
    }
  }]
});

module.exports = mongoose.model('Game', gameSchema);
