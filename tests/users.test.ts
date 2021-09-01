const request = require("supertest");
const mongoose = require("mongoose");
const expressTest = require("express");
const users = require("../src/routes/users");

const databaseName = "test";
const app1 = require("../src/server");

app1.use(expressTest.json());
app1.use("/api/users", users);

describe("Given a valid name, username and password", () => {
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

  it("should response a header with the jwt", async () => {
    const res = await request(app1).post("/api/users").send({
      name: "Zell",
      email: "testing@gmail.com",
      password: "12345",
    });

    expect(res.header["x-auth-token"]).toBeTruthy();
  });
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
});

describe("Given invalid data in the request", () => {
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

  it("should return 400 status and error message if email invalid", async () => {
    const res = await request(app1).post("/api/users").send({
      name: "Zell",
      email: "testing.com",
      password: "12345",
    });
    expect(res.statusCode).toBe(400);
  });
  it("should return 400 status and error message if name invalid", async () => {
    const res = await request(app1).post("/api/users").send({
      name: "Z",
      email: "testing@gmail.com",
      password: "12345",
    });
    expect(res.statusCode).toBe(400);
  });
  it("should return 400 status and error message if password invalid", async () => {
    const res = await request(app1).post("/api/users").send({
      name: "Zell",
      email: "testing@gmail.com",
      password: "1",
    });
    expect(res.statusCode).toBe(400);
  });
  it("should return 400 status and error message if email missing", async () => {
    const res = await request(app1).post("/api/users").send({
      name: "Zell",
      password: "12345",
    });
    expect(res.statusCode).toBe(400);
  });
  it("should return 400 status and error message if name missing", async () => {
    const res = await request(app1).post("/api/users").send({
      email: "testing@gmail.com",
      password: "12345",
    });
    expect(res.statusCode).toBe(400);
  });
  it("should return 400 status and error message if password missing", async () => {
    const res = await request(app1).post("/api/users").send({
      name: "Zell",
      email: "testing@gmail.com",
    });
    expect(res.statusCode).toBe(400);
  });
});

describe("Given an existing user (email already in db)", () => {
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

  it("should return a 400 status", async () => {
    const user1 = await request(app1).post("/api/users").send({
      name: "Zell",
      email: "testing@gmail.com",
      password: "12345",
    });
    const user2 = await request(app1).post("/api/users").send({
      name: "Zell",
      email: "testing@gmail.com",
      password: "12345",
    });
    expect(user2.statusCode).toBe(400);
  });
  it("should return the error message", async () => {
    const user1 = await request(app1).post("/api/users").send({
      name: "Zell",
      email: "testing@gmail.com",
      password: "12345",
    });
    const user2 = await request(app1).post("/api/users").send({
      name: "Zell",
      email: "testing@gmail.com",
      password: "12345",
    });

    expect(user2.text).toBe("That user already exists!");
  });
});

export {};
