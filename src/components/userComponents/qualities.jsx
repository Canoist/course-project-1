import React from "react";

function Qualities({ quality }) {
  return (
    <span className={"badge m-1 bg-" + quality.color} key={quality._id}>
      {quality.name}
    </span>
  );
}

export default Qualities;
