const { ResData } = require("../../library/resData.js");
const {
  LoginOrPassWrongException,
  UserNotFound,
} = require("./exception/user.exception.js");
const path = require("path");
const { jwtSign } = require("../../library/jwt.js");
const { DataSource } = require("../../library/dataSource.js");
const User = require("../../library/userClass.js");
const { generationId } = require("../../library/generationId.js");
const { hashed, isValid } = require("../../library/bycript.js");

class UserService {
  async register(dto) {
    const foundUserByLogin = this.#_findByLogin(dto.login);

    if (foundUserByLogin) {
      throw new LoginAlreadyExistException();
    }

    const userPath = path.join(__dirname, "../../../database", "users.json");
    const usersDataSource = new DataSource(userPath);
    const users = usersDataSource.read();

    const generatedId = generationId(users);
    const hashedPassword = await hashed(dto.password);

    const newUser = new User(
      generatedId,
      dto.login,
      hashedPassword,
      dto.fullName,
      dto.birthdate,
      dto.role
    );

    users.push(newUser);
    usersDataSource.write(users);

    const newToken = jwtSign(newUser.id);

    const resData = new ResData("success register", 201, {
      user: newUser,
      token: newToken,
    });

    return resData;
  }

  async login(dto) {
    const foundUser = this.#_findByLogin(dto.login);

    if (!foundUser) {
      throw new LoginOrPassWrongException();
    }

    const isValidPassword = await isValid(dto.password, foundUser.password);
    
    if (!isValidPassword) {
      throw new LoginOrPassWrongException();
    }

    const newToken = jwtSign(foundUser.id);
    const resData = new ResData("success login", 200, {
      user: foundUser,
      token: newToken,
    });

    return resData;
  }

  #_findByLogin(login) {
    const userPath = path.join(__dirname, "../../../database", "users.json");

    const usersDataSource = new DataSource(userPath);
    const users = usersDataSource.read();

    const foundUserByLogin = users.find((user) => user.login === login);

    return foundUserByLogin;
  }

  getAllUsers() {
    const userPath = path.join(__dirname, "../../../database", "users.json");
    const userDataSource = new DataSource(userPath);
    const users = userDataSource.read();

    const resData = new ResData("All Users are taken", 200, { users });
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

  updateUser(dto, userId) {
    const { data: foundUser } = this.getUserById(userId);

    foundUser.id = foundUser.id;
    foundUser.login = dto.login;
    foundUser.password = dto.password;
    foundUser.full_name = dto.full_name;
    foundUser.birth_date = dto.birth_date;
    foundUser.role = foundUser.role;

    const userPath = path.join(__dirname, "../../../database", "users.json");
    const userDataSource = new DataSource(userPath);
    const users = userDataSource.read();

    const filterUsers = users.filter((user) => user.id !== foundUser.id);

    filterUsers.push(foundUser);
    userDataSource.write(filterUsers);

    const resData = new ResData("User is updated", 200, foundUser);
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
