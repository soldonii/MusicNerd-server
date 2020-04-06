const express = require('express');
const authenticateUser = require('../middlewares/authentication');

const gameController = require('../controllers/game.controller');

const router = express.Router();

router.get('/', authenticateUser, gameController.getGames);

router.post('/', authenticateUser, gameController.makeGame);

// router.post('/games/:gameId', authenticateUser, gameController.makeGame);

module.exports = router;
