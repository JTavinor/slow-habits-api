import Joi from "joi";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import _ from "lodash";
import * as dotenv from "dotenv";
dotenv.config();
const { User } = require("../models/user");
import express from "express";
const router = express.Router();

const jwtKey = process.env.JWT_PRIVATE_KEY;

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send("Incorrect email or password");
  }

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.status(400).send("Incorrect email or password");
  }
  const token = jwt.sign({ _id: user._id }, jwtKey);
  return res.send(token);
});

function validate(req: object) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(1024).required(),
  });

  return schema.validate(req);
}

module.exports = router;
