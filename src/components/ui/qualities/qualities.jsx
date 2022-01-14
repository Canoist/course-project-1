import React from "react";
import PropTypes from "prop-types";

function Qualities({ quality }) {
  return (
    <span className={"badge m-1 bg-" + quality.color} key={quality._id}>
      {quality.name}
    </span>
  );
}

Qualities.propTypes = {
  quality: PropTypes.object.isRequired
};

export default Qualities;
