const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const passport = require("passport");

const Profile = require("../../models/Profile");
//load profile model
const User = require("../../models/User");
//load user model

// @routes          GET /api/profiles/demo
// @description     Testing Profiles route
// @access          Public

router.get("/demo", (req, res) => res.json({ msg: "Profiles Work" }));

// @routes          GET /api/profiles/
// @description     Main Profiles route
// @access          Public

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    errors = {};
    Profile.findOne({ user: req.user.id })
      .then((profile) => {
        if (!profile) {
          errors.noProfile = "Profile not found...";
          return res.status(404).json(errors);
        }
      })
      .catch((err) => {
        res.status(404).json(err);
      });
  }
);
module.exports = router;
