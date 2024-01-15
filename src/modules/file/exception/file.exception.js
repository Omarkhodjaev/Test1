class FileBadRequestException extends Error {
    constructor(message) {
      super(message);
  
      this.statusCode = 400;
    }
  }
  

  
  class FileNotFoundException extends Error {
    constructor() {
      super("File not found");
  
      this.statusCode = 404;
    }
  }
  
  module.exports = {
    FileBadRequestException,
    FileNotFoundException,
  };
  