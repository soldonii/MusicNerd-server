const User = require('../models/User');
const Artist = require('../models/Artist');

exports.getFavoriteArtists = async (req, res, next) => {
  // db에서 artist 정보를 가져와서 화면에 뿌려주기
  // 뿌려줄 때, 기존에 user가 좋아하는 가수 체크했을 경우 표시해주기
  const { userId } = res.locals;

  try {
    const artistList = await Artist.find().select('-spotify_artist_id -tracks -genres');
    res.status(200).json({ artistList });
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


// req.body = {
//   '5e893af1f513d45366f7e742': true,
//   '5e893afef513d45366f7e76c': true,
//   '5e893b00f513d45366f7e772': true,
//   '5e893b02f513d45366f7e778': true,
//   '5e893af7f513d45366f7e757': true
// }