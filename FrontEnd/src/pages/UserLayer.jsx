import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import "./style/authLayer.css";
import { RiUser2Fill } from "react-icons/ri";

const UserLayer = () => {
  // Access user data from the Redux store
  const user = useSelector((state) => state.Auth.user); // Adjust the path based on your state structure

  // Local state to manage loading status
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading completion
    if (user) {
      setLoading(false);
    }
  }, [user]);

  return (
    <div>
      <div className="user-layer">
        <p className="userinfo">
          <RiUser2Fill />
          {loading ? (
            <span>Loading user information...</span>
          ) : user ? (
            <>
              <span> {user.UserName}</span>
              <span> {user.UserEmail}</span>
            </>
          ) : (
            <span>User not found.</span>
          )}
        </p>
      </div>

      {/* Outlet renders child routes/components */}
      <Outlet />
    </div>
  );
};

export default UserLayer;