require("dotenv").config();

const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_DB;

module.exports = {
  PORT,
  MONGO_URL,
};
