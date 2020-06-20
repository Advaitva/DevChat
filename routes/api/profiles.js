const express = require("express");
const router = express.Router();
const passport = require("passport");

// console.log("Arrived!!----");
const Profile = require("../../models/Profile");
//load profile model
const User = require("../../models/User");
//load user model

const validateProfileInput = require("../../validation/profile");
const validateExperienceInput = require("../../validation/experience");
const validateEducationInput = require("../../validation/education");

// @routes          GET /api/profiles/handle/:handle
// @description     Get profile by handle
// @access          Public

router.get("/handle/:handlename", (req, res) => {
  const errors = {};
  Profile.findOne({ handle: req.params.handlename })
    .populate("user", ["name", "avatar"])
    .then((profile) => {
      if (!profile) {
        errors.profile = "No profile found";
        res.status(404).json(errors);
      } else {
        res.json(profile);
      }
    })
    .catch((err) => res.status(400).json(err));
});
// @routes          GET /api/profiles/handle/:handle
// @description     Get profile by handle
// @access          Public

router.get("/id/:user_id", (req, res) => {
  const errors = {};
  Profile.findOne({ id: req.params.user_id })
    .populate("user", ["name", "avatar"])
    .then((profile) => {
      if (!profile) {
        errors.profile = "No profile found";
        res.status(404).json(errors);
      } else {
        res.json(profile);
      }
    })
    .catch((err) => res.status(400).json(err));
});

// @routes          GET /api/profiles/all
// @description     Get all profiles
// @access          Public

router.get("/all", (req, res) => {
  const errors = {};
  Profile.find()
    .populate("user", ["name", "avatar"])
    .then((profiles) => {
      if (!profiles) {
        errors.noprofiles = "No profiles found.";
        res.status(404).json(errors);
      }
      res.json(profiles);
    })
    .catch((err) => res.status(400).json(err));
});

// @routes          GET /api/profiles/
// @description     Main Profiles route
// @access          Public

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
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
// @routes          POST /api/profiles/
// @description     Create user profile
// @access          Private

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }
    const profileField = {};
    profileField.user = req.user.id;
    if (req.body.handle) profileField.handle = req.body.handle;
    if (req.body.company) profileField.company = req.body.company;
    if (req.body.website) profileField.website = req.body.website;
    if (req.body.location) profileField.location = req.body.location;
    if (req.body.status) profileField.status = req.body.status;
    if (req.body.bio) profileField.bio = req.body.bio;
    if (req.body.githubdetails)
      profileField.githubdetails = req.body.githubdetails;
    if (typeof req.body.skills !== "undefined")
      profileField.skills = req.body.skills.split(",");

    profileField.social = {};
    if (req.body.youtube) profileField.social.youtube = req.body.youtube;
    if (req.body.twitter) profileField.social.twitter = req.body.twitter;
    if (req.body.facebook) profileField.social.facebook = req.body.facebook;
    if (req.body.linkedin) profileField.social.linkedin = req.body.linkedin;
    if (req.body.instagram) profileField.social.instagram = req.body.instagram;

    Profile.findOne({ user: req.user.id }).then((profile) => {
      if (profile) {
        //update profile
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileField },
          { new: true }
        ).then((profile) => {
          res.json(profile);
        });
      } else {
        //check for the handle if it is already there
        Profile.findOne({ handle: profileField.handle }).then((profile) => {
          if (profile) {
            errors.handle = "Handle already exists";
            res.status(400).json(errors);
          }
        });

        //create profile
        new Profile(profileField).save().then((profile) => {
          res.json(profile);
        });
      }
    });
  }
);

// @routes          POST /api/profiles/experience
// @description     Add experience to profile
// @access          Private

router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateExperienceInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    console.log(errors);
    Profile.findOne({ user: req.user.id }).then((profile) => {
      const newExp = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description,
      };
      profile.experience.unshift(newExp);
      profile.save().then((profile) => {
        res.json(profile);
      });
    });
  }
);

// @routes          POST /api/profiles/education
// @description     Add education to profile
// @access          Private

router.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateEducationInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    Profile.findOne({ user: req.user.id }).then((profile) => {
      const newEdu = {
        school: req.body.school,
        degree: req.body.degree,
        fieldOfStudy: req.body.fieldOfStudy,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description,
      };
      profile.education.unshift(newEdu);
      profile.save().then((profile) => {
        res.json(profile);
      });
    });
  }
);

// @routes          DELETE /api/profiles/experience/:exp_id
// @description     Delete experience from profile
// @access          Private

router.delete(
  "/experience/:exp_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id }).then((profile) => {
      if (!profile) {
        errors.profile = "No profile found";
        res.status(404).json(errors);
      } else {
        const remIndex = profile.experience
          .map((item) => item.id)
          .indexOf(req.params.exp_id);

        //splice the array

        profile.experience.splice(remIndex, 1);

        //save
        profile
          .save()
          .then((profile) => {
            res.json(profile);
          })
          .catch((err) => res.status(400).json(err));
      }
    });
  }
);

// @routes          DELETE /api/profiles/education/:edu_id
// @description     Delete education from profile
// @access          Private

router.delete(
  "/education/:edu_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id }).then((profile) => {
      if (!profile) {
        errors.profile = "No profile found";
        res.status(404).json(errors);
      } else {
        const remIndex = profile.education
          .map((item) => item.id)
          .indexOf(req.params.edu_id);

        //splice the array
        console.log(profile.education, remIndex);
        profile.education.splice(remIndex, 1);

        //save
        profile
          .save()
          .then((profile) => {
            res.json(profile);
          })
          .catch((err) => res.status(400).json(err));
      }
    });
  }
);

// @routes          DELETE /api/profiles/
// @description     Delete user and profile
// @access          Private

router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() =>
        res.json({ sucess: true })
      );
    });
  }
);

module.exports = router;
