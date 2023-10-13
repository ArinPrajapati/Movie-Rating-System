const asyncHandler = require("express-async-handler");
const Admin = require("../models/adminModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
import { Request, Response, NextFunction } from "express";
import { admin } from "../utils/types";

const createAdmin = asyncHandler(async (req: Request, res: Response) => {
  const { adminName, adminPassword, adminScrect }: admin = req.body;
  if (!adminName || !adminPassword || !adminScrect) {
    res.status(400);
    throw new Error("All field are mandatory");
  }
  const adminIsAlreadyRes = await Admin.findone({ adminScrect });
  if (adminIsAlreadyRes) {
    res.status(400);
    throw new Error("Admin is already register");
  }
  const hashpassword = await bcrypt.hash(adminPassword, 20);
  console.log("hashed password: ", hashpassword);
  const user = await Admin.create({
    adminName,
    adminScrect,
    adminPassword: hashpassword,
  });
});
