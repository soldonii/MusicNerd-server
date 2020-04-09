const User = require('../models/User');
const Artist = require('../models/Artist');

exports.getFavoriteArtists = async (req, res) => {
  const { userId } = res.locals;
  const { favorite_artists: favoriteArtists } = await User.findById(userId);

  try {
    const artistList = await Artist.find().select('-spotify_artist_id -tracks -genres').lean();

    res.status(200).json({ artistList, favoriteArtists });
  } catch (err) {
    console.error('get favorite artists error', err);
    res.status(500).json({
      errorMessage: 'Server error. Please try again.'
    });
  }
};

exports.saveFavoriteArtists = async (req, res) => {
  const { userId } = res.locals;
  const favorite_artists = Object.keys(req.body);

  try {
    await User.findByIdAndUpdate(userId, { favorite_artists });

    res.status(200).end();
  } catch (err) {
    console.error('save favorite artists error', err);
    res.status(500).json({
      errorMessage: 'Server error. Please try again.'
    });
  }
};
