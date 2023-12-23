const { Router } = require("express");
const { QuestionController } = require("./question.controller");
const { QuestionService } = require("./question.service");
const { AuthorizationMiddleware } = require("../../library/middleware.js");
const { TestAndQuestionsService } = require("../test_questions/test_questions.service.js");
const { TestService } = require("../test/test.service.js");
const router = Router();

const authorizationMiddleware = new AuthorizationMiddleware();

const questionService = new QuestionService();
const testAndQuestionsService = new TestAndQuestionsService();
const testService = new TestService();


const questionController = new QuestionController(questionService,testAndQuestionsService,testService);

router.get("/", (req, res) => {
  questionController.getAllQuestion(req, res);
});

router.get("/:id", (req, res) => {
  questionController.getOneQuestionById(req, res);
});

router.post(
  "/",
  authorizationMiddleware.checkUser,
  authorizationMiddleware.adminRole,
  (req, res) => {
    questionController.createQuestion(req, res);
  }
);

router.put(
  "/:id",
  authorizationMiddleware.checkUser,
  authorizationMiddleware.adminRole,
  (req, res) => {
    questionController.updateTest(req, res);
  }
);

router.delete(
  "/:id",
  // authorizationMiddleware.checkUser,
  // authorizationMiddleware.adminRole,
  (req, res) => {
    questionController.deleteQuestion(req, res);
  }
);

module.exports = { router };
