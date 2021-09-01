import express from "express";
import bcrypt from "bcrypt"; // For salting and hashing passwords
import jwt from "jsonwebtoken"; // For generating a jwt
import _ from "lodash"; // For utility functions

// Getting the relevant environment variables
import * as dotenv from "dotenv";
dotenv.config();
const jwtKey = process.env.JWT_PRIVATE_KEY;

const router = express.Router(); // For creating our endpoints for this route

const { User, validateUser } = require("../models/user"); // Our user model and validation

// This route should be called when registering a new user.
// The request should have a name, email and password satisfying the constraints laid out in the schema
// If we have a bad request, or that email already exists in our db => return error
// On good request => Return a jwt in the response header, as well as the id, name and email in the body
router.post("/", async (req, res) => {
  // Checking if the req.body is valid
  // If not, returning the error message
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Checking to see if the users email is already in our db
  // If not return error message
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("That user already exists!");

  user = new User(_.pick(req.body, ["name", "email", "password"])); // Create a new user
  const salt = await bcrypt.genSalt(10); // Salting password
  user.password = await bcrypt.hash(user.password, salt); // Updating users password with hashed version to be stored in the db
  await user.save(); // Saving user to the db

  const token = jwt.sign({ _id: user._id }, jwtKey); // Creating a jwt
  // Returning jwt as header, as well as res.body
  return res
    .status(200)
    .header("x-auth-token", token)
    .send(_.pick(user, ["_id", "name", "email"]));
});

module.exports = router;
