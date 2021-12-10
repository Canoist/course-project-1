import React from "react";
import Bookmark from "./userComponents/bookmark";
import Qualites from "./userComponents/qualities";

function User({ user, onDelete, toggleBookmark }) {
  // console.log("user---", user);
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

export default User;
