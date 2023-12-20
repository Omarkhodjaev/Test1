const { Router } = require("express");
const { FileController } = require("./file.controller");
const { FileService } = require("./file.service");

const router = Router();

const fileService = new FileService();
const fileController = new FileController(fileService);

router.post("/", (req, res) => {
  fileController.createFile(req, res);
});

module.exports = { router };
