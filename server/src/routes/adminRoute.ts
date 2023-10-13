import express = require("express");
const router = express.Router();
import { jwtMiddleware } from "../middleware/jwtMiddleware";

router.get("/all", (req, res) => {
  console.log("hello");
});

router.post("/create", (req, res) => {
  console.log("hee create");
});

router.post("/login", (req, res) => {
  console.log("login post");
});

module.exports = router;
