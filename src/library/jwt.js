const jwt = require("jsonwebtoken");
const { jwtKey } = require("../config/index.js");

const hash = (data) => {
  const token = jwt.sign(data, jwtKey);
  
  return token;
};

const verifyToken = (token) => {
  return jwt.verify(token, jwtKey);
};

module.exports = { jwtSign: hash, verifyToken };


