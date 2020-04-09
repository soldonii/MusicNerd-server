const User = require('../models/User');
const Game = require('../models/Game');
const Artist = require('../models/Artist');
const Track = require('../models/Track');

const storage = {};

module.exports = io => {
  io.on('connect', socket => {
    console.log('socket connected');

    let currentUser, currentGame;

    socket.on('join room', async clientData => {
      console.log('join room');
      socket.join(clientData.gameId);

      const { userId, gameId } = clientData;

      try {
        currentUser = await User.findById(userId);
        const { username, thumbnail_url } = currentUser;

        currentGame = await Game.findByIdAndUpdate(
          gameId,
          { '$push': { participants: { userId, username, thumbnail_url } }},
          { new: true }
        );

        storage[gameId] = {
          participants: [],
          readyStatus: {}
        };

        io.to(currentGame._id).emit('participants', currentGame.participants);
      } catch (err) {
        console.error('get current user and game error', err);
      }
    });

    socket.on('request game creator', async gameId => {
      try {
        const { created_by: gameCreator } = await Game.findById(gameId);

        io.to(gameId).emit('gameCreator', gameCreator);
      } catch (err) {
        console.error('request game creator', err);
        res.status(500).json({
          errorMessage: 'Server error. Please try again.'
        });
      }
    });

    socket.on('leave room', async clientData => {
      const { userId, gameId } = clientData;
      socket.leave(gameId);

      try {
        const currentGame = await Game.findByIdAndUpdate(
          gameId,
          { $pull: { participants: { userId } }},
          { new: true }
        );

        if (!currentGame.participants.length) {
          await Game.deleteOne({ _id: gameId });
        }

        io.to(gameId).emit('participants', currentGame.participants);
      } catch (err) {
        console.error('socket leave room error', err);
        res.status(500).json({
          errorMessage: 'Server error. Please try again.'
        });
      }
    });

    socket.on('on ready', userId => {
      const gameId = currentGame._id;
      storage[gameId].readyStatus = { ...storage[gameId].readyStatus, [userId]: true };

      io.to(gameId).emit('ready status', storage[gameId].readyStatus);
    });

    socket.on('off ready', userId => {
      const gameId = currentGame._id;
      storage[gameId].readyStatus[userId] = false;

      io.to(gameId).emit('ready status', storage[gameId].readyStatus);
    });

    // Chat message 관련 로직
    // chatMessage {
    //   userId: '5e8e16e2a749e263f17f9547',
    //   message: 'hi my name is doniisol'
    // }
    socket.on('send message', message => {
      const gameId = currentGame._id;

      io.to(gameId).emit('chat messages', { username: currentUser.username, message });
    });

    socket.on('start game', () => {
      currentGame.updateOne({ is_playing: true });

      // 1. is_playing을 true로 바꾼다. => client에서는 해당 게임이 is_playing true이면 못 들어오게 waiting room에서 작업
      // 2. 모든 참여자들의 공통 favorite artist list를 중복 제거하여 꾸린다.
      // 3. favorite Artist List에서 출제 대상이 되는 track을 10개 random으로 list를 만든다.
      // 4. 해당 list는 [{..}] 객체를 담은 배열이고, 객체는 title, album_type, thumbnail, release_data, artist, audio_url을 담고 있어야 한다. (사실상 Artist 객체의 모양 그대로 가져다 주면 됨.)
      // 5. 해당 배열이 준비되면, global 변수로 해당 배열을 세팅해 놓는다.
      // 6. 해당 배열의 마지막 음원을 뽑아서 클라이언트에 보낸다.
      // 7. 음원을 하나씩 보낼 때마다 배열의 길이를 뒤에서 pop해서 줄여주고, 최종적으로 배열 길이가 0이 되면 game end event를 emit.
    });
  });
};

