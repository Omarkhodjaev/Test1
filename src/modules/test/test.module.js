const { Router } = require("express");
const router = Router();
const { TestController } = require("./test.controller.js");
const { TestService } = require("./test.service.js");
const { AuthorizationMiddleware } = require("../../library/middleware.js");
const {
  TestAndQuestionsService,
} = require("../test_questions/test_questions.service.js");
const { QuestionService } = require("../question/question.service.js");

const testService = new TestService();
const testAndQuestionsService = new TestAndQuestionsService();
const questionService = new QuestionService();
const testController = new TestController(
  testService,
  testAndQuestionsService,
  questionService
);
const authorizationMiddleware = new AuthorizationMiddleware();

router.get("/", authorizationMiddleware.checkUser, authorizationMiddleware.userRole, (req, res) => {
  testController.getAllTest(req, res);
});

router.get("/:id", (req, res) => {
  testController.getOneTestById(req, res);
});

router.post(
  "/",
  authorizationMiddleware.checkUser,
  authorizationMiddleware.adminRole,
  (req, res) => {
    testController.createTest(req, res);
  }
);

router.put("/:id", (req, res) => {
  testController.updateTest(req, res);
});

router.delete("/:id", (req, res) => {
  testController.deleteTest(req, res);
});

module.exports = { router };
