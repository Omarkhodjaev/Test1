class Variant {
    constructor(id, title, description, questionId, isCorrect) {
      this.id = id;
      this.title = title;
      this.description = description;
      this.questionId = questionId;
      this.isCorrect = isCorrect;
    }
  }
  
  module.exports = Variant;