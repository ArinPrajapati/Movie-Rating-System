import mongoose, { Document, Schema } from "mongoose";
import { user } from "../utils/types";

const userSchema = new Schema<user>({
  name: {
    type: String,
    required: [true, "input the user name "],
  },
  email: {
    type: String,
    required: [true, "input the user email"],
  },
  password: {
    type: String,
    required: [true, "input the user password"],
  },
});

export default mongoose.model<user>("User", userSchema);
