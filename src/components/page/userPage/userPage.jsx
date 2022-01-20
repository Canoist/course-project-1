import React, { useEffect, useState } from "react";
import Qualities from "../../ui/qualities";
import { useHistory } from "react-router-dom";
import API from "../../../api";
import PropTypes from "prop-types";

const UserPage = ({ userId }) => {
  const [user, setUser] = useState("");

  useEffect(() => {
    API.users.getById(userId).then((data) => setUser(data));
  }, []);
  const history = useHistory();
  const handleGoToEditUser = () => {
    history.push(`/users/${userId}/edit`);
  };

  return user ? (
    <div>
      <h1>{user.name}</h1>
      <h2>Профессия: {user.profession.name}</h2>
      <Qualities qualities={user.qualities} />
      <h4>Встретился раз: {user.completedMeetings}</h4>
      <h2>Rate: {user.rate}/5</h2>
      <button className="btn btn-secondary" onClick={handleGoToEditUser}>
        Редактировать
      </button>
    </div>
  ) : (
    <h1>Loading...</h1>
  );
};
UserPage.propTypes = {
  userId: PropTypes.string.isRequired
};

export default UserPage;
