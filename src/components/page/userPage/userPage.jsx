import React from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import UserCard from "../../ui/userCard";
import QualitiesCard from "../../ui/qualities/qualitiesCard";
import MeetingsCard from "../../ui/mettingsCard";
import Comments from "../../ui/comments";
import { useSelector } from "react-redux";
import { getProfessionsLoadingStatus } from "../../../store/professions";
import { getCurrentUserId, getUserById } from "../../../store/users";

const UserPage = ({ userId }) => {
  const isLoading = useSelector(getProfessionsLoadingStatus());
  const user = useSelector(getUserById(userId));
  const currentUserId = useSelector(getCurrentUserId());
  const history = useHistory();
  const handleGoToEditUser = () => {
    history.push(`/users/${currentUserId}/edit`);
  };

  return !isLoading ? (
    <div className="container">
      <div className="row gutters-sm">
        <div className="col-md-4 mb-3">
          <UserCard user={user} onClick={handleGoToEditUser} />
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
