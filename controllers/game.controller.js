// const User = require('../models/User');
// const Game = require('../models/Game');

// const gameInfo = {};

// exports.makeConnection = async (req, res) => {
//   const io = req.app.get('io');
//   const { gameId } = req.params;
//   const { userId } = res.locals;

//   const user = await User.findById(userId);
//   const game = await Game.findById(gameId);
//   const { username, thumbnail_url: thumbnailUrl } = user;

//   res.status(200).json({ game, user: { username, thumbnailUrl } });

//   io.on('connect', socket => {
//     // console.log('connected1') 여긴 들어옴.
//     socket.on('enterRoom', message => {
//       console.log('enterRoom', enterRoom)
//       socket.join(gameId, () => {
//         gameInfo[gameId] = {};
//         let rooms = Object.keys(socket.rooms);
//         console.log('message', message);

//         console.log('rooms', rooms);
//         console.log(`A ${username} has been joined to ${gameId} socket room!`);
//         gameInfo[gameId][users] = username;
//         console.log('gameInfo', gameInfo);

//         io.to(gameId).emit(`${username} has joined to the room.`);
//       });
//     });
//   });
// }

// // user join할 때마다, 해당 user의 favoriteArtist를 중복 제거하여 모아두어야 함
