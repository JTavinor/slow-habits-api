import mongoose from "mongoose"; // To create a schema
import Joi from "joi"; // For validation

// Defining types for typescript
interface User {
  name: string;
  email: string;
  password: string;
}

// Our mongoose schema for a new user
// When registering a new account, a new user will have to provide
//    their name, email, and a password
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

// Creating a user model
const User = mongoose.model("User", userSchema);

// Extra validation for users
// Takes a user object from req.body
// If the request is valid, returns:
//    object with the req.body under the value property
// If the request is invalid, returns:
//     Same as above, but with an error field
function validateUser(user: object) {
  const schema = Joi.object({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(1024).required(),
  });

  return schema.validate(user);
}

exports.User = User;
exports.validateUser = validateUser;
