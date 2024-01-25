const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const http = require("http");
const mongoose = require("mongoose");

const app = express();
const { error_s, info, warn } = require("./logger/logger");

const { mongoUrl, port } = require("../config/defualts");

mongoose
  .connect(mongoUrl)
  .then(() => {
    info("Connected to MongoDB.");
    StartServer();
  })
  .catch((error) => {
    error_s("Failed to connect to mongodb");
    error_s(error);
  });

const StartServer = () => {
  /**
   * Request and Response Logger
   * */
  app.use((req, res, next) => {
    // Log the request
    info(
      `Incoming - > Method: [${req.method}] - url: [${req.url}] - IP: [${req.socket.remoteAddress}] `
    );
    res.on("finish", () => {
      // log the response
      info(
        `Outgoing - > Method: [${req.method}] - url: [${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`
      );
    });

    next();
  });

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  // app.use(cookieParser());
  app.use(
    cors({
      credentials: true,
      origin: "https://localhost:3030",
    })
  );
  /**
   * Routes
   */
  app.get("/healthCheck", (req, res, next) => {
    res.sendStatus(200);
  });
  /**
   * Error handling
   */
  app.use((req, res, next) => {
    const error = new Error("not found");
    error_s(error);

    return res.status(404).json({ message: error.message });
  });
  http
    .createServer(app)
    .listen(port, () => info(`Server listening on port ${port}.`));
};
