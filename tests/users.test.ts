const request = require("supertest");
const mongoose = require("mongoose");
const expressTest = require("express");
const users = require("../src/routes/users");

const databaseName = "test";
const app1 = require("../src/server");

app1.use(expressTest.json());
app1.use("/api/users", users);

beforeEach((done) => {
  mongoose.connect(
    "mongodb://localhost:27017/acmedb",
    { useNewUrlParser: true },
    () => done()
  );
});

afterEach((done) => {
  mongoose.connection.db.dropDatabase(() => {
    mongoose.connection.close(() => done());
  });
});

// describe("Given a valid name, username and password", () => {
//     it("should save the information to the db", () => {});
//     it("should response a header with the jwt", () => {});
it("should response an _id, name and email in json", async () => {
  const res = await request(app1).post("/api/users").send({
    name: "Zell",
    email: "testing@gmail.com",
    password: "12345",
  });

  expect(res.body.name).toBe("Zell");
  expect(res.body.email).toBe("testing@gmail.com");
  expect(res.body._id).toBeTruthy();
});
it("should response a 200 status code", async () => {
  const res = await request(app1).post("/api/users").send({
    name: "Zell",
    email: "testing@gmail.com",
    password: "12345",
  });

  expect(res.statusCode).toBe(200);
});
// });

//   describe("Given invalid data in the request", () => {
//     it("should return 400 status and error message if email invalid", () => {});
//     it("should return 400 status and error message if name invalid", () => {});
//     it("should return 400 status and error message if password invalid", () => {});
//     it("should return 400 status and error message if email missing", () => {});
//     it("should return 400 status and error message if name missing", () => {});
//     it("should return 400 status and error message if password missing", () => {});
//   });

//   describe("Given an existing user (email already in db)", () => {
//     it("should return a 400 status", () => {});
//     it("should return the error message", () => {});
//   });
