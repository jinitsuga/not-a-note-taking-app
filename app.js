const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const notesRouter = require("./controllers/notes");
const logger = require("./utils/logger");
const config = require("./utils/config");

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

app.use("/api/notes", notesRouter);

app.use("/", (req, res, next) => {
  res.send("hola world lol");
});

module.exports = app;
