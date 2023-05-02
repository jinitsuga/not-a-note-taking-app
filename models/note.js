const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const noteSchema = new Schema({
  content: {
    text: String,
    date: String,
    likes: Number,
  },
  important: Boolean,
  user: String,
});

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;
