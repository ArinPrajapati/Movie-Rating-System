import { Request, Response } from "express";
import { movies } from "../utils/types";
import Movies from "../models/moiveModels";
import moiveModels from "../models/moiveModels";
const asyncHandler = require("express-async-handler");

//@route post- /movies/create
//@desc the create movies
//@access only admin\

const createMovie = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { adminName, adminPassword, adminSecret } = req.data;

    console.log(req.data.admin.adminName);
    if (!req.data.admin.adminName) {
      return res
        .status(401)
        .json({ message: "only admin can add or modifily the movives" });
    }
    console.log(req.body);
    if (!req.body) {
      return res
        .status(400)
        .json({ error: "Request body is missing or empty" });
    }

    const { actors, description, director, genre, releaseDate, title }: movies =
      req.body;

    if (
      !actors ||
      !description ||
      !director ||
      !genre ||
      !releaseDate ||
      !title
    ) {
      return res.status(400).json({ error: "All fields are mandatory" });
    }

    const moviesAllreadyRes = await Movies.findOne({ title });
    if (moviesAllreadyRes) {
      return res.status(400).json({ error: "Movies is already registered" });
    }

    const movie = await Movies.create({
      actors,
      description,
      director,
      genre,
      releaseDate,
      title,
    });

    if (movie) {
      return res.status(201).json({
        _id: movie._id,
        actors: movie.actors,
        description: movie.description,
        director: movie.director,
        genre: movie.genre,
        releaseDate: movie.releaseDate,
        title: movie.title,
      });
    } else {
      return res.status(400).json({ error: "Movie data is not valid" });
    }
  } catch (error) {
    console.error("Error creating movie:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

const getAllMovies = asyncHandler(async (req: Request, res: Response) => {
  try {
    const moives: movies[] = await Movies.find();
    res.status(200).json(moives);
  } catch (error) {
    console.error("Error Getting all movie:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

const findAMoive = asyncHandler(async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const moive = await Movies.findOne({ title: id });
    if (!moive) {
      return res.status(400).json({ error: "no such movie" });
    }
    res.status(200).json(moive);
  } catch (error) {
    console.error("Error getting  movie:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

const deleteMovie = asyncHandler(async (req: Request, res: Response) => {
  try {
    if (!req.data.admin.adminName) {
      return res.status(401).json({ message: "Only admin can update movies" });
    }
    const id = req.params.id;
    const delMovie = await Movies.deleteOne({ title: id });

    if (delMovie.deletedCount == 0) {
      return res.status(400).json({ error: "no such moive" });
    }
    res.status(200).json(delMovie);
  } catch (error) {
    console.error("Error getting  movie:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

//@route put - /movies/update/:id
//@desc Update a movie
//@access only admin

const updateMovie = asyncHandler(async (req: Request, res: Response) => {
  try {
    console.log(req.data.admin.adminName);
    if (!req.data.admin.adminName) {
      return res.status(401).json({ message: "Only admin can update movies" });
    }

    const id = req.params.id;
    const movieToUpdate = await Movies.findOne({ title: id });

    if (!movieToUpdate) {
      return res.status(404).json({ error: "Movie not found" });
    }

    // You can update the movie fields here based on your requirements.
    // For example, you can update the movie's title, description, etc.
    if (req.body.title) {
      movieToUpdate.title = req.body.title;
    }
    if (req.body.description) {
      movieToUpdate.description = req.body.description;
    }
    if (req.body.releaseDate) {
      movieToUpdate.description = req.body.releaseDate;
    }
    if (req.body.actors) {
      movieToUpdate.actors = req.body.actors;
    }
    if (req.body.genre) {
      movieToUpdate.genre = req.body.genre;
    }
    if (req.body.director) {
      movieToUpdate.director = req.body.director;
    }

    const updatedMovie = await movieToUpdate.save();

    if (updatedMovie) {
      return res.status(200).json(updatedMovie);
    } else {
      return res.status(400).json({ error: "Movie data is not valid" });
    }
  } catch (error) {
    console.error("Error updating movie:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export { createMovie, getAllMovies, findAMoive, deleteMovie, updateMovie };
