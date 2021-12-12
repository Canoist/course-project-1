import React from "react";

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

export default Bookmark;
