const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.get("/register", (req, res) => {
  res.render("register");
});

router.post(
  "/register",
  body("email").trim().isEmail(),
  body("password").trim().isLength({ min: 5 }),
  body("name").trim().isLength({ min: 3 }),
  async (req, res) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: "Invalid data",
      });
    }
    const { email, name, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await userModel.create({
      email,
      name,
      password: hashPassword,
    });
    res.send(newUser);
    // console.log(req.body);
    // res.send("user  registered");
  }
);
router.get("/login", (req, res) => {
  res.render("login");
});

router.post(
  "/login",
  body("name").trim().isLength({ min: 3 }),
  body("password").trim().isLength({ min: 5 }),
  async (req, res) => {
    console.log(body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: errors.array(),
        message: "Invalid Dta",
      });
    }

    const { name, password } = req.body;
    const user = await userModel.findOne({
      name: name,
    });

    if (!user) {
      return res.status(400).json({
        message: "Username or password is incorrect",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "username or password incorrect",
      });
    }
    const token = jwt.sign(
      {
        useId: user._id,
        email: user.email,
        name: user.name,
      },
      process.env.JWT_SECRET
    );

    res.json({
        token
    })
  }
);

module.exports = router;
