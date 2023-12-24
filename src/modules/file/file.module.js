const { Router } = require("express");
const { FileService } = require("./file.service");
const { FileController } = require("./file.controller.js");

const fileService = new FileService();
const fileController = new FileController(fileService);

const router = Router();

router.post("/single-file-upload", (req, res) => {
  fileController.singleFileUpload(req, res);
});

module.exports = { router };
