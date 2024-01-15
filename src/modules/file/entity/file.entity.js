class FileEntity {
  constructor(file,fileURL) {
    (this.original_name = file.name),
      (this.path = fileURL),
      (this.size = file.size),
      (this.mime_type = file.mimetype);
  }
}

module.exports = { FileEntity };
