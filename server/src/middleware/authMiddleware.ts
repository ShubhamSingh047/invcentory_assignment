// src/middleware/authMiddleware.ts
import { Request, Response, NextFunction } from "express";

// Middleware to restrict access to admin-only routes
export const isAdmin = (
  req: Request, 
  res: Response, 
  next: NextFunction
): void => {
  const role = req.headers["user-role"] as string;

  if (role !== "admin") {
    res.status(403).json({ message: "Forbidden: Admins only" });
    return;
  }

  next(); // Proceed if the user is an admin
};