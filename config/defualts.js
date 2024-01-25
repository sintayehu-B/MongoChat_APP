require("dotenv").config();

const MONGO_USERNAME = process.env.MONGO_USERNAME || "mongochatservice";
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || "mongochat";
const MONGO_DATABASE = process.env.MONGO_DATABASE || "MongoChat";
const MONGOS_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@chatservice.9hpivir.mongodb.net/`;
const SERVER_PORT = 3030;

module.exports = {
  mongoUrl: MONGOS_URL,
  port: SERVER_PORT,
};
