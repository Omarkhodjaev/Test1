const { ResData } = require("../../library/resData");
const {
  questionIdMustBeNumberException,
} = require("../question/exception/question.exception");
const {
  TestIdMustBeNumberException,
} = require("../test/exception/test.exception");
const {
  testAndQuestBadRequest,
} = require("./exception/test.questions.exception");
const { test_questScheme, idSchema } = require("./validation/test_questions.validation");

class TestQuestionController {
  #testQuestionService;
  constructor(testQuestionService) {
    this.#testQuestionService = testQuestionService;
  }

  async getTestAndQuestByQuestId(req, res) {
    try {
      const { error, value } = idSchema.validate(Number(req.params.id));

      if (error) {
        throw new questionIdMustBeNumberException();
      }
      
      const resData = await this.#testQuestionService.getTestAndQuestByQuestId(
        value
      );

      res.status(resData.statusCode).json(resData);
    } catch (error) {
      const resData = new ResData(
        error.message || "server error",
        error.statusCode || 500,
        null,
        error
      );
      res.status(resData.statusCode).json(resData);
    }
  }

  async getTestAndQuestByTestId(req, res) {
    try {
      const { error, value } = idSchema.validate(Number(req.params.id));
      if (error) {
        throw new TestIdMustBeNumberException();
      }

      const resData = await this.#testQuestionService.getTestAndQuestByTestId(
        value
      );

      res.status(resData.statusCode).json(resData);
    } catch (error) {
      const resData = new ResData(
        error.message || "server error",
        error.statusCode || 500,
        null,
        error
      );
      res.status(resData.statusCode).json(resData);
    }
  }

  async createTestAndQuest(req, res) {
    try {
      const dto = req.body;

      const validated = test_questScheme.validate(dto);

      if (validated.error) {
        throw new testAndQuestBadRequest(validated.error.message);
      }

      const resData = await this.#testQuestionService.createTestAndQuest(dto);

      res.status(resData.statusCode).json(resData);
    } catch (error) {
      const resData = new ResData(
        error.message || "server error",
        error.statusCode || 500,
        null,
        error
      );
      res.status(resData.statusCode).json(resData);
    }
  }
}

module.exports = { TestQuestionController };
