import { Request, Response } from "express";
import { hashSync } from "bcrypt";
import AdminData from "../models/adminModel"; // Assuming you have an AdminData interface for your Mongoose model

const asyncHandler = require("express-async-handler");

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

    const hashPassword = await hashSync(adminPassword, 10);
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

export { createAdmin };
