const notesRouter = require("express").Router();
const Note = require("../models/note");

notesRouter.get("/", (req, res, next) => {
  Note.find({}).then((notes) => {
    res.json(notes);
  });
});

notesRouter.get("/:id", (req, res, next) => {
  Note.findById(req.params.id)
    .then((note) => res.json(note))
    .catch((err) => next(err));
});

notesRouter.post("/", (req, res, next) => {
  const data = req.body;
  const note = new Note({
    title: data.title,
    date: data.date,
    likes: data.likes,
  });
  note
    .save()
    .then((savedNote) => {
      res.json(savedNote);
    })
    .catch((err) => next(err));
});

module.exports = notesRouter;
