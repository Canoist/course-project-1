import React from "react";
import Comment from "./comment";
import PropTypes from "prop-types";

const CommentsList = ({ comments, onDelete }) => {
  return (
    <>
      <div className="card mb-2">
        <div className="card-body ">!add comment</div>
      </div>
      <div className="card mb-3">
        <div className="card-body ">
          <h2>Comments</h2>
          <hr />
          {comments.map((comment, index) => (
            <Comment comment={comment} key={index} onDelete={onDelete} />
          ))}
        </div>
      </div>
    </>
  );
};

CommentsList.propTypes = {
  comments: PropTypes.array.isRequired,
  onDelete: PropTypes.func
};

export default CommentsList;
