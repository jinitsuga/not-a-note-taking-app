const notesRouter = require("express").Router();
const { response } = require("../app");
const Note = require("../models/note");

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

  const note = new Note({
    title: data.title,
    date: data.date,
    likes: data.likes,
  });

  try {
    const savedNote = await note.save();
    response.status(201).json(savedNote);
  } catch (err) {
    next(err);
  }
});

module.exports = notesRouter;
