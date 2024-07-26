import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import defUser from "../images/user.jpg";
import Logo from "../images/logo.png";
function Navbar() {
  const isLoggedIn = useSelector((state) => state.UserInfo.isLoggedIn);
  const avatar = useSelector((state) => state.UserInfo.avatar);

  return (
    <nav className="navbar">
      <div className="navbar-content">
        {/* Logo on the left */}
        <div className="flex flex-row gap-3">
          <img src={Logo} alt="Logo" className="h-10 w-10 rounded-full" />
          <p className="text-[25px] font-extrabold">HellFit</p>
        </div>

        {/* Navigation Links in the middle */}
        <ul className="flex space-x-4 items-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `nav-link ${
                isActive ? "nav-link-active" : ""
              } text-[17px] font-extrabold`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/Exercises"
            className={({ isActive }) =>
              `nav-link ${
                isActive ? "nav-link-active" : ""
              } text-[17px] font-extrabold`
            }
          >
            Exercises
          </NavLink>
        </ul>

        {/* User avatar or login/signup links */}
        <div className="flex space-x-4 items-center">
          {!isLoggedIn ? (
            <>
              <NavLink
                to="/Login"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "nav-link-active" : ""}
                text-[17px] font-extrabold`
                }
              >
                Login
              </NavLink>
              <NavLink
                to="/SignUp"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "nav-link-active" : ""}
                text-[17px] font-extrabold`
                }
              >
                SignUp
              </NavLink>
            </>
          ) : (
            <NavLink to="/User">
              <img
                src={avatar ? avatar : defUser}
                className="w-10 h-10 rounded-full"
                alt="User Avatar"
              />
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
