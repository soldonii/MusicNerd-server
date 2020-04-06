const Game = require('../models/Game');

exports.allowEnterGame = async (req, res) => {
  const { userId } = res.locals;
  const io = req.app.get('io');
  const { gameId } = req.body;

  try {
    const targetGame = await Game.findById(gameId);
    console.log('targetgame', targetGame);
    const hasUserJoined = targetGame.participants.findIndex(id => id === userId);

    if (hasUserJoined > -1) {
      return res.status(400).json({
        errorMessage: 'Cannot join the room.'
      });
    }

    await targetGame.updateOne({ participants: [...targetGame.participants, userId] });
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

