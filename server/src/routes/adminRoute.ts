import express = require("express");
const router = express.Router();

router.get("/login", (req, res) => {
  console.log("hello");
});

module.exports = router;
