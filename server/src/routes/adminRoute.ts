import express = require("express");
const router = express.Router();
import { jwtMiddleware } from "../middleware/jwtMiddleware";
import {
  createAdmin,
  currentadmin,
  loginAdmin,
} from "../controllers/adminControllers";

router.post("/create", createAdmin);

router.post("/login", loginAdmin);

router.get("/current", jwtMiddleware, currentadmin);

module.exports = router;
