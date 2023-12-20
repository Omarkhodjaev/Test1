const { Router } = require("express");
const { QuestionController } = require("./question.controller");
const { QuestionService } = require("./question.service");
const { AuthorizationMiddleware } = require("../../library/middleware.js");
const router = Router();

const authorizationMiddleware = new AuthorizationMiddleware();

const questionService = new QuestionService();
const questionController = new QuestionController(questionService);

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
  authorizationMiddleware.checkUser,
  authorizationMiddleware.adminRole,
  (req, res) => {
    questionController.deleteQuestion(req, res);
  }
);

module.exports = { router };
