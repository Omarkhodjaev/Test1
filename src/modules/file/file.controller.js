const { ResData } = require("../../library/resData");
const path = require("path");
const { fileScheme } = require("./validation/file.validation");
const { FileBadRequestException } = require("./exception/file.exception");

class FileController {
  #FileService;
  constructor(FileService) {
    this.#FileService = FileService;
  }

  async singleFileUpload(req, res) {
    try {
      const validated = fileScheme.validate(req.files);

      if (validated.error) {
        throw new FileBadRequestException(validated.error.message);
      }

      const file = req.files?.media;

      file.name = req.body.original_name
        ? req.body.original_name + path.extname(file.name)
        : file.name;
        
      

      const resData = await this.#FileService.singleUpload(file);

      res.status(resData.statusCode).json(resData);
    } catch (error) {
      const resData = new ResData(error.message, error.statusCode);
      res.status(resData.statusCode).json(resData);
    }
  }

  async multipleFilesUpload(req, res) {
    try {
      const files = req.files.media;
      const resData = await this.#FileService.multipleUpload(files);

      res.status(resData.statusCode).json(resData);
    } catch (error) {
      const resData = new ResData(error.message, error.statusCode);
      res.status(resData.statusCode).json(resData);
    }
  }

  async getAll(req, res) {
    const resData = await this.#FileService.getAll();
    res.status(resData.statusCode).json(resData);
  }

  async getOneById(req, res) {
    try {
      const fileId = req.params.id;
      const resData = await this.#FileService.getOneById(fileId);
      res.status(resData.statusCode).json(resData);
    } catch (error) {
      const resData = new ResData(error.message, error.statusCode);
      res.status(resData.statusCode).json(resData);
    }
  }
}

module.exports = { FileController };
