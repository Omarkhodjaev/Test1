const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  serverPort: Number(process.env.PORT) || 4000,
  jwtKey: process.env.JWT_KEY || "ok",
  fileServerUrl: process.env.FILE_SERVER,
  postgresUser: process.env.POSTGRES_USER,
  postgresHost: process.env.POSTGRES_HOST,
  postgresPort: process.env.POSTGRES_PORT,
  postgresDatabase: process.env.POSTGRES_DATABASE,
  postgresPassword: process.env.POSTGRES_PASSWORD,
};
