const express = require('express');
const router = express.Router();

const authenticateUser = require('../middlewares/authentication');
const gameController = require('../controllers/game.controller');

router.put('/', authenticateUser, gameController.allowEnterGame);

module.exports = router;
