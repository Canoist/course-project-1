import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import API from "../../../api";
import PropTypes from "prop-types";
import UserCard from "../../ui/userCard";
import QualitiesCard from "../../ui/qualities/qualitiesCard";
import MeetingsCard from "../../ui/mettingsCard";
import Comments from "../../ui/comments";

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
          <QualitiesCard qualities={user.qualities} />
          <MeetingsCard meets={user.completedMeetings} />
        </div>
        <div className="col-md-8">
          <Comments />
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
