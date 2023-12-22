const { Router } = require("express");
const { UserPassedTestService } = require("./user_passed_test.service");
const { UserPassedTestController } = require("./user_passed_test.controller");

const router = Router();

const userTestPassedService = new UserPassedTestService();
const userPassedTestController = new UserPassedTestController(
  userTestPassedService
);

router.post("/", (req, res) => {

  userPassedTestController.create(req, res);
});

module.exports = { router };
