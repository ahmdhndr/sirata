const express = require('express');
const morgan = require('morgan');
const compression = require('compression');
const helmet = require('helmet');

const api = require('./api');
const { notFoundError, errorHandler } = require('./errorMiddlewares');

const app = express();
app.use(morgan('tiny'));
app.use(compression());
app.use(helmet());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to: Sistem Informasi Rukun Tetangga',
  });
});

app.use('/api/v1', api);

app.use(notFoundError);
app.use(errorHandler);

module.exports = app;
