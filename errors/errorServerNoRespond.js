const { SERVER_ERROR } = require('./error');

class ErrorServer extends Error {
  constructor(message) {
    super(message);
    this.statusCode = SERVER_ERROR;
  }
}

module.exports = ErrorServer;
