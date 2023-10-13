import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Define a middleware function to validate JWT tokens
export const jwtMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Get the JWT token from the request headers
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  // Verify and decode the token
  jwt.verify(token, "your_secret_key", (err: any, decoded: any) => {
    if (err) {
      return res.status(403).json({ message: "Failed to authenticate token" });
    }

    // Store the decoded token in the request for further use
    req.data = decoded;
    next();
  });
};
