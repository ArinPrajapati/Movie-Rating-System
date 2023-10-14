import express = require("express");
const router = express.Router();

import { jwtMiddleware } from "../middleware/jwtMiddleware";
import {
  createMovie,
  deleteMovie,
  findAMoive,
  getAllMovies,
} from "../controllers/movieControllers";

router.get("/all", getAllMovies);

router.get("/find/:id", findAMoive);

router.post("/create", jwtMiddleware, createMovie);

router.delete("/delete/:id", deleteMovie);

router.patch("/update/:id", (req, res) => {
  res.json(`the id is for update is ${req.params.id}`);
});

module.exports = router;
