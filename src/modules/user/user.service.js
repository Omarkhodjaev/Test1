const { ResData } = require("../../library/resData.js");
const {
  LoginOrPassWrongException,
  UserNotFound,
  LoginAlreadyExistException,
} = require("./exception/user.exception.js");
const path = require("path");
const { jwtSign } = require("../../library/jwt.js");
const { DataSource } = require("../../library/dataSource.js");
const { generationId } = require("../../library/generationId.js");
const { hashed, isValid } = require("../../library/bycript.js");
const { UserRepository } = require("./user.repository.js");
const { UserEntity } = require("./entity/User.entity.js");

class UserService {
  #repository;
  constructor() {
    this.#repository = new UserRepository();
  }

  async register(dto) {
    const foundUserByLogin = await this.#_findByLogin(dto.login);

    if (foundUserByLogin) {
      throw new LoginAlreadyExistException();
    }

    const hashedPassword = await hashed(dto.password);

    const userObject = Object.assign(dto, { password: hashedPassword });

    const createdUser = new UserEntity(userObject);

    const newUser = await this.#repository.insertUser(createdUser);

    const newToken = jwtSign(newUser.id);

    const resData = new ResData("success register", 201, {
      user: newUser,
      token: newToken,
    });

    return resData;
  }

  async login(dto) {
    const foundUser = await this.#_findByLogin(dto.login);
    if (!foundUser) {
      throw new LoginOrPassWrongException();
    }

    // const isValidPassword = await isValid(dto.password, foundUser.password);

    // if (!isValidPassword) {
    //   throw new LoginOrPassWrongException();
    // }

    const newToken = jwtSign(foundUser.id);
    const resData = new ResData("success login", 200, {
      user: foundUser,
      token: newToken,
    });

    return resData;
  }

  async #_findByLogin(login) {
    const foundUserByLogin = await this.#repository.findOneByLogin(login);

    return foundUserByLogin;
  }

  async getAll() {
    const users = await this.#repository.getAllUsers();

    const resData = new ResData("All users taken", 200, { users });
    return resData;
  }

  getUserById(userId) {
    const userPath = path.join(__dirname, "../../../database", "users.json");
    const userDataSource = new DataSource(userPath);
    const users = userDataSource.read();

    const user = users.find((user) => user.id === userId);

    if (!user) {
      throw new UserNotFound();
    }

    const resData = new ResData("User is taken by ID", 200, user, userId);
    return resData;
  }

  async update(dto, userId) {
    const foundUser = await this.#repository.findOneById(userId);

    dto.password = await hashed(dto.password);

    const updatedUser = Object.assign(foundUser, dto);

    const editedUser = await this.#repository.update(updatedUser,foundUser.id);
    console.log(editedUser);
    const resData = new ResData("User updated", 200, editedUser);
    return resData;
  }

  deleteUser(userId) {
    const { data: foundUser } = this.getUserById(userId);

    const userPath = path.join(__dirname, "../../../database", "users.json");
    const userDataSource = new DataSource(userPath);
    const users = userDataSource.read();

    const filterUsers = users.filter((user) => user.id !== foundUser.id);

    userDataSource.write(filterUsers);

    const resData = new ResData("User is deleted", 200, foundUser);
    return resData;
  }
}

module.exports = { UserService };
