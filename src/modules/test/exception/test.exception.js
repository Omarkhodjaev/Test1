class TestBadRequestException extends Error {
  constructor(message) {
    super(message);

    this.statusCode = 400;
  }
}

class TestIdMustBeNumberException extends Error {
  constructor() {
    super("Test id must be number");

    this.statusCode = 400;
  }
}

class TestNotFoundException extends Error {
  constructor() {
    super("Test not found");

    this.statusCode = 404;
  }
}

module.exports = {
  TestBadRequestException,
  TestIdMustBeNumberException,
  TestNotFoundException,
};
