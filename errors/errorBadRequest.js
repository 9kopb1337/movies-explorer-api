const { ERROR_BAD_REQUEST } = require('./error');

class ErrorBadRequest extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_BAD_REQUEST;
  }
}

module.exports = ErrorBadRequest;
