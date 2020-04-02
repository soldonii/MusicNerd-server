require('dotenv').config();
require('./config/mongoose');

const http = require('http');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const authRouter = require('./routes/auth');

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', authRouter);

// app.use('/', (req, res, next) => {
//   res.json({ result: 'ok' });
// });

app.use((req, res, next) => {
  next(new Error('invalid url'));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500).json({ error: 'invalid url' });
});

server.listen(process.env.PORT, () => console.log(`Server is running on PORT ${process.env.PORT}`));

module.exports = app;
