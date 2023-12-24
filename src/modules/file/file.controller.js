const { ResData } = require("../../library/resData");

class FileController {
  #FileService;
  constructor(FileService) {
    this.#FileService = FileService;
  }

  async singleFileUpload(req, res) {
    try {
      const file = req.files.media;
      
      const resData = await this.#FileService.singleUpload(file);
     
      res.status(resData.statusCode).json(resData);
    } catch (error) {
      const resData = new ResData(error.message, error.statusCode);
      res.status(resData.statusCode).json(resData);
    }
  }

  async multipleFilesUpload(req,res){
    try {
      const files = req.files.media;

      const resData = await this.#FileService.multipleUpload(files);
      
      res.status(resData.statusCode).json(resData);
    } catch (error) {
      const resData = new ResData(error.message, error.statusCode);
      res.status(resData.statusCode).json(resData);
    }
  }
}

module.exports = { FileController };
