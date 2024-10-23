import { Request, Response, NextFunction } from "express";

// Middleware to restrict access to admin-only routes
export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const role = req.headers["user-role"] as string;
  if (role !== "admin") {
    return res.status(403).json({ message: "Forbidden: Admins only" });
  }

  next(); // Proceed if the user is an admin
};
