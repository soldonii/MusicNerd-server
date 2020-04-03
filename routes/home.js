const express = require('express');
const router = express.Router();

const homeController = require('../controllers/home.controller');

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

module.exports = router;
