const { ResData } = require("../../library/resData");
const {
  testAndUserIdBadRequest,
} = require("./exception/user_passed_test.exception");
const {
  user_test_passedScheme,
} = require("./validation/user_passed_test.validation");

class UserPassedTestController {
  #userPassedTestService;
  constructor(userPassedTestService) {
    this.#userPassedTestService = userPassedTestService;
  }

  async create(req, res) {
    try {
      const dto = req.body;
      const validated = user_test_passedScheme.validate(dto);

      if (validated.error) {
        throw new testAndUserIdBadRequest(validated.error.message);
      }

      const resData = await this.#userPassedTestService.create(dto);
      res.status(resData.statusCode).json(resData);
    } catch (error) {
      const resData = new ResData(error.message, error.statusCode);
      // console.log(resData);
      res.status(resData.statusCode).json(resData);
    }
  }
}

module.exports = { UserPassedTestController };
