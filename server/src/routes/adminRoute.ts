import express = require("express");
const router = express.Router();
import { jwtMiddleware } from "../middleware/jwtMiddleware";
import { createAdmin } from "../controllers/adminControllers";

router.get("/all", (req, res) => {
  console.log("hello");
});

router.post("/create", createAdmin);

router.post("/login", (req, res) => {
  console.log("login post");
});

module.exports = router;
