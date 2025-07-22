import React from "react";
import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-[#1b1b1f] text-white px-4">
      <div className="max-w-md text-center">
        <div className="flex justify-center mb-6">
          <AlertTriangle size={64} className="text-yellow-500 text-primary" />
        </div>
        <h1 className="text-5xl font-bold mb-4 text-primary">404</h1>
        <h2 className="text-2xl font-semibold mb-2 text-primary">
          Page Not Found
        </h2>
        <p className="text-gray-400 mb-6 text-primary">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/home"
          className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition text-primary"
        >
          Go Back
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
