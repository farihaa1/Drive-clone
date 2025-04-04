const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");

router.get("/register", (req, res) => {
  res.render("register");
});

router.post(
  "/register",
  body("email").trim().isEmail(),
  body("password").trim().isLength({ min: 5 }),
  body("name").trim().isLength({ min: 3 }),
  (req, res) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: "Invalid data",
      });
    }
    res.send(errors);
    // console.log(req.body);
    // res.send("user  registered");
  }
);
// router.get("/register", (req, res) => {
//   console.log(req.query);
//   res.send("user test route");
// });

module.exports = router;
