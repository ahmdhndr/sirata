const InvariantError = require('../exceptions/InvariantError');
const NotFoundError = require('../exceptions/NotFoundError');

const handleError = (error, res, next) => {
  if (error instanceof NotFoundError || error instanceof InvariantError)
    res.status(error.statusCode || 500);
  next(error);
};

module.exports = handleError;
