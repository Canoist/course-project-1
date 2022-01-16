import React from "react";
import PropTypes from "prop-types";

function Bookmark({ status, toggleBookmark, id }) {
  return (
    <button
      onClick={() => {
        toggleBookmark(status, id);
      }}
    >
      {status ? (
        <i className="bi bi-bookmark-star-fill"></i>
      ) : (
        <i className="bi bi-bookmark-star"></i>
      )}
    </button>
  );
}

Bookmark.propTypes = {
  status: PropTypes.bool.isRequired,
  toggleBookmark: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired
};

export default Bookmark;
