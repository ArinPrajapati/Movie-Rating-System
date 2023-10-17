import express = require("express");
const router = express.Router();

import { jwtMiddleware } from "../middleware/jwtMiddleware";
import {
  createUser,
  currentUser,
  getAllUser,
  loginUser,
} from "../controllers/userControllers";

router.get("/all", getAllUser);

router.post("/create", createUser);

router.post("/login", loginUser);

router.get("/current", jwtMiddleware, currentUser);

module.exports = router;
