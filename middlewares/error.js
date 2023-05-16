const http2 = require('node:http2');

const handlerError = (err, req, res, next) => {
  const { statusCode = http2.constants.HTTP_STATUS_INTERNAL_SERVER_ERROR, message } = err;
  res.status(statusCode).send({ message: statusCode === http2.constants.HTTP_STATUS_INTERNAL_SERVER_ERROR ? 'Произошла ошибка на сервере' : message });
  next();
};

module.exports = handlerError;
