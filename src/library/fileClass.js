class File {
  constructor(id, original_name, path, size, mimeType, date) {
    this.id = id;
    this.original_name = original_name;
    this.path = path;
    this.size = size;
    (this.mimeType = mimeType), (this.date = date);
  }
}

module.exports = { File };
