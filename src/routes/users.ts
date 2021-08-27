const { User, validate } = require("../models/user");
import express from "express";

const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).send("That user already exists!");
  } else {
    user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    await user.save();

    return res.send(user);
  }
});

module.exports = router;
