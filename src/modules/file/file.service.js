const path = require("path");
const { fileServerUrl } = require("../../config");
const uuid = require("uuid");
const { DataSource } = require("../../library/dataSource");
const { generationId } = require("../../library/generationId");

class FileService {
  createFile(req, res) {
    const file = req.files.media;
    const fileName = `${uuid.v4()}${path.extname(file.name)}`;
    const uploadPath = path.join(__dirname, "../../../uploads", fileName);
    const fileUrl = fileServerUrl + fileName;

    const filePath = path.join(
      __dirname,
      "../../../database",
      "files.json"
    );
    const fileDataSource = new DataSource(filePath);
    const files = fileDataSource.read();



    file.mv(uploadPath, (err) => {
      if (err) {
        res.status(400).json(err.message);
      }
    });
    res.json(fileUrl);
  }
}

module.exports = { FileService };
