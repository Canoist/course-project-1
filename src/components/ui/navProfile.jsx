import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCurrentUserData } from "../../store/users";

const NavProfile = () => {
  const currentUser = useSelector(getCurrentUserData());
  const [isOpen, setOpen] = useState(false);
  const toggleMenu = () => {
    setOpen((prev) => !prev);
  };
  if (!currentUser) return "Loading...";

  return (
    <div className="dropdown mx-5">
      <div
        className="btn dropdown-toggle d-flex align-items-center"
        onClick={toggleMenu}
      >
        <div className="me-2">{currentUser.name}</div>
        <img
          src={currentUser.image}
          alt="Photo user's"
          className="img-responsive rounded-circle"
          height="45px"
          width="45px"
        />
      </div>
      <div className={"w-100 dropdown-menu" + (isOpen ? " show" : "")}>
        <Link to={`/users/${currentUser._id}`} className="dropdown-item">
          Profile
        </Link>
        <Link to="/logout" className="dropdown-item">
          Log out
        </Link>
      </div>
    </div>
  );
};
export default NavProfile;
