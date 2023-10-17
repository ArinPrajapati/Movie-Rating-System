const express = require("express");
import connectDB from "./config/connectDB";
import { errorhandler } from "./middleware/errorhandler";
const app = express();
const port = 3000;
connectDB();
app.use(express.json());

// @route admin
// @ desc this is for the admin login and creation and and verify the admin
app.use("/admin", require("./routes/adminRoute"));

//@route movies
//@desc this is for CURD optration of movies
app.use("/movies", require("./routes/moviesRoutes"));

//@route user
//@desc this is for the user creation and verifly the verify
app.use("/user", require("./routes/userRoutes"));

//@router rating
//@desc this for rating function for only user
app.user("/rate", require("./"));

errorhandler();

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
