const User = require('../models/User');
const Artist = require('../models/Artist');

exports.getFavoriteArtists = async (req, res) => {
  const { userId } = res.locals;
  const { favorite_artists: favoriteArtists } = await User.findById(userId);

  try {
    const artistList = await Artist.find().select('-spotify_artist_id -tracks -genres').lean();
    res.status(200).json({ artistList, favoriteArtists });
  } catch (err) {
    res.status(500).json({
      errorMessage: 'Server error. Please try again.'
    });
  }
};

exports.saveFavoriteArtists = async (req, res, next) => {
  const { userId } = res.locals;
  const favoriteArtists = Object.keys(req.body);

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { favorite_artists: favoriteArtists },
      { new: true }
    );

    res.status(200).json({
      result: 'ok'
    });
  } catch (err) {
    res.status(500).json({
      errorMessage: 'Server error. Please try again.'
    });
  }
};
