const { verifyToken } = require("./jwt.js");
const { ResData } = require("./resData.js");
const { UserFoundById } = require("./userFoundById.js");


class AuthorizationMiddleware {
  adminRole(req, res, next) {
    const userId = req.userId;
    const foundUser =  UserFoundById(userId);

    if (foundUser && foundUser.role === "admin") {
      req.userId = foundUser;
      return next();
    } else {
      const resData = new ResData("not access", 403);

      res.status(403).json(resData);
    }
  }

  userRole(req, res, next) {
    const userId = req.userId;

    const foundUser =  UserFoundById(userId);
    
    if (foundUser && "user" === foundUser.role) {
      req.user = foundUser;
      return next();
    } else {
      const resData = new ResData("not access", 403);

      res.status(403).json(resData);
    }
  }

  checkUser(req, res, next) {
    try {
      const token = req.headers.token;

      const userId = verifyToken(token);

      req.userId = +userId;
      next();
    } catch (error) {
      console.log(error);
      const resData = new ResData("invalid token", 401);
      res.status(resData.statusCode).json(resData);
    }
  }
}

module.exports = { AuthorizationMiddleware };
