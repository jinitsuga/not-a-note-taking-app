const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Note = require("../models/note");

const api = supertest(app);

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

beforeEach(async () => {
  await Note.deleteMany({});
  let noteObj = new Note(initialNotes[0]);
  await noteObj.save();

  noteObj = new Note(initialNotes[1]);
  await noteObj.save();
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

afterAll(async () => {
  await mongoose.connection.close();
});
