const { Postgress } = require("../../library/pg.js");

class FileRepository extends Postgress {
  async findOneByFileId(fileId) {
    return await this.fetch("SELECT * FROM test.files WHERE id = $1", fileId);
  }

  async getAllFiles() {
    return await this.fetchAll("SELECT * FROM test.files ");
  }

  async insertFile(fileEntity) {
    return await this.fetch(
      "INSERT INTO test.files(original_name, path, size, mime_type) VALUES($1, $2, $3, $4) returning *",
      fileEntity.original_name,
      fileEntity.path,
      fileEntity.size,
      fileEntity.mime_type
    );
  }
}

module.exports = { FileRepository };
