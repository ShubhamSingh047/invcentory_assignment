"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = void 0;
// Middleware to restrict access to admin-only routes
const isAdmin = (req, res, next) => {
    const role = req.headers["user-role"];
    if (role !== "admin") {
        res.status(403).json({ message: "Forbidden: Admins only" });
        return;
    }
    next(); // Proceed if the user is an admin
};
exports.isAdmin = isAdmin;
