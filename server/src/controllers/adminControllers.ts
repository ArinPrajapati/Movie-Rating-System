import { Request, Response } from "express";
import * as bcrypt from "bcrypt";
import AdminData from "../models/adminModel"; // Assuming you have an AdminData interface for your Mongoose model
import { admin } from "../utils/types";
import { jwtMiddleware } from "../middleware/jwtMiddleware";
const jwt = require("jsonwebtoken");
import * as dotenv from "dotenv";
dotenv.config();

const asyncHandler = require("express-async-handler");

// @route is post /admin/create
//@use create an admin account
// @access only admin
const createAdmin = asyncHandler(async (req: Request, res: Response) => {
  try {
    if (!req.body) {
      return res
        .status(400)
        .json({ error: "Request body is missing or empty" });
    }

    const { adminName, adminPassword, adminSecret } = req.body;

    if (!adminName || !adminPassword || !adminSecret) {
      return res.status(400).json({ error: "All fields are mandatory" });
    }
    console.log(req.body);

    const adminIsAlreadyRes = await AdminData.findOne({ adminSecret });
    console.log("find pass");
    if (adminIsAlreadyRes) {
      return res.status(400).json({ error: "Admin is already registered" });
    }

    const hashPassword = await bcrypt.hashSync(adminPassword, 10);
    console.log("hashed password: ", hashPassword);

    const admin = await AdminData.create({
      adminName,
      adminSecret,
      adminPassword: hashPassword,
    });

    if (admin) {
      return res.status(201).json({
        _id: admin._id,
        adminName: admin.adminName,
        adminSecret: admin.adminSecret,
      });
    } else {
      return res.status(400).json({ error: "Admin data is not valid" });
    }
  } catch (error) {
    console.error("Error creating admin:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// @route is post /admin/create
//@use create an admin account
// @access only admin

const loginUser = asyncHandler(async (req: Request, res: Response) => {
  try {
    if (!req.body) {
      return res
        .status(400)
        .json({ error: "Request body is missing or empty" });
    }
    const { adminName, adminPassword, adminSecret }: admin = req.body;
    if (!adminName || !adminPassword || !adminSecret) {
      res.status(400);
      throw new Error("All field are madatory!");
    }
    const admin = await AdminData.findOne({ adminSecret });

    if (admin && (await bcrypt.compare(adminPassword, admin.adminPassword))) {
      const accessToken = jwt.sign(
        {
          admin: {
            adminName: admin.adminName,
            adminPassword: admin.adminPassword,
            adminSecret: admin.adminSecret,
          },
        },
        process.env.JWT_SECRET
      );
      res.status(200).json({ accessToken, admin });
    } else {
      res.status(401);
      throw new Error("entery or password is wrong");
    }
  } catch (error) {}
});

//@desc test for jwt
//@route get admin/current
//@access private

const currentadmin = asyncHandler(async (req, res) => {
  res.json(req.data);
});

export { createAdmin, loginUser, currentadmin };
