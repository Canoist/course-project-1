import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import API from "../../../api";
import PropTypes from "prop-types";
import UserCard from "../../ui/userCard";
import QualitiesCard from "../../ui/qualities/qualitiesCard";

const UserPage = ({ userId }) => {
  const [user, setUser] = useState("");

  useEffect(() => {
    API.users.getById(userId).then((data) => setUser(data));
  }, []);
  const history = useHistory();
  const handleGoToEditUser = () => {
    history.push(`/users/${userId}/edit`);
  };

  console.log(user.qualities);
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
          <QualitiesCard qualities={user.qualities} />
        </div>
        <div className="col-md-8">
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
