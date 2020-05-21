const express = require("express");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const router = express.Router();
const jwt = require("jsonwebtoken");

// Import user model
const User = require("../../models/User");
const key = require("../../config/keys");

// @route          GET /api/users/demo
// @description     Testing Users route
// @access          Public

router.get("/demo", (req, res) => res.json({ msg: "User Work" }));

// @route          GET /api/users/register
// @description    User registration route
// @access          Public

router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) return res.status(400).json({ email: "Email already exists" });
    else {
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
// @description    login user/return jwt tokwn
// @access          Public
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email }).then((user) => {
    // Check the email first and then the password so as to produce the error for email first..
    if (!user) return res.status(404).json({ email: "User not found" });
    // useing bcrypt to compare the plain password and the hased password..
    bcrypt.compare(password, user.password).then((matches) => {
      if (matches) {
        // user matched
        //create payload
        const payload = {
          email: user.email,
          name: user.name,
          avatar: user.avatar,
        };
        jwt.sign(payload, key.key, { expiresIn: 7200 }, (err, token) => {
          if (err) throw err;
          else {
            res.json({
              success: true,
              token: "Bearer" + token,
            });
          }
        });
        // sign the token
      } else return res.status(400).json({ password: "Password Incorrect!" });
    });
  });
});
module.exports = router;
