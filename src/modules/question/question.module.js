const { Router } = require("express");
const { QuestionController } = require("./question.controller");
const { QuestionService } = require("./question.service");
const router = Router();

const questionService = new QuestionService();
const questionController = new QuestionController(questionService);

router.get("/", (req, res) => {
  questionController.getAllQuestion(req, res);
});

router.get("/:id", (req, res) => {
  questionController.getOneQuestionById(req, res);
});

router.post("/", (req, res) => {
  questionController.createQuestion(req, res);
});

router.put("/:id", (req, res) => {
  questionController.updateTest(req, res);
});

router.delete("/:id", (req, res) => {
  questionController.deleteQuestion(req, res);
});

module.exports = { router };
