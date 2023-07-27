const { ERROR_UNAUTHORIZED } = require('./error');

class ErrorUnauthorized extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_UNAUTHORIZED;
  }
}

module.exports = ErrorUnauthorized;
