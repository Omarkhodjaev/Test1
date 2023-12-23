class VariantBadRequestException extends Error {
  constructor(message) {
    super(message);

    this.statusCode = 400;
  }
}

class questionIdNotfound extends Error {
  constructor() {
    super("This question is not found");
  }
}

class VariantIdMustBeNumberException extends Error {
  constructor(message) {
    super(message);

    this.statusCode = 400;
  }
}

module.exports = {
  VariantBadRequestException,
  questionIdNotfound,
  VariantIdMustBeNumberException,
};
