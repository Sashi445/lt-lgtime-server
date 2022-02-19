const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const router = express.Router();

// model imports
const User = require("./../models/User");

// register new user
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email: email });

  if (user) return res.status(400).send("Email already registered!!");

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({
    name: name,
    email: email,
    password: hashedPassword,
  });

  await newUser.save();
  return res.status(201).json(_.pick(newUser, ["_id", "name", "email"]));
});

// login user
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    email: email,
  });

  if (!user)
    return res.status(400).send("User not found or invalid email address!");

  try {
    const result = await bcrypt.compare(password, user.password);

    if (!result) return res.status(400).send("Incorrect Password!");

    const accessToken = await jwt.sign(
      _.pick(user, ["_id", "name", "email"]),
      process.env.ACCESS_TOKEN_SECRET
    );

    return res.json({
      name : user.name,
      accessToken,
    });
  } catch (e) {
    console.log(e.message);
    return res.status(500).send(e.message);
  }
});

module.exports = router;
