const User = require('../models/User');
const Game = require('../models/Game');

module.exports = io => {
  io.on('connect', socket => {
    console.log('socket connected');

    socket.on('enter room', async clientData => {
      const { userId, gameId } = clientData;
      socket.join(gameId);

      console.log('enter room')
      console.log('userId', userId)
      console.log('gameId', gameId);

      const { username, thumbnail_url } = await User.findById(userId);
      const currentGame = await Game.findByIdAndUpdate(
        gameId,
        { '$push': { participants: { userId, username, thumbnail_url } }},
        { new: true }
      );

      console.log('currentGame', currentGame);

      io.to(gameId).emit('participants', currentGame.participants);
    });
  });
}
