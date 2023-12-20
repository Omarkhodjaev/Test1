class FileController {
  #fileService;
  constructor(fileService) {
    this.#fileService = fileService;
  }

  async createFile(req, res) {
    const data = await this.#fileService.createFile(req, res);
    res.json(data);
  }
}

module.exports = { FileController };
