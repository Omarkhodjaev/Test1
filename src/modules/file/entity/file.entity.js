class File {
  constructor(id, originalName, path, size, mimeType, date) {
    (this.id = id),
      (this.original_name = originalName),
      (this.path = path),
      (this.size = size),
      (this.mime_type = mimeType),
      (this.date = date);
  }
}

module.exports = { File };
