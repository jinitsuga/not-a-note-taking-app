const notesRouter = require("express").Router();
const Note = require("../models/note");
const User = require("../models/user");
const getTokenFrom = require("../utils/list_helper").getTokenFrom;
const jwt = require("jsonwebtoken");

notesRouter.get("/", async (req, res, next) => {
  const notes = await Note.find({}).populate("user", { username: 1, name: 1 });
  res.json(notes);
});

notesRouter.get("/:id", async (req, res, next) => {
  const note = await Note.findById(req.params.id);
  res.json(note);
});

notesRouter.post("/", async (req, res, next) => {
  const data = req.body;

  const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET);
  if (!decodedToken.id) {
    return res.status(401).json({ error: "invalid token" });
  }

  const user = await User.findById(decodedToken.id);

  data.content.date = new Date().toLocaleDateString();

  const note = new Note({
    content: data.content,
    important: data.important === undefined ? false : data.important,
    user: user.id,
  });

  const savedNote = await note.save();

  user.notes = user.notes.concat(savedNote._id);
  await user.save();

  res.status(201).json(savedNote);
});

module.exports = notesRouter;
