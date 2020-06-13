const express = require("express");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const router = express.Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");

//import user validation
const validateRegisterInput = require("../../validation/register"); //register

const validateLoginInput = require("../../validation/login"); //login

// Import user model
const User = require("../../models/User");
const keys = require("../../config/keys");

// @route          GET /api/users/demo
// @description     Testing Users route
// @access          Public

router.get("/demo", (req, res) => res.json({ msg: "User Work" }));

// @route          GET /api/users/register
// @description    User registration route
// @access          Public

router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    return res.status(404).json(errors);
  }

  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      errors.email = "Email already exists.";
      return res.status(400).json(errors);
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", //size
        r: "pg", //rating
        d: "mm", // Default
      });

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        avatar,
      });

      bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err;
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          else {
            newUser.password = hash;
            newUser
              .save()
              .then((user) => {
                res.json(user);
              })
              .catch((err) => console.error.bind(console, err));
          }
        });
      });
    }
  });
});

// @route          GET /api/users/login
// @description    login user/return jwt token
// @access          Public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) return res.status(404).json(errors);

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then((user) => {
    errors.email = "User not found";
    // Check the email first and then the password so as to produce the message for email first..
    if (!user) return res.status(404).json(errors);
    // useing bcrypt to compare the plain password and the hased password..
    bcrypt.compare(password, user.password).then((matches) => {
      if (matches) {
        // user matched
        //create payload
        const payload = {
          id: user.id,
          email: user.email,
          name: user.name,
          avatar: user.avatar,
        };
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 7200 * 6 },
          (err, token) => {
            if (err) throw err;
            else {
              res.json({
                success: true,
                token: "Bearer " + token,
              });
            }
          }
        );
        // sign the token
      } else return res.status(400).json({ password: "Password Incorrect!" });
    });
  });
});

// @route          GET /api/users/current
// @description     return current user
// @access          private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({ name: req.user.name, email: req.user.email });
  }
);

module.exports = router;
