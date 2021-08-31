const app = require("../src/server");
const supertest = require("supertest");
// const mongoose = require("mongoose");

// import * as dotenv from "dotenv";
// dotenv.config();
// const dbConnectionString = process.env.DB_CONNECTION_STRING;

// describe("Users route for registering/authorising users", () => {
//   beforeEach((done) => {
//     mongoose.connect(
//       dbConnectionString,
//       { useNewUrlParser: true, useUnifiedTopology: true },
//       () => done()
//     );
//   });

//   afterEach((done) => {
//     mongoose.connection.db.dropDatabase(() => {
//       mongoose.connection.close(() => done());
//     });
//   });

describe("Given a valid name, username and password", () => {
  it("should save the information to the db", () => {});
  it("should save the information to the db", () => {});
  it("should response a header with the jwt", () => {});
  it("should response an _id, name and email in json", () => {});
  it("should response a 200 status code", () => {});
});

describe("Given invalid data in the request", () => {
  it("should return 400 status and error message if email invalid", () => {});
  it("should return 400 status and error message if name invalid", () => {});
  it("should return 400 status and error message if password invalid", () => {});
  it("should return 400 status and error message if email missing", () => {});
  it("should return 400 status and error message if name missing", () => {});
  it("should return 400 status and error message if password missing", () => {});
});

describe("Given an existing user (email already in db)", () => {
  it("should return a 400 status", () => {});
  it("should return the error message", () => {});
});

// 1) Return error for bad request body
// 2) Return error if register existing user
// 3) Save new user to db if none of above
