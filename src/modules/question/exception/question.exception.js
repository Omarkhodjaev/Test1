class QuestionBadRequestException extends Error {
  constructor() {
    super("title must be required");

    this.statusCode = 400;
  }
}

class questionIdMustBeNumberException extends Error {
  constructor() {
    super("Question id must be number");

    this.statusCode = 400;
  }
}

class QuestionNotFoundException extends Error {
  constructor() {
    super("Question not found");

    this.statusCode = 404;
  }
}

module.exports = {
  QuestionBadRequestException,
  questionIdMustBeNumberException,
  QuestionNotFoundException,
};
