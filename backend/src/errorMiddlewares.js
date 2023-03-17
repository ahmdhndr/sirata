/* eslint-disable no-unused-vars */
function notFoundError(req, res, next) {
  res.status(404);
  const error = new Error(`Not found - ${req.originalUrl}`);
  next(error);
}

function errorHandler(error, req, res, next) {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    status: res.statusCode ? 'fail' : 'error',
    message: error.message || 'Something went wrong!',
    stack: process.env.NODE_ENV === 'production' ? '' : error.stack,
  });
}

module.exports = {
  notFoundError,
  errorHandler,
};
