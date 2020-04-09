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
      participants.forEach(player => {
        const { favorite_artists: favoriteArtists } = player;

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

      currentTrack = trackList[trackList.length - 1];

      socket.emit('send a track', currentTrack.audio_url);
    });

    socket.on('send message', message => {
      const gameId = currentGame._id;

      if (!currentTrack) {
        io.to(gameId).emit('chat messages', { username: currentUser.username, message });
      } else {
        const { title: titleAnswerList, artist: { names: artistAnswerList } } = currentTrack;

        let doesMatchArtist, doesMatchTitle = false;

        for (const artist of artistAnswerList) {
          if (message.includes(artist)) {
            doesMatchArtist = true;
            break;
          }
        }

        for (const title of titleAnswerList) {
          if (message.includes(title)) {
            doesMatchTitle = true;
            break;
          }
        }

        if (doesMatchArtist && doesMatchTitle) {
          console.log('currentTrack before', currentTrack);
          trackList.pop();
          currentTrack = trackList[trackList.length - 1];

          console.log('currentTrack after', currentTrack);
          io.to(gameId).emit('correct answer', {
            username: currentUser.username,
            trackUrl: currentTrack.audio_url
          });
        } else {
          io.to(gameId).emit('chat messages', { username: currentUser.username, message });
        }

      }
      // 받는 message는 그냥 순수 string 텍스트
      // targetTrack이 세팅이 된 경우, 즉 게임 시작 요청을 받은 경우에는 아래 로직.
        // 이 message가 현재 targetTrack의 title 배열(노래제목 정답 후보군)과 일치하는지,
        // 그리고 message가 현재 targetTrack의 artist 배열(가수 정답 후보군)과 일치하는지 로직 작성..
        // 일치할 경우에는 정답 event..

      // targetTrack이 undefined인 경우는 게임 시작 전 대기실에서의 상황
      // 이 때는 그냥 chat message를 emit하는 아래 로직

    });





  });
};

