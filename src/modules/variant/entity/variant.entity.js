class Variant {
    constructor(id, title, description, questionId, isCorrect) {
      this.id = id;
      this.title = title;
      this.description = description;
      this.question_id = questionId;
      this.is_correct = isCorrect;
    }
  }
  
  module.exports = Variant;