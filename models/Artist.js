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


// 참고사항
// Artist 정보 from https://developer.spotify.com/console/get-artist/
// {
//   "external_urls": {
//     "spotify": "https://open.spotify.com/artist/0siBQaURCli5wn2lqv8WZg"
//   },
//   "followers": {
//     "href": null,
//     "total": 272931
//   },
//   "genres": [
//     "k-pop",
//     "korean r&b"
//   ],
//   "href": "https://api.spotify.com/v1/artists/0siBQaURCli5wn2lqv8WZg",
//   "id": "0siBQaURCli5wn2lqv8WZg",
//   "images": [
//     {
//       "height": 640,
//       "url": "https://i.scdn.co/image/871d6a3b58596006062dbf16ed6d149b7a88c410",
//       "width": 640
//     },
//     {
//       "height": 320,
//       "url": "https://i.scdn.co/image/5f7bf525f25e2c94cacbbffddcc1e04eca1168c4",
//       "width": 320
//     },
//     {
//       "height": 160,
//       "url": "https://i.scdn.co/image/7def7a9f6385853caf1c3c97f07a6c5bc6705bfa",
//       "width": 160
//     }
//   ],
//   "name": "DPR LIVE",
//   "popularity": 63,
//   "type": "artist",
//   "uri": "spotify:artist:0siBQaURCli5wn2lqv8WZg"
// }

