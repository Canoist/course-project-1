import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getIsLoggedIn } from "../../store/users";
import NavProfile from "./navProfile";

const NavBar = () => {
  const isLoggedIn = useSelector(getIsLoggedIn());
  return (
    <nav className="navbar bg-light me-2">
      <div className="container-fluid">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <Link className="nav-link" aria-current="page" to="/">
              Main
            </Link>
          </li>
          {isLoggedIn && (
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/users">
                Users
              </Link>
            </li>
          )}
        </ul>
        {isLoggedIn ? (
          <div className="d-flex">
            <NavProfile />
          </div>
        ) : (
          <Link className="nav-link" aria-current="page" to="/login">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};
export default NavBar;
