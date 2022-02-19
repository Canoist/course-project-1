import React from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import UserCard from "../../ui/userCard";
import QualitiesCard from "../../ui/qualities/qualitiesCard";
import MeetingsCard from "../../ui/mettingsCard";
import Comments from "../../ui/comments";
import { useUsers } from "../../../hooks/useUsers";
import { useProfessions } from "../../../hooks/useProfession";
import { CommentsProvider } from "../../../hooks/useComments";
import { useAuth } from "../../../hooks/useAuth";

const UserPage = ({ userId }) => {
  const { getUser } = useUsers();
  const { isLoading } = useProfessions();
  const user = getUser(userId);
  const { currentUser } = useAuth();
  const history = useHistory();
  const handleGoToEditUser = () => {
    history.push(`/users/${currentUser._id}/edit`);
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
          <CommentsProvider>
            <Comments />
          </CommentsProvider>
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
