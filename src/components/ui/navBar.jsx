import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import NavProfile from "./navProfile";

const NavBar = () => {
  const { currentUser } = useAuth();
  return (
    <nav className="navbar bg-light me-2">
      <div className="container-fluid">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <Link className="nav-link" aria-current="page" to="/">
              Main
            </Link>
          </li>
          {currentUser && (
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/users">
                Users
              </Link>
            </li>
          )}
        </ul>
        {currentUser ? (
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
