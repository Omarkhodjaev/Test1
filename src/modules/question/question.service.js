const { DataSource } = require("../../library/dataSource.js");
const path = require("path");
const { ResData } = require("../../library/resData.js");
const {
  QuestionBadRequestException,
  QuestionNotFoundException,
  questionIdMustBeNumberException,
} = require("./exception/question.exception.js");
const { Test } = require("../../library/testClass.js");
const { generationId } = require("../../library/generationId.js");
const { log } = require("console");

class QuestionService {
  getAllQuestion() {
    const questionData = path.join(
      __dirname,
      "../../../database",
      "questions.json"
    );
    const questionDataSource = new DataSource(questionData);

    const questions = questionDataSource.read();
    const resData = new ResData("all questions are taken", 200, questions);

    return resData;
  }

  getOneQuestionById(questionId) {
    if (isNaN(questionId)) {
      throw new questionIdMustBeNumberException();
    }

    const questionPath = path.join(
      __dirname,
      "../../../database",
      "questions.json"
    );
    const questionDataSource = new DataSource(questionPath);
    const questions = questionDataSource.read();

    const foundQuestion = questions.find(
      (question) => question.id === questionId
    );

    if (!foundQuestion) {
      throw new QuestionNotFoundException();
    }

    const resData = new ResData("found test by id", 200, foundQuestion);

    return resData;
  }

  createQuestion(dto) {
    if (!dto || !dto.title) {
      throw new QuestionBadRequestException();
    }

    const questionPath = path.join(
      __dirname,
      "../../../database",
      "questions.json"
    );
    const questionDataSource = new DataSource(questionPath);
    const questions = questionDataSource.read();

    const generatedId = generationId(questions);

    const newQuestion = new Test(generatedId, dto.title);

    questions.push(newQuestion);

    questionDataSource.write(questions);

    const resData = new ResData("Test created", 201, newQuestion);

    return resData;
  }

  updateQuestion(dto, questionId) {
    if (!dto || !dto.title) {
      throw new QuestionBadRequestException();
    }

    if (isNaN(questionId)) {
      throw new questionIdMustBeNumberException();
    }

    const { data: foundquestionById } = this.getOneQuestionById(questionId);

    foundquestionById.title = dto.title;

    const questionPath = path.join(
      __dirname,
      "../../../database",
      "questions.json"
    );
    const questionDataSource = new DataSource(questionPath);
    const tests = questionDataSource.read();

    const filterQuest = tests.filter(
      (test) => test.id !== foundquestionById.id
    );

    filterQuest.push(foundquestionById);
    const sortedData = filterQuest.slice().sort((a, b) => a.id - b.id);

    questionDataSource.write(sortedData);

    const resData = new ResData("updated question", 200, foundquestionById);

    return resData;
  }

  deleteQuestion(questId) {
    const { data: foundQuestionById } = this.getOneQuestionById(questId);

    const questPath = path.join(
      __dirname,
      "../../../database",
      "questions.json"
    );
    const questionDataSource = new DataSource(questPath);
    const questions = questionDataSource.read();

    const filterQuestion = questions.filter(
      (question) => question.id !== foundQuestionById.id
    );

    questionDataSource.write(filterQuestion);

    const resData = new ResData(
      "deleted question by id",
      200,
      foundQuestionById
    );

    return resData;
  }

  getByIds(ids) {
    const questionPath = path.join(
      __dirname,
      "../../../database",
      "questions.json"
    );

    const questionDataSource = new DataSource(questionPath);
    const questions = questionDataSource.read();

    const data = [];

    for (let i = 0; i < ids.length; i++) {
      const id = ids[i];

      const foundByIdQuestion = questions.find(
        (question) => question.id === id
      );

      if (foundByIdQuestion) {
        data.push(foundByIdQuestion);
      }
    }

    if (ids.length !== data.length) {
      throw new QuestionNotFoundException();
    }

    return new ResData("ok", 200, data);
  }
}

module.exports = { QuestionService };
