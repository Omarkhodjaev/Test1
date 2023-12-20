const fs = require("fs");

class DataSource {
  #dir;
  constructor(dir) {
    this.#dir = dir;
  }
  read() {
    const jsonData = fs.readFileSync(this.#dir, "utf8");

    if (jsonData) {
      return JSON.parse(jsonData);
    } else {
      return [];
    }
  }

  write(data) {
    fs.writeFileSync(this.#dir, JSON.stringify(data, null, 4));
  }
}

module.exports = { DataSource };
