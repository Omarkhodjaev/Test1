class userNotFound extends Error {
  constructor() {
    super("User ID not found");

    statusCode = 404;
  }
}

class testNotFound extends Error {
  constructor() {
    super("test ID not found");

    statusCode = 404;
  }
}

class testAndUserIdBadRequest extends Error {
  constructor(message) {
    super(message);

    this.statusCode = 403;
  }
}

module.exports = { userNotFound, testNotFound, testAndUserIdBadRequest };
