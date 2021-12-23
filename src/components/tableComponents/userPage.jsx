import React from "react";
import QualitiesList from "./qualitiesList";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

const UserPage = (props) => {
  const { user } = props;
  console.log(user);
  const history = useHistory();
  const handleBackToAllUsers = () => {
    history.push("/login");
  };
  return (
    <div>
      <h1>{user.name}</h1>
      <h2>Профессия: {user.profession.name}</h2>
      <QualitiesList qualities={user.qualities} />
      <h4>Встретился раз: {user.completedMeetings}</h4>
      <h2>Rate: {user.rate}/5</h2>
      <button className="btn btn-secondary" onClick={handleBackToAllUsers}>
        Все пользователи
      </button>
    </div>
  );
};

UserPage.propTypes = {
  user: PropTypes.object.isRequired
};

export default UserPage;
