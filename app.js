const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const notesRouter = require("./controllers/notes");

const mongoUrl = "mongodb://localhost/bloglist";
mongoose.connect(mongoUrl);

app.use(cors());
app.use(express.json());

app.use("/api/notes", notesRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
