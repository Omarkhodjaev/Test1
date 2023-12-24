const uuid = require("uuid");
const path = require("path");
const { ResData } = require("../../library/resData");
const { fileServerUrl } = require("../../config");
const { DataSource } = require("../../library/dataSource");
const { File } = require("./entity/file.entity");
const { generationId } = require("../../library/generationId");
const { dateGenerator } = require("../../library/dateGenerator");
class FileService {
  singleUpload(file) {
    const filePath = path.join(__dirname, "../../../database", "files.json");
    const fileDatasource = new DataSource(filePath);
    const files = fileDatasource.read();

    const fileName = `${uuid.v4()}${path.extname(file.name)}`;

    const uploadPath = path.join(__dirname, "../../../uploads", fileName);

    const fileURL = fileServerUrl + fileName;

    file.mv(uploadPath, (err) => {
      if (err) {
        const resData = new ResData(err.message, 400);
        return resData;
      }
    });

    const id = generationId(files);
    const date = dateGenerator();

    const newFile = new File(
      id,
      file.name,
      fileURL,
      file.size,
      file.mimetype,
      date
    );

    files.push(newFile);
    fileDatasource.write(files);

    const resData = new ResData("Single file uploaded", 200, {
      newFile,
      fileURL,
    });

    return resData;
  }

  multipleUpload(files) {
    let fileUrlStorage = [];
    let newFiles = [];

    const filePath = path.join(__dirname, "../../../database", "files.json");
    const fileDatasource = new DataSource(filePath);
    const filesInDatabase = fileDatasource.read();

    files.forEach((f) => {
      const fileName = `${uuid.v4()}${path.extname(f.name)}`;

      const uploadPath = path.join(__dirname, "../../../uploads", fileName);

      let fileURL = fileServerUrl + fileName;

      f.mv(uploadPath, (err) => {
        if (err) {
          const resData = new ResData(err.message, 400);
          return resData;
        }
      });

      fileUrlStorage.push(fileURL);

      const id = generationId(filesInDatabase);
      const date = dateGenerator();

      const newFile = new File(id, f.name, fileURL, f.size, f.mimetype, date);

      newFiles.push(newFile);

      filesInDatabase.push(newFile);
      console.log(filesInDatabase);
    });

    fileDatasource.write(filesInDatabase);
    const resData = new ResData("Single file uploaded", 200, {
      newFiles,
      fileUrlStorage,
    });

    return resData;
  }

  getAll() {
    const filePath = path.join(__dirname, "../../../database", "files.json");
    const fileDatasource = new DataSource(filePath);
    const files = fileDatasource.read();

    const resData = new ResData("All files are taken", 200, files);
    return resData;
  }

}

module.exports = { FileService };
