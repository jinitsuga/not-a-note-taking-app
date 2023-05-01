const Note = require("../models/note");

const initialNotes = [
  {
    title: "random title 123",
    likes: 3,
    date: new Date(),
  },
  {
    title: "HTML is easy",
    likes: 4,
    date: new Date(),
  },
];

const notesFromDb = async () => {
  const notes = await Note.find({});
  return notes.map((note) => note.toJSON());
};

module.exports = {
  initialNotes,
  notesFromDb,
};
