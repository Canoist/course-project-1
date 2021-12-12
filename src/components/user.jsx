import React from "react";
import Bookmark from "./userComponents/bookmark";
import Qualites from "./userComponents/qualities";
import PropTypes from "prop-types";

function User({ user, onDelete, toggleBookmark }) {
  return (
    <tr>
      <td>{user.name}</td>
      <td>
        {user.qualities.map((qual) => (
          <Qualites quality={qual} key={qual._id} />
        ))}
      </td>
      <td>{user.profession.name}</td>
      <td>{user.completedMeetings}</td>
      <td>{user.rate}</td>
      <td>
        <Bookmark
          status={user.bookmark}
          toggleBookmark={toggleBookmark}
          id={user._id}
        />
      </td>
      <td>
        <button onClick={() => onDelete(user)} className="btn btn-danger">
          delete
        </button>
      </td>
    </tr>
  );
}

User.propTypes = {
  user: PropTypes.object,
  onDelete: PropTypes.func,
  toggleBookmark: PropTypes.func
};

export default User;
