const uuid = require("uuid");
const path = require("path");
const { ResData } = require("../../library/resData");
const { fileServerUrl } = require("../../config");
const { FileEntity } = require("./entity/file.entity");
const { FileRepository } = require("./file.repository.js");

class FileService {
  #repository;
  constructor() {
    this.#repository = new FileRepository();
  }

  async singleUpload(file) {
    const fileName = `${uuid.v4()}${path.extname(file.name)}`;

    const uploadPath = path.join(__dirname, "../../../uploads", fileName);

    const fileURL = fileServerUrl + fileName;

    file.mv(uploadPath, (err) => {
      if (err) {
        const resData = new ResData(err.message, 400);
        return resData;
      }
    });

    const createdFile = new FileEntity(file, fileURL);

    const newFile = await this.#repository.insertFile(createdFile);

    const resData = new ResData("A file uploaded", 200, {
      newFile,
      fileURL,
    });

    return resData;
  }

  async multipleUpload(files) {
    let filesUrls = [];
    let newFiles = [];

    for (const f of files) {
      const fileName = `${uuid.v4()}${path.extname(f.name)}`;
      const uploadPath = path.join(__dirname, "../../../uploads", fileName);
      let fileURL = fileServerUrl + fileName;

      // Wrap the file upload in a Promise to make it awaitable
      const uploadFile = () => {
        return new Promise((resolve, reject) => {
          f.mv(uploadPath, (err) => {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          });
        });
      };

      try {
        await uploadFile();
      } catch (err) {
        const resData = new ResData(err.message, 400);
        return resData;
      }

      const createdFile = new FileEntity(f, fileURL);
      const newFile = await this.#repository.insertFile(createdFile);

      filesUrls.push(fileURL);
      newFiles.push(newFile);
    }

    const resData = new ResData("Multiple files upload", 200, {
      newFiles,
      filesUrls,
    });

    return resData;
  }

  async getAll() {
    const files = await this.#repository.getAllFiles();

    const resData = new ResData("All files are taken", 200, files);
    return resData;
  }

  async getOneById(fileId) {
    const foundFile = await this.#repository.findOneByFileId(fileId);

    const resData = new ResData("One file taken by file id", 200, foundFile);
    return resData;
  }
}

module.exports = { FileService };
