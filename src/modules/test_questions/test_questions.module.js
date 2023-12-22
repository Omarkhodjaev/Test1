const { Router } = require("express");
const { TestAndQuestionsService } = require("./test_questions.service");
const { TestQuestionController } = require("./test_questions.controller");
const { AuthorizationMiddleware } = require("../../library/middleware");

const authorizationMiddleware = new AuthorizationMiddleware();
const router = Router();

const testAndQuestionService = new TestAndQuestionsService();
const testQuestionController = new TestQuestionController(
  testAndQuestionService
);

router.get("/byquestionid/:id", (req, res) => {
  testQuestionController.getTestAndQuestByQuestId(req, res);
});

router.get("/bytestid/:id", (req, res) => {
  testQuestionController.getTestAndQuestByTestId(req, res);
});

router.post(
  "/",
  authorizationMiddleware.checkUser,
  authorizationMiddleware.adminRole,
  (req, res) => {
    testQuestionController.createTestAndQuest(req, res);
  }
);

module.exports = { router };
