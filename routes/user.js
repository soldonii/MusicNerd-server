const express = require('express');
const router = express.Router();

const authenticateUser = require('../middlewares/authentication.js');
const userController = require('../controllers/user.controller');

router.get('/:user_id/favorites', authenticateUser, userController.getFavoriteArtists);


module.exports = router;
