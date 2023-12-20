const { ResData } = require("../../library/resData");
const {
  TestBadRequestException,
  TestIdMustBeNumberException,
} = require("./exception/test.exception");
const { testScheme, idSchema } = require("./validation/test.validation");

class TestController {
  #testService;
  #testAndQuestionsService;
  #questionService;
  constructor(testService, TestAndQuestionsService, QuestionService) {
    this.#testService = testService;
    this.#testAndQuestionsService = TestAndQuestionsService;
    this.#questionService = QuestionService;
  }

  async getAllTest(req, res) {
    const resData = await this.#testService.getAllTest();

    res.status(resData.statusCode).json(resData);
  }

  async createTest(req, res) {
    try {
      const dto = req.body;

      const validated = testScheme.validate(dto);

      if (validated.error) {
        throw new TestBadRequestException(validated.error.message);
      }

      const resData = await this.#testService.createTest(req.body);

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

  async getOneTestById(req, res) {
    try {
      const { error, value } = idSchema.validate(Number(req.params.id));

      if (error) {
        throw new TestIdMustBeNumberException();
      }

      const resData = await this.#testService.getOneTestById(value);

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

  async updateTest(req, res) {
    try {
      const dto = req.body;

      const validated = testScheme.validate(dto);

      if (validated.error) {
        throw new TestBadRequestException(validated.error.message);
      }

      const { error, value } = idSchema.validate(Number(req.params.id));

      if (error) {
        throw new TestIdMustBeNumberException();
      }

      const resData = await this.#testService.updateTest(dto, value);

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

  async deleteTest(req, res) {
    try {
      const { error, value } = idSchema.validate(Number(req.params.id));

      if (error) {
        throw new TestIdMustBeNumberException();
      }

      const getTestQuestionsByTestId =
        await this.#testAndQuestionsService.getTestAndQuestByTestId(value);

      if (getTestQuestionsByTestId.data.length) {
        const ids = getTestQuestionsByTestId.data.map(
          (testQuestion) => testQuestion.questId
        );

        const getQuestionByIDS = await this.#questionService.getByIds(ids);
        getQuestionByIDS.setStatusCode = 400;
        getQuestionByIDS.setMessage = "you should delete these question ";

        return res.status(getQuestionByIDS.statusCode).json(getQuestionByIDS);
      }

      const resData = await this.#testService.deleteTest(value);

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

module.exports = { TestController };
