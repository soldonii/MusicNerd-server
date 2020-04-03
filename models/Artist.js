const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const artistSchema = new Schema ({
  spotify_artist_id: {
    type: String,
    required: true,
    unique: true
  },
  thumbnail: {
    height: Number,
    url: String,
    width: Number,
  },
  name: [String],
  genres: [String],
  tracks: [{
    type: Schema.Types.ObjectId,
    ref: 'Track'
  }]
});

module.exports = mongoose.model('Artist', artistSchema);
