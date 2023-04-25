const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const notesRouter = require("./controllers/notes");
const logger = require("./utils/logger");
const config = require("./utils/config");
const mongoUrl = "mongodb://localhost/bloglist";

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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
