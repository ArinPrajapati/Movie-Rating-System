import mongoose, { Document, Schema } from "mongoose";
import { movies } from "../utils/types";

const moviesSchema = new Schema<movies>({
  actors: {
    type: String,
    required: [true, "input the actors name"],
  },
  description: {
    type: String,
    required: [true, "input the moives desc"],
  },
  director: {
    type: String,
    required: [true, "input the directors name"],
  },
  genre: {
    type: String,
    required: [true, "input the genre"],
  },
  releaseDate: {
    type: Date,
    required: [true, "input date"],
  },
  title: {
    type: String,
    require: [true, "enter moive title"],
  },
});

export default mongoose.model<movies>("Movies", moviesSchema);
