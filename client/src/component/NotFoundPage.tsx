import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage: React.FC = () => (
  <div className="text-center mt-20 text-white">
    <h1 className="text-5xl">404 - Page Not Found</h1>
    <p className="mt-4">Oops! The page you're looking for doesn't exist.</p>
    <Link to="/dashboard" className="text-blue-400 hover:underline mt-6 block">
      Back to Dashboard
    </Link>
  </div>
);

export default NotFoundPage;
