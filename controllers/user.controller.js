const User = require('../models/User');
const Artist = require('../models/Artist');

exports.getFavoriteArtists = async (req, res, next) => {
  // db에서 artist 정보를 가져와서 화면에 뿌려주기
  // 뿌려줄 때, 기존에 user가 좋아하는 가수 체크했을 경우 표시해주기

  const artistList = await Artist.find().select('-spotify_artist_id -tracks');
  res.status(200).json({ artistList });
};
