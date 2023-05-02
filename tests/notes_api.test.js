const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Note = require("../models/note");

const api = supertest(app);

const initialNotes = require("./test_helper").initialNotes;
const notesFromDb = require("./test_helper").notesFromDb;

beforeEach(async () => {
  await Note.deleteMany({});
  console.log("cleared db");
  initialNotes.forEach((note) => {
    const noteObj = new Note(note);
    noteObj.save();
  });
});

test("notes returned as json", async () => {
  await api
    .get("/api/notes")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("there are two notes on the DB", async () => {
  const response = await api.get("/api/notes");

  expect(response.body).toHaveLength(2);
});

test("second note is about HTML", async () => {
  const response = await api.get("/api/notes");
  expect(response.body[1].title).toBe("HTML is easy");
});

test("we get all the notes returned", async () => {
  const response = await api.get("/api/notes");

  expect(response.body).toHaveLength(initialNotes.length);
});

test("a specific note is found within all notes", async () => {
  const response = await api.get("/api/notes");

  const contents = response.body.map((res) => res.title);
  expect(contents).toContain("random title 123");
});

test("a specific note can be viewed", async () => {
  const allNotes = await notesFromDb();

  const noteToSearch = allNotes[1];

  const result = await api
    .get(`/api/notes/${noteToSearch._id}`)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  expect(result.body.title).toEqual(noteToSearch.title);
});

afterAll(async () => {
  await mongoose.connection.close();
});
