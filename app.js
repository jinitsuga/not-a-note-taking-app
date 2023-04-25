const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

const mongoUrl = "mongodb://localhost/bloglist";
mongoose.connect(mongoUrl);

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
