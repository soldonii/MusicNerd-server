const User = require('../models/User');
const Game = require('../models/Game');

exports.getGames = async (req, res, next) => {
  const { userId } = res.locals;
};

exports.makeGame = async (req, res) => {
  const { userId, gameTitle } = req.body;

  try {
    const newGame = await Game.create({
      game_title: gameTitle,
      thumbnail: `${process.env.AMAZON_S3_URI}/game_cover/gameCover${Math.floor(Math.random()*8)}.png`,
      is_playing: false,
      created_by: userId,
      participants: [userId],
      play_result: []
    });

    res.status(200).json({
      gameId: newGame._id,
      gameTitle,
      thumbnail: newGame.thumbnail,
      isPlaying: false,
      createdBy: userId,
      participants: [userId],
      playResult: []
    });
  } catch (err) {
    console.log('err', err);
    res.status(500).json({
      errorMessage: 'Server error. Please try again.'
    });
  }
};
