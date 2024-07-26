import React from "react";
import { useSelector, useDispatch } from "react-redux";
import user from "../images/user.jpg";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Button from "../componets/Button.jsx";
import { logout } from "../store/UserSlice.js";
import { localHost } from "../constants.js";
import UpdateAvatarImage from "../componets/UpdateAvatarImage.jsx";
import UpdateDetails from "../componets/UpdateDetails.jsx";
import ChangePassword from "../componets/ChangePassword.jsx";
import WorkoutPage from "./WorkoutPage.jsx";

const DashboardPage = () => {
  const { username, avatar, workOutSplit } = useSelector(
    (state) => state.UserInfo
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const response = await fetch(`${localHost}/users/logout`, {
      method: "POST",
      credentials: "include",
    });
    const res = await response.json();
    dispatch(logout());
    alert("User successfully logged out");
    navigate("/");
  };

  return (
    <div className="flex h-screen w-full">
      {/* Sidebar */}
      <div className="w-1/5 flex flex-col items-center bg-gray-800 text-white py-5">
        <div className="w-24 h-24 mb-5">
          <img
            src={avatar ? avatar : user}
            alt="User Avatar"
            className="w-full h-full object-cover rounded-full"
            style={{ aspectRatio: "1/1" }}
          />
        </div>
        <div className="font-medium flex items-center justify-center mb-2 p-2 w-full rounded hover:bg-gray-600 hover:text-white transition-colors cursor-pointer">
          {username}
        </div>
        <nav className="flex flex-col w-full">
          <div className="font-medium flex items-center justify-center my-2 p-2 w-full rounded cursor-pointer">
            <UpdateAvatarImage />
          </div>
          <div className="font-medium flex items-center justify-center my-2 p-2 w-full rounded cursor-pointer">
            <UpdateDetails />
          </div>
          <div className="font-medium flex items-center justify-center my-2 p-2 w-full rounded cursor-pointer">
            <ChangePassword />
          </div>
          <div className="font-medium flex items-center justify-center my-2 p-2 w-full rounded cursor-pointer">
            <Button
              className="font-medium flex items-center justify-center w-full rounded cursor-pointer text-sm px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
              children={"Logout"}
              onClick={handleLogout}
            />
          </div>
        </nav>
      </div>
      {/* Main Content */}
      <div className="w-4/5 bg-gray-50 p-5">
        <WorkoutPage />
      </div>
    </div>
  );
};

export default DashboardPage;
