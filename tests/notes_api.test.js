const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

test("notes returned as json", async () => {
  await api
    .get("/api/notes")
    .expect(200)
    .expect("Content-Type", /application\/json/);
}, 100000);

afterAll(async () => {
  await mongoose.connection.close();
});

test("there are two notes on the DB", async () => {
  const response = await api.get("/api/notes");

  expect(response.body).toHaveLength(2);
});

test("second note is about HTML", async () => {
  const response = await api.get("/api/notes");

  expect(response.body[1].content).toBe("HTML is easy");
});
