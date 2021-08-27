import mongoose from "mongoose";
import Joi from "joi";
// const Joigoose = require("joigoose")(mongoose);

// interface User {
//   name: string;
//   email: string;
//   password: string;
// }

// const joiUserSchema = Joi.object({
//   name: Joi.string().min(2).max(30).required(),
//   email: Joi.string().min(5).max(255).required().email(),
//   password: Joi.string().min(5).max(1024).required(),
// });

// const mongooseUserSchema = new mongoose.Schema(Joigoose.convert(joiUserSchema));

// const User = mongoose.model("User", mongooseUserSchema);

// exports.User = User;
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxLength: 30,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxLength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxLength: 1024,
  },
});

const User = mongoose.model("User", userSchema);

function validateUser(user: object) {
  const schema = Joi.object({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(1024).required(),
  });

  return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;
