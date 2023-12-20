const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  serverPort: Number(process.env.PORT) || 3000,
  jwtKey: process.env.JWT_KEY || "ok",
  fileServerUrl: process.env.FILE_SERVER
};
