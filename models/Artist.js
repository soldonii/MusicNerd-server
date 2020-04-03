const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const artistSchema = new Schema ({
  artist_id: {
    type: String,
    required: true,
    unique: true
  },
  thumbnail: {
    height: Number,
    url: String,
    width: Number,
  },
  name: {
    type: String,
    required: true
  },
  genres: {
    type: [String]
  },
  songs: [{
    type: Schema.Types.ObjectId,
    ref: 'Song'
  }]
});

module.exports = mongoose.model('Artist', artistSchema);
