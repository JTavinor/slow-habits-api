import express from "express";
import Joi from "joi"; // For req.body validation
import bcrypt from "bcrypt"; // For checking encrypted passsword
import jwt from "jsonwebtoken"; // For crrating jwt
import _ from "lodash"; // For utility functions

// Getting the relevant environment variables
import * as dotenv from "dotenv";
dotenv.config();
const jwtKey = process.env.JWT_PRIVATE_KEY;

const { User } = require("../models/user"); // Our user model

const router = express.Router(); // For creating our endpoints for this route

// This route should be called when logging in a user.
// The request should have a email and password
// If we have a bad request, or an incorrect email/password => return error
// On good request => Return a jwt in the response header, as well as the id, name and email in the body
router.post("/", async (req, res) => {
  // Validating req.body
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Checking if email exists in our db
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Incorrect email or password");

  // Checking if password is correct
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).send("Incorrect email or password");

  // Correct email + password supplied => create + send JWT, and user data
  const token = jwt.sign({ _id: user._id }, jwtKey);
  return res
    .status(200)
    .header("x-auth-token", token)
    .send(_.pick(user, ["_id", "name", "email"]));
});

// Validates the req.body
function validate(req: object) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(1024).required(),
  });

  return schema.validate(req);
}

module.exports = router;
