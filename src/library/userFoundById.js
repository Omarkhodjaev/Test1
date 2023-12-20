const path = require("path");
const { DataSource } = require("./dataSource");

const userFindById = (userId) => {
  const userPath = path.join(__dirname, "../../database", "users.json");
  const userDataSource = new DataSource(userPath);
  const users = userDataSource.read();

  const foundUser = users.find((user) => user.id === userId);
  return foundUser;
};

module.exports = { UserFoundById: userFindById };
