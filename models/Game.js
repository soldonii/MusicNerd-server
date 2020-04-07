const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const gameSchema = new Schema({
  game_title: {
    type: String,
    required: true,
    maxlength: 20,
    unique: true
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
  score: {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    points: Number,
    default: {}
  }
}, { minimize: false });

module.exports = mongoose.model('Game', gameSchema);
