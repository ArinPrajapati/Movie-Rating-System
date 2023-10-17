import { Request, Response } from "express";
import * as bcrypt from "bcrypt";
import User from "../models/userModels";
import { user } from "../utils/types";
import { jwtMiddleware } from "../middleware/jwtMiddleware";
const jwt = require("jsonwebtoken");
import * as dotenv from "dotenv";
dotenv.config();

const asyncHandler = require("express-async-handler");

//@route is post /admin/create
//@use create an user account
//@access only user

const createUser = asyncHandler(async (req: Request, res: Response) => {
  try {
    if (!req.body) {
      return res
        .status(400)
        .json({ error: "Request body is missing or empty" });
    }

    const { name, email, password }: user = req.body;

    console.log(req.body);
    const userAlreadyRes = await User.findOne({ email });
    console.log("Find pass");
    if (userAlreadyRes) {
      return res.status(400).json({ error: "admin is already reqistered" });
    }
    const hashPassword = await bcrypt.hashSync(password, 10);
    console.log("hashed password: ", hashPassword);
    const user = await User.create({
      name,
      password: hashPassword,
      email,
    });
    if (user) {
      return res.status(201).json({
        name: user.name,
        password: user.password,
        email: email,
      });
    } else {
      return res.status(400).json({ error: "User data is not valid" });
    }
  } catch (error) {
    console.error("Error creating User:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

//@route is post /user/login
//@use login for user
//@access only user
const loginUser = asyncHandler(async (req: Request, res: Response) => {
  try {
    if (!req.body) {
      return res
        .status(400)
        .json({ error: "Request body is missing or empty" });
    }
    const { name, password, email } = req.body;

    if (!name || !password || !email) {
      res.status(400).json({ error: "request body is missing or empty" });
    }
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const accessToken = jwt.sign(
        {
          user: {
            name: user.name,
            password: user.password,
            email: user.email,
          },
        },
        process.env.JWT_SECRET
      );
      res.status(200).json({ accessToken, user });
    } else {
      const errorMessage = "Email, name, or password is wrong";
      console.error(errorMessage, Error); // Log the error for debugging
      res.status(401).json({ error: errorMessage });
    }
  } catch (error) {
    console.error("Error login admin:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

const currentUser = asyncHandler(async (req, res) => {
  console.log(req.data);
  res.json(req.data.user);
});

const getAllUser = asyncHandler(async (req: Request, res: Response) => {
  try {
    const users: user[] = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error Getting all user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export { createUser, currentUser, loginUser, getAllUser };
