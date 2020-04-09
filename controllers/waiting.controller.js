const User = require('../models/User');
const Game = require('../models/Game');

exports.getGames = async (req, res) => {
  try {
    const gameList = await Game.find().lean();

    res.status(200).json({ gameList });
  } catch (err) {
    console.error('getGames error', err);
    res.status(500).json({
      errorMessage: 'Server error. Please try again.'
    });
  }
};

exports.makeGame = async (req, res) => {
  try {
    const { userId, gameTitle } = req.body;
    const game = await Game.findOne({ game_title: gameTitle }).lean();

    if (game) {
      return res.status(400).json({
        errorMessage: 'Same title already exists. Please try another game title.'
      });
    }

    const newGame = await Game.create({
      game_title: gameTitle,
      thumbnail_url: `${process.env.AMAZON_S3_URI}/game_cover/gameCover${Math.floor(Math.random()*6)}.jpg`,
      is_playing: false,
      created_by: userId,
      participants: [],
      score: {}
    });

    res.status(200).json({
      gameId: newGame._id
    });
  } catch (err) {
    console.log('err', err);
    res.status(500).json({
      errorMessage: 'Server error. Please try again.'
    });
  }
};

exports.enterGame = async (req, res) => {
  const { userId } = res.locals;
  const { gameId } = req.body;

  try {
    const currentUser = await User.findById(userId);
    const targetGame = await Game.findById(gameId);
    const hasUserJoined = targetGame.participants.findIndex(player => {
      return player.userId.toString() === userId
    }) > -1 ? true : false;

    if (hasUserJoined) {
      return res.status(400).json({
        errorMessage: 'Cannot join the room.'
      });
    }

    if (targetGame.participants.length >= 8) {
      return res.status(400).json({
        errorMessage: 'Max capacity of room exceeds.'
      });
    }

    // 방에 입장할 수 있는 경우(정원 8명 이하인 경우)
    // const { username, thumbnail_url } = currentUser;
    // await targetGame.updateOne({
    //   participants: [ ...targetGame.participants, { userId, username, thumbnail_url } ]
    // });

    res.status(200).json({
      result: 'success'
    });
  } catch (err) {
    console.log('error', err)
    res.status(500).json({
      errorMessage: 'Server error. Please try again.'
    });
  }
};
