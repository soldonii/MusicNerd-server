const User = require('../models/User');
const Game = require('../models/Game');

exports.getGames = async (req, res) => {
  try {
    const allGames = await Game.find().lean();

    res.status(200).json({ allGames });
  } catch (err) {
    console.log('err', err);
    res.status(500).json({
      errorMessage: 'Server error. Please try again.'
    });
  }
};

exports.makeGame = async (req, res) => {
  const { userId, gameTitle } = req.body;

  try {
    const game = await Game.findOne({ game_title: gameTitle }).lean();

    if (game) {
      return res.status(400).json({
        errorMessage: 'Same title already exists. Please try another game title.'
      });
    }

    const newGame = await Game.create({
      game_title: gameTitle,
      thumbnail: `${process.env.AMAZON_S3_URI}/game_cover/gameCover${Math.floor(Math.random()*6)}.jpg`,
      is_playing: false,
      created_by: userId,
      participants: [userId],
      play_result: []
    });

    res.status(200).json({
      createdGameId: newGame._id
    });
  } catch (err) {
    console.log('err', err);
    res.status(500).json({
      errorMessage: 'Server error. Please try again.'
    });
  }
};
