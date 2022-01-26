import React, { useEffect, useState } from "react";
import Qualities from "../../ui/qualities";
import { useHistory } from "react-router-dom";
import API from "../../../api";
import PropTypes from "prop-types";
import UserCard from "../../ui/userCard";

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
    <div className="container">
      <div className="row gutters-sm">
        <div className="col-md-4 mb-3">
          <UserCard
            name={user.name}
            profession={user.profession.name}
            rate={user.rate}
            onClick={handleGoToEditUser}
          />
        </div>
        <div className="col-md-8">
          <Qualities qualities={user.qualities} />
          <h4>Встретился раз: {user.completedMeetings}</h4>
          <button className="btn btn-secondary" onClick={handleGoToEditUser}>
            Редактировать
          </button>
        </div>
      </div>
    </div>
  ) : (
    <h1>Loading...</h1>
  );
};
UserPage.propTypes = {
  userId: PropTypes.string.isRequired
};

export default UserPage;
