import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const NavProfile = () => {
  const { currentUser } = useAuth();
  const [isOpen, setOpen] = useState(false);
  const toggleMenu = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div className="dropdown">
      <div
        className="btn dropdown-toggle d-flex align-items-center"
        onClick={toggleMenu}
      >
        <div className="me-2">{currentUser.name}</div>
        <img
          src={`https://avatars.dicebear.com/api/avataaars/${(Math.random() + 1)
            .toString(36)
            .substring(7)}.svg`}
          alt="Photo user's"
          className="img-responsive rounded-circle"
        />
      </div>
      <div className={"w-100 dropdown-menu" + (isOpen ? " show" : "")}>
        <Link to={`users/${currentUser._id}`} className="dropdown-item">
          Profile
        </Link>
        <Link to="logout" className="dropdown-item">
          Log out
        </Link>
      </div>
    </div>
  );
};
export default NavProfile;
