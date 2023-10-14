import express = require("express");
const router = express.Router();

import { jwtMiddleware } from "../middleware/jwtMiddleware";
import {
  createMovie,
  deleteMovie,
  findAMoive,
  getAllMovies,
  updateMovie,
} from "../controllers/movieControllers";

router.get("/all", getAllMovies);

router.get("/find/:id", findAMoive);

router.post("/create", jwtMiddleware, createMovie);

router.delete("/delete/:id", jwtMiddleware, deleteMovie);

router.patch("/update/:id", jwtMiddleware, updateMovie);

module.exports = router;
