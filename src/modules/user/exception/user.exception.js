class UserBadRequestException extends Error {
  constructor(message) {
    super(message);

    this.statusCode = 400;
  }
}

class LoginOrPassWrongException extends Error {
  constructor() {
    super("login or password is wrong");

    this.statusCode = 400;
  }
}

class LoginAlreadyExistException extends Error {
  constructor() {
    super("login already exists");

    this.statusCode = 400;
  }
}

class UserRegisterBadrequestException extends Error {
  constructor(message) {
    super(message);

    this.statusCode = 400;
  }
}

class UserNotFound extends Error {
  constructor() {
    super("User not found");

    this.statusCode = 404;
  }
}

module.exports = {
  UserBadRequestException,
  LoginOrPassWrongException,
  LoginAlreadyExistException,
  UserRegisterBadrequestException,
  UserNotFound
};
