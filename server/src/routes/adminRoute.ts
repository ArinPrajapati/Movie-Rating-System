import express = require("express");
const router = express.Router();
import { jwtMiddleware } from "../middleware/jwtMiddleware";
import {
  createAdmin,
  currentadmin,
  loginUser,
} from "../controllers/adminControllers";

router.get("/all", (req, res) => {
  console.log("hello");
});

router.post("/create", createAdmin);

router.post("/login", loginUser);

router.get("/current", jwtMiddleware, currentadmin);

module.exports = router;
