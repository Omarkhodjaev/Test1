class VariantBadRequestException extends Error {
  constructor() {
    super("title, description,question_id, and is_correct must be required!");

    this.statusCode = 400;
  }
}

class questionIdNotfound extends Error{
  constructor(){
    super("This question is not found")
  }
}

module.exports = {
  VariantBadRequestException,
  questionIdNotfound
};
