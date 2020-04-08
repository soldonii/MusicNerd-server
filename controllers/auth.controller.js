const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../models/User');

exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        errorMessage: 'Email address already taken.'
      });
    }

    if (username === user.username) {
      return res.status(400).json({
        errorMessage: 'Username already taken.'
      });
    }

    bcrypt.hash(password, 12, async (err, hashedPassword) => {
      if (err) {
        console.error('bcrypt hash error', err);
        return res.status(500).json({
          errorMessage: 'Server error. Please try again.'
        });
      }

      const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
        thumbnail_url: `${process.env.AMAZON_S3_URI}/user_profile/profile${Math.floor(Math.random()*9)}.png`,
        favorite_artists: [],
        favorite_tracks: [],
        play_log: []
      });

      const payload = { userId: newUser._id };

      jwt.sign(
        payload,
        process.env.JWT_SECRET_KEY,
        { expiresIn: 1000 * 60 * 60 },
        (err, token) => {
          if (err) {
            console.error('jwt sign error', err);
            return res.status(500).json({
              errorMessage: 'Server error. Please try again.'
            });
          }

          res.status(200).end();
        }
      );
    });
  } catch (err) {
    console.error('Sign up error', err);
    res.status(500).json({
      errorMessage: 'Server error. Please try again.'
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        errorMessage: 'Cannot find user.'
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({
        errorMessage: 'Invalid password.'
      });
    }

    const payload = { userId: user._id };

    jwt.sign(
      payload,
      process.env.JWT_SECRET_KEY,
      { expiresIn: 1000 * 60 * 60 },
      (err, token) => {
        if (err) {
          console.error('jwt sign error', err);
          return res.status(500).json({
            errorMessage: 'Server error. Please try again.'
          });
        }

        res.status(200).json({ token, userId: user._id });
      }
    );
  } catch (err) {
    console.error('login error', err);
    res.status(500).json({
      errorMessage: 'Server error. Please try again.'
    });
  }
};

// const axios = require('axios');
// const qs = require('querystring');
// const artists = require('../lib/artists');

// const Artist = require('../models/Artist');
// const Track = require('../models/Track');

// exports.saveArtistsAndTracks = async (req, res, next) => {
//   const headers = {
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/x-www-form-urlencoded',
//     },
//     auth: {
//       username: process.env.SPOTIFY_CLIENT_ID,
//       password: process.env.SPOTIFY_CLIENT_SECRET,
//     }
//   };

//   try {
//     const response = await axios.post(
//       'https://accounts.spotify.com/api/token',
//       qs.stringify({ grant_type: 'client_credentials' }),
//       headers
//     );

//     const { access_token: token } = response.data;

//     for (const artist in artists) {
//       const { spotifyArtistId, artistNameList, trackList } = artists[artist];
//       const artistResponse = await axios.get(`https://api.spotify.com/v1/artists/${spotifyArtistId}`, {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });
//       console.log('request starts!');

//       const { images: artistImageList, genres } = artistResponse.data;
//       const tracks = [];
//       let newArtist;

//       try {
//         newArtist = await Artist.create({
//           spotify_artist_id: spotifyArtistId,
//           thumbnail: artistImageList[0],
//           names: artistNameList,
//           genres,
//           tracks,
//           liked_by: []
//         });
//       } catch (err) {
//         console.error('artist error', err);
//       }

//       for (const track of trackList) {
//         const { trackId, titleList } = track;
//         const trackResponse = await axios.get(`https://api.spotify.com/v1/tracks/${trackId}`, {
//           headers: { 'Authorization': `Bearer ${token}` }
//         });

//         const { album: { album_type, images: albumImageList, release_date } } = trackResponse.data;

//         try {
//           const newTrack = await Track.create({
//             spotify_track_id: trackId,
//             title: titleList,
//             album_type,
//             thumbnail: albumImageList[0],
//             release_date,
//             artist: newArtist._id,
//             audio_url: '123123'
//           });

//           tracks.push(newTrack._id);
//         } catch (err) {
//           console.error('track error', err);
//         }
//       }

//       await newArtist.updateOne({ tracks });
//     }
//     console.log('all artists and tracks are saved successfully!');
//   } catch (err) {
//     console.error(err)
//   }
// };

