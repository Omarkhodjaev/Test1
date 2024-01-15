const { ResData } = require("../../library/resData");
const {
  UserBadRequestException,
  UserRegisterBadrequestException,
  UserNotFound,
} = require("./exception/user.exception");
const {
  userScheme,
  userRegisterScheme,
} = require("./validation/user.validation");

class UserController {
  #userService;
  constructor(userService) {
    this.#userService = userService;
  }

  async getUsers(req, res) {
    const resData = await this.#userService.getAll();
    return res.status(resData.statusCode).json(resData);
  }

  async getUser(req, res) {
    try {
      const userId = req.params.id;

      const resData = await this.#userService.getUserById(userId);

      return res.status(resData.statusCode).json(resData);
    } catch (error) {
      const resData = new ResData(
        error.message || "Server error",
        error.statusCode || 500,
        null,
        error
      );
      res.status(resData.statusCode).json(resData);
    }
  }

  async update(req, res) {
    try {
      const dto = req.body;
      const userId = req.params.id;

      const validated = userScheme.validate(dto);

      if (validated.error) {
        throw new UserBadRequestException(validated.error.message);
      }

      const resData = await this.#userService.update(dto, userId);

      res.status(resData.statusCode).json(resData);
    } catch (error) {
      const resData = new ResData(
        error.message || "server error",
        error.statusCode,
        null,
        error
      );

      res.status(resData.statusCode).json(resData);
    }
  }

  async register(req, res) {
    try {
      const dto = req.body;

      const validated = userRegisterScheme.validate(dto);

      if (validated.error) {
        throw new UserRegisterBadrequestException(validated.error.message);
      }

      const resData = await this.#userService.register(dto);
      res.status(resData.statusCode).json(resData);
    } catch (error) {
      const resData = new ResData(
        error.message,
        error.statusCode || 500,
        null,
        error
      );
      res.status(resData.statusCode).json(resData);
    }
  }

  async login(req, res) {
    try {
      const dto = req.body;

      const validated = userScheme.validate(dto);

      if (validated.error) {
        throw new UserBadRequestException(validated.error.message);
      }

      const resData = await this.#userService.login(dto);

      res.status(resData.statusCode).json(resData);
    } catch (error) {
      const resData = new ResData(
        error.message,
        error.statusCode || 500,
        null,
        error
      );
      res.status(resData.statusCode).json(resData);
    }
  }

  async deleteUser(req, res) {
    try {
      const userId = req.params.id;

      const resData = await this.#userService.deleteUser(userId);

      res.status(resData.statusCode).json(resData);
    } catch (error) {
      const resData = new ResData(error.message, error.statusCode);
      res.status(resData.statusCode).json(resData);
    }
  }
}

module.exports = { UserController };
