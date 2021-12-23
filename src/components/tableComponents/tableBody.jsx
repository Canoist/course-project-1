import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { Link } from "react-router-dom";

const TableBody = ({ data, columns }) => {
  const renderContent = (column, item) => {
    if (columns[column].component) {
      const component = columns[column].component;
      if (typeof component === "function") {
        return component(item);
      }
      return component;
    }
    if (columns[column].path === "name") {
      return (
        <Link className="nav-link" to="/login">
          {_.get(item, columns[column].path)}
        </Link>
      );
    }
    return _.get(item, columns[column].path);
  };
  return (
    <tbody>
      {data.map((user) => (
        <tr key={user._id}>
          {Object.keys(columns).map((column) => (
            <td key={column}>{renderContent(column, user)}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

TableBody.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.object.isRequired
};

export default TableBody;
