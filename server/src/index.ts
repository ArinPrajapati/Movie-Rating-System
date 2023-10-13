import connectToDatabase from "./config/connectDB";

const express = require("express");
connectToDatabase();
const app = express();
const port = 3000;

app.use("/admin", require("./routes/adminRoute"));

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
