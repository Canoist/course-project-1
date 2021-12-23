import React from "react";

const NavBar = () => {
  return (
    <nav className="nav nav-tabs">
      <a className="nav-link active" aria-current="page" href="/">
        Main
      </a>
      <a className="nav-link" href="/login">
        Login
      </a>
      <a className="nav-link" href="/users">
        Users
      </a>
    </nav>
  );
};
export default NavBar;
