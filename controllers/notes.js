const notesRouter = require("express").Router();
const { response } = require("../app");
const Note = require("../models/note");

notesRouter.get("/", (req, res, next) => {
  Note.find({}).then((notes) => {
    response.json(notes);
  });
});

notesRouter.post(" /", (req, res, next) => {
  const data = req.body;
  const note = new Note({
    title: data.title,
    date: data.date,
    likes: data.likes,
  });

  note
    .save()
    .then((savedNote) => {
      response.json(savedNote);
    })
    .catch((err) => next(err));
});
