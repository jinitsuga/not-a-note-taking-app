const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const notesRouter = require("./controllers/notes");
const logger = require("./utils/logger");
const config = require("./utils/config");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const helpers = require("./utils/helpers");

mongoose
  .connect(config.MONGO_URL)
  .then(() => {
    logger.info("conected to MongoDB");
  })
  .catch((err) => {
    logger.error("error connecting to DB:", err.message);
  });

app.use(cors());
app.use(express.json());
app.use(helpers.requestLogger);

app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
app.use("/api/notes", notesRouter);

app.use(helpers.errorHandler);

module.exports = app;
