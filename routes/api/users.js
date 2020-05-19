const express = require("express");

// @routes          GET /api/users/demo
// @description     Testing Users route
// @access          Public

const router = express.Router();
router.get("/demo", (req, res) => res.json({ msg: "User Work" }));

module.exports = router;
