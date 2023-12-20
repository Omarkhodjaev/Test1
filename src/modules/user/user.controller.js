const { ResData } = require("../../library/resData");
const {
  UserBadRequestException,
  UserRegisterBadrequestException,
} = require("./exception/user.exception");

class UserController {
  #userService;
  constructor(userService) {
    this.#userService = userService;
  }

  async getUsers(req, res) {
    const resData = await this.#userService.getAllUsers();
    return res.status(resData.statusCode).json(resData);
  }

  async getUser(req, res) {
    const userId = Number(req.params.id);
    try {
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

  async updateUser(req, res) {
    try {
      const dto = req.body;
      const userId = Number(req.params.id);

      const resData = await this.#userService.updateUser(dto, userId);
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
      console.log(dto);

      if (
        !dto ||
        !dto.login ||
        !dto.password ||
        !dto.role ||
        !dto.birthdate ||
        !dto.fullName
      ) {
        throw new UserRegisterBadrequestException();
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

      if (!dto || !dto.login || !dto.password) {
        throw new UserBadRequestException();
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
      const userId = Number(req.params.id);

      const resData = await this.#userService.deleteUser(userId);

      res.status(resData.statusCode).json(resData);
    } catch (error) {
      // console.log(error);
      const resData = new ResData(error.message, error.statusCode);
      res.status(resData.statusCode).json(resData);
    }
  }
}

module.exports = { UserController };
