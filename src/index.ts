const app = require("./server"); // Our express server
const mongoose = require("mongoose"); // For connecting with mongodb
const express = require("express");

// Our custom defined routes
const users = require("./routes/users");
const auth = require("./routes/auth");

// Getting our environment variables environment variables
import * as dotenv from "dotenv";
dotenv.config();
const dbConnectionString = process.env.DB_CONNECTION_STRING;
const jwtKey = process.env.JWT_PRIVATE_KEY;

// Making sure our JWT key is defined
if (!jwtKey) {
  console.error("FATAL ERROR: No jwt private key defined.");
  process.exit(1);
}

// Allows our app to parse json
app.use(express.json());

// Defining endpoints for our routes
app.use("/api/users", users);
app.use("/api/auth", auth);

// Connecting to mongoDB with mongoose
mongoose
  .connect(dbConnectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err: string) => console.log("Could not connect to MongoDB", err));

// Listen to server on port 5000
app.listen(5000, () => {
  console.log("Server has started!");
});
