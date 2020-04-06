const express = require('express');

const authenticateUser = require('../middlewares/authentication');
const waitingController = require('../controllers/waiting.controller');

const router = express.Router();

router.get('/', authenticateUser, waitingController.getGames);

router.post('/', authenticateUser, waitingController.makeGame);

// router.get('/:gameId', authenticateUser, waitingController.enterGame);

// router.post('/games/:gameId', authenticateUser, waitingController.makeGame);

module.exports = router;
