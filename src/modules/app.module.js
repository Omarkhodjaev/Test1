const { Router } = require("express");
const test = require("./test/test.module.js");
const question = require("./question/question.module.js");
const testAndQuestion = require("./test_questions/test_questions.module.js");
const user = require("./user/user.module.js");
const file = require("./file/file.module.js");
const variant = require("./variant/variant.module.js");
const userPassedTest = require("./user_passed_test/user_passed_test.module.js");

const router = Router();

router.use("/test", test.router);
router.use("/question", question.router);
router.use("/testandquestion", testAndQuestion.router);
router.use("/user", user.router);
router.use("/file-upload", file.router);
router.use("/variant", variant.router);
router.use("/user-passed-test", userPassedTest.router);

module.exports = { router };
