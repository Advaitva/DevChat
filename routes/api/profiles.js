const express = require("express");

// @routes          GET /api/profiles/demo
// @description     Testing Profiles route
// @access          Public

const router = express.Router();
router.get("/demo", (req, res) => res.json({ msg: "Profiles Work" }));

module.exports = router;
