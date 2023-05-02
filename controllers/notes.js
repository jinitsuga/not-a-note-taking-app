const notesRouter = require("express").Router();
const { response } = require("../app");
const Note = require("../models/note");
const User = require("../models/user");

notesRouter.get("/", async (req, res, next) => {
  const notes = await Note.find({});
  res.json(notes);
});

notesRouter.get("/:id", async (req, res, next) => {
  const note = await Note.findById(req.params.id);
  res.json(note);
});

notesRouter.post("/", async (req, res, next) => {
  const data = req.body;

  const user = await User.findById(data.userId);

  console.log(user);

  data.content.date = new Date().toLocaleDateString();

  const note = new Note({
    content: data.content,
    important: data.important === undefined ? false : data.important,
    user: user.id,
  });

  const savedNote = await note.save();

  user.notes = user.notes.concat(savedNote._id);

  res.status(201).json(savedNote);
});

module.exports = notesRouter;
