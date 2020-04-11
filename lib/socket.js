const User = require('../models/User');
const Game = require('../models/Game');
const Artist = require('../models/Artist');
const Track = require('../models/Track');

const storage = {};

module.exports = io => {
  io.on('connect', socket => {
    console.log('socket connected');

    io.emit('success connection'); // socket을 state에 저장하기 위한..

    let currentUser, currentGame;

    socket.on('join room', async clientData => {
      console.log('join room');
      const { userId, gameId } = clientData;
      socket.join(gameId);

      try {
        currentUser = await User.findById(userId);
        const { username, thumbnail_url, favorite_artists } = currentUser;

        currentGame = await Game.findByIdAndUpdate(
          gameId,
          { '$push': { participants: { userId, username, thumbnail_url, favorite_artists } }},
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

    let trackList = [];
    let currentTrack;

    socket.on('request game start', async participants => {
      currentGame.updateOne({ is_playing: true });

      const commonArtists = {};
      participants.forEach(participant => {
        const { favorite_artists: favoriteArtists } = participant;

        favoriteArtists.forEach(artist => {
          if (!commonArtists[artist]) {
            commonArtists[artist] = true;
          }
        });
      });

      let allTracks = [];
      for (const artistId in commonArtists) {
        const artist = await Artist.findById(artistId);
        allTracks = allTracks.concat(artist.tracks);
      }

      while (trackList.length < 10) {
        const randomTrackId = allTracks[Math.floor(Math.random() * allTracks.length)];
        const trackInfo = await Track.findById(randomTrackId).populate('artist');

        trackList.push(trackInfo);
      }

      socket.emit('ready to start');
      // currentTrack = trackList[trackList.length - 1];
      // socket.emit('send a track', currentTrack.audio_url);
    });

    socket.on('request new track', () => {
      const gameId = currentGame._id;
      currentTrack = trackList[trackList.length - 1];
      trackList.pop();

      if (currentTrack) {
        io.to(gameId).emit('send a track', currentTrack);
      }

      // 더 이상 보내줄 track이 없으면 클라이언트에 노래 없다는 이벤트 보내주기
        // 노래 없다는 이벤트에는 현재까지 누적된 점수를 같이 보내줘야됨.
        // 그러려면 정답 맞출 때마다 해당 기록을 서버쪽에서 보관하고 있어야 된다.
        // 그리고 노래 없다는 이벤트 보내줄 땐, 현재까지 누적된 기록을 db에 저장한다.
        // db의 playLog 쪽? 거기에 저장해야된다.
      // 클라이언트는 게임 없다는 이벤트 받으면 canStartGame(이거 이름 바꾸기)을 false로 바꾸기
      // 아니 저건 그대로 두고, gameEnd 이런거 만들어서 그거를 true로 바꿔주고.
      // gameEnd가 true이면 Modal 띄우고 순위 알려주기
    });

    socket.on('send message', message => {
      const gameId = currentGame._id;

      if (!currentTrack) {
        console.log('게임 시작 전')
        io.to(gameId).emit('chat messages', { username: currentUser.username, message });
      } else {
        const { title: titleAnswerList, artist: { names: artistAnswerList } } = currentTrack;

        let doesMatchArtist, doesMatchTitle = false;

        for (let artist of artistAnswerList) {
          artist = artist.replace(/ /g, '').toLowerCase();
          if (message.replace(/ /g, '').toLowerCase().includes(artist)) {
            doesMatchArtist = true;
            break;
          }
        }

        for (let title of titleAnswerList) {
          title = title.replace(/ /g, '').toLowerCase();
          if (message.replace(/ /g, '').toLowerCase().includes(title)) {
            doesMatchTitle = true;
            break;
          }
        }

        if (doesMatchArtist && doesMatchTitle) {
          console.log('정답')
          io.to(gameId).emit('correct answer', { username: currentUser.username, message });
        } else {
          console.log('오답')
          io.to(gameId).emit('chat messages', { username: currentUser.username, message });
        }

      }
      // 받는 message는 그냥 순수 string 텍스트
      // targetTrack이 세팅이 된 경우, 즉 게임 시작 요청을 받은 경우에는 아래 로직.
        // 이 message가 현재 targetTrack의 title 배열(노래제목 정답 후보군)과 일치하는지,
        // 그리고 message가 현재 targetTrack의 artist 배열(가수 정답 후보군)과 일치하는지 로직 작성..
        // 일치할 경우에는 정답 event..

    });





  });
};

