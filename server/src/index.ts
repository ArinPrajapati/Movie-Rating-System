import { Request, Response, NextFunction } from "express";
const express = require("express");
import connectDB from "./config/connectDB";
const app = express();
const port = 3000;
connectDB();
app.use(express.json());

app.use("/admin", require("./routes/adminRoute"));

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500);
  res.json({
    error: err.message,
  });
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
