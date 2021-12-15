import PropTypes from "prop-types";
import React from "react";

const GroupList = ({ items, onItemSelect, valueProperty, contentProperty }) => {
  return (
    <ul className="list-group">
      {Object.keys(items).map((item) => (
        <li className="list-group-item" key={items[item]._id}>
          {items[item].name}
        </li>
      ))}
    </ul>
  );
};
GroupList.defaultProps = {
  valueProperty: "_id",
  contentProperty: "name"
};
GroupList.propTypes = {
  items: PropTypes.object.isRequired,
  onItemSelect: PropTypes.func.isRequired,
  valueProperty: PropTypes.string.isRequired,
  contentProperty: PropTypes.string.isRequired
};
export default GroupList;
