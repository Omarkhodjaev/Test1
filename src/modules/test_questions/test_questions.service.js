const { DataSource } = require("../../library/dataSource.js");
const path = require("path");
const { ResData } = require("../../library/resData.js");
const { generationId } = require("../../library/generationId.js");
const { TestAndQuest } = require("../../library/testAndQuest.js");

const {
  QuestionNotFoundException,
} = require("../question/exception/question.exception.js");

const {
  TestNotFoundException,
} = require("../test/exception/test.exception.js");

const {
  databaseCheckTestAndQuest,
} = require("./exception/test.questions.exception.js");


class TestAndQuestionsService {
  getTestAndQuestByQuestId(questionId) {

    const questionPath = path.join(
      __dirname,
      "../../../database",
      "test_questions.json"
    );

    const testQuestionDataSource = new DataSource(questionPath);
    const testQuestions = testQuestionDataSource.read();

    const foundQuestion = testQuestions.filter(
      (question) => question.questId === questionId
    );



    if (!foundQuestion) {
      throw new QuestionNotFoundException();
    }

    
    

    const resData = new ResData(
      "found test&question by question id",
      200,
      foundQuestion
    );
    return resData;
  }

  getTestAndQuestByTestId(testId) {
    const testPath = path.join(
      __dirname,
      "../../../database",
      "test_questions.json"
    );
    const testDataSource = new DataSource(testPath);
    const tests = testDataSource.read();
    const foundTest = tests.filter((test) => test.testId === testId);
    if (!foundTest) {
      throw new TestNotFoundException();
    }

    const resData = new ResData(
      "found test&question by test id",
      200,
      foundTest
    );

    return resData;
  }

  createTestAndQuest(dto) {

    const testAndQuestPath = path.join(
      __dirname,
      "../../../database",
      "test_questions.json"
    );
    const testAndQuestDataSource = new DataSource(testAndQuestPath);
    const TandQ = testAndQuestDataSource.read();

    const data = TandQ.find(
      (data) => data.testId === dto.testId && data.questId === dto.questId
    );

    if (data) {
      throw new databaseCheckTestAndQuest();
    }

    const generatedId = generationId(TandQ);

    const newTestAndQuest = new TestAndQuest(
      generatedId,
      dto.testId,
      dto.questId
    );

    TandQ.push(newTestAndQuest);

    testAndQuestDataSource.write(TandQ);

    const resData = new ResData("Test created", 201, newTestAndQuest);

    return resData;
  }
  
}

module.exports = { TestAndQuestionsService };
