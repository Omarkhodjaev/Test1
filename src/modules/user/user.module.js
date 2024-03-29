const { Router } = require("express");
const { UserController } = require("./user.controller");
const { UserService } = require("./user.service");
const userService = new UserService();
const userController = new UserController(userService);
const router = Router();
const { AuthorizationMiddleware } = require("../../library/middleware.js");

const authorizationMiddleware = new AuthorizationMiddleware();

router.post("/login", (req, res) => {
  userController.login(req, res);
});

router.post("/register", (req, res) => {
  userController.register(req, res);
});

router.get(
  "/allusers",
  //  authorizationMiddleware.checkUser,authorizationMiddleware.userRole,
  (req, res) => {
    userController.getUsers(req, res);
  }
);

router.get("/:id", (req, res) => {
  userController.getUser(req, res);
});

router.put("/:id", (req, res) => {
  userController.update(req, res);
});

router.delete(
  "/:id",
  authorizationMiddleware.checkUser,
  authorizationMiddleware.adminRole,
  (req, res) => {
    userController.deleteUser(req, res);
  }
);

module.exports = { router };
