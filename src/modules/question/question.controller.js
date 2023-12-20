const { ResData } = require("../../library/resData");

class QuestionController {
  #questionService;
  constructor(questionService) {
    this.#questionService = questionService;
  }

  async getAllQuestion(req, res) {
    const resData = await this.#questionService.getAllQuestion();

    res.status(200).json(resData);
  }

  async createQuestion(req, res) {
    try {
      const resData = await this.#questionService.createQuestion(req.body);

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

  async getOneQuestionById(req, res) {
    try {
      const questId = req.params.id;
      const resData = await this.#questionService.getOneQuestionById(
        Number(questId)
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

  async updateTest(req, res) {
    try {
      const questId = req.params.id;
      const dto = req.body;

      const resData = await this.#questionService.updateQuestion(
        dto,
        Number(questId)
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

  async deleteQuestion(req, res) {
    try {
      const questId = req.params.id;

      const resData = await this.#questionService.deleteQuestion(
        Number(questId)
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
}

module.exports = { QuestionController };
