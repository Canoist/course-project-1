import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import API from "../../../api";
import PropTypes from "prop-types";
import UserCard from "../../ui/userCard";
import QualitiesCard from "../../ui/qualities/qualitiesCard";
import MeetingsCard from "../../ui/mettingsCard";
import CommentsList from "../../ui/comments/commentsList";

const UserPage = ({ userId }) => {
  const [user, setUser] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    API.users.getById(userId).then((data) => setUser(data));
    API.comments.fetchCommentsForUser(userId).then((data) => setComments(data));
  }, []);

  const handleDelete = (id) => {
    API.comments.remove(id);
    setComments(comments.filter((c) => c._id === id));
    console.log("delete", id);
  };

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
          <h1>Здесь будут комменты</h1>
          {comments ? (
            <CommentsList comments={comments} onDelete={handleDelete} />
          ) : (
            <h1>No comments found</h1>
          )}
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
