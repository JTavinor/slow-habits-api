const request = require("supertest"); // Helps with HTTP testing
const mongoose = require("mongoose"); // FOr connecting to a local db
const express = require("express");

// Our routes for testing
const users = require("../src/routes/users");
const auth = require("../src/routes/auth");

// Creating a test server
const app1 = require("../src/server");

// Using the relevent endpoints
app1.use(express.json());
app1.use("/api/users", users);
app1.use("/api/auth", auth);

describe("Given a valid username and password", () => {
  beforeAll(async () => {
    await mongoose.connect("mongodb://localhost:27017/acmedb", {
      useNewUrlParser: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.db.dropDatabase(() => {
      mongoose.connection.close();
    });
  });

  it("should return a 200 code", async () => {
    await request(app1).post("/api/users").send({
      name: "Zell",
      email: "testing1@gmail.com",
      password: "12345",
    });
    const res = await request(app1).post("/api/auth").send({
      email: "testing1@gmail.com",
      password: "12345",
    });
    expect(res.status).toBe(200);
  });
  it("should return the name, _id, and email in the response body", async () => {
    await request(app1).post("/api/users").send({
      name: "Zell",
      email: "testing1@gmail.com",
      password: "12345",
    });
    const res = await request(app1).post("/api/auth").send({
      email: "testing1@gmail.com",
      password: "12345",
    });
    expect(res.body.name).toBe("Zell");
    expect(res.body._id).toBeTruthy();
    expect(res.body.email).toBe("testing1@gmail.com");
  });

  it("should return a jwt as the response header", async () => {
    const a = await request(app1).post("/api/users").send({
      name: "Zell",
      email: "testing1@gmail.com",
      password: "12345",
    });

    const res = await request(app1).post("/api/auth").send({
      email: "testing1@gmail.com",
      password: "12345",
    });

    expect(res.header["x-auth-token"]).toBeTruthy();
  });
});

export {};
