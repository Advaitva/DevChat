const express = require("express");

// @routes          GET /api/posts/demo
// @description     Testing Posts route
// @access          Public

const router = express.Router();
router.get("/demo", (req, res) => res.json({ msg: "Posts Work" }));

module.exports = router;
