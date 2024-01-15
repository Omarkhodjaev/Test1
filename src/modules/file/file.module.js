const { Router } = require("express");
const { FileService } = require("./file.service");
const { FileController } = require("./file.controller.js");

const fileService = new FileService();
const fileController = new FileController(fileService);

const router = Router();

router.post("/upload-one", (req, res) => {
  fileController.singleFileUpload(req, res);
});

router.post("/upload-multiple", (req, res) => {
  fileController.multipleFilesUpload(req, res);
});

router.get("/allfiles", (req, res) => {
  fileController.getAll(req, res);
});

router.get("/:id", (req, res) => {
  fileController.getOneById(req, res);
});

module.exports = { router };
