const bcrypt = require("bcrypt");

const hashed = async (data) => {
  const salt = 10;
  return bcrypt.hash(data, salt);
};

const isValid = async (data, hashData) => {
  return await bcrypt.compare(data, hashData);
};

module.exports = { hashed, isValid };
