const { Router } = require("express");
const { UserPassedTestService } = require("./user_passed_test.service");
const { UserPassedTestController } = require("./user_passed_test.controller");
const { AuthorizationMiddleware } = require("../../library/middleware");

const authorizationMiddleware = new AuthorizationMiddleware();

const router = Router();

const userTestPassedService = new UserPassedTestService();
const userPassedTestController = new UserPassedTestController(
  userTestPassedService
);

router.post("/", authorizationMiddleware.checkUser, authorizationMiddleware.adminRole, (req, res) => {

  userPassedTestController.create(req, res);
});

module.exports = { router };
