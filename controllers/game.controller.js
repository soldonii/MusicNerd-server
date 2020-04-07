const User = require('../models/User');
const Game = require('../models/Game');

exports.makeConnection = async (req, res, next) => {
  const io = req.app.get('io');
  const { gameId } = req.params;
  const { userId } = res.locals;

  const user = await User.findById(userId);
  const game = await Game.findById(gameId);

  if (game.participants.length >= 8) {
    return res.status(400).json({
      errorMessage: 'Max capacity of room exceeds.'
    });
  }

  // 방에 입장할 수 있는 경우(정원 8명 이하인 경우)
  await game.updateOne({ participants: [ ...game.participants, userId ] });
  const { username } = user;
  res.status(200).json({ game, username });

  io.on('connect', socket => {
    socket.join(gameId, () => {
      // user join할 때마다, 해당 user의 favoriteArtist를 중복 제거하여 모아두어야 함
      console.log(`A ${username} has been joined to ${gameId} socket room!`);

      io.to(gameId).emit(`${username} has joined to the room.`);
    });
  });
}



