import React from "react";
import { Link } from "react-router-dom";

const UserProfileCircle = ({ username, profilePic }) => {
  return (
    <Link to="/dashboard" className="relative">
      <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
        {profilePic ? (
          <img src={profilePic} alt={username} className="w-full h-auto" />
        ) : (
          <span className="text-gray-600 text-xl font-bold">
            {username ? username.charAt(0).toUpperCase() : ""}
          </span>
        )}
      </div>
    </Link>
  );
};

export default UserProfileCircle;
