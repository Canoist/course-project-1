import React from "react";
import User from "./user";
import PropTypes from "prop-types";

const UsersTable = ({
  users,
  onDelete,
  toggleBookmark,
  onSort,
  currentSort
}) => {
  const handleSort = (item) => {
    if (currentSort.iter === item) {
      onSort(({
        ...currentSort,
        order: currentSort.order === "asc" ? "desc" : "asc"
      }));
    } else {
      onSort({ iter: item, order: "asc" });
    }
  };
  return (
    <table className="table  table-striped">
      <thead>
        <tr>
          <th onClick={() => handleSort("name")} scope="col">
            Имя
          </th>
          <th scope="col">Качества</th>
          <th onClick={() => handleSort("profession.name")} scope="col">
            Профессия
          </th>
          <th onClick={() => handleSort("completedMeetings")} scope="col">
            Встретился, раз
          </th>
          <th onClick={() => handleSort("rate")} scope="col">
            Оценка
          </th>
          <th onClick={() => handleSort("bookmark")} scope="col">
            Избранное
          </th>
          <th />
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <User
            user={user}
            key={user._id}
            onDelete={onDelete}
            toggleBookmark={toggleBookmark}
          />
        ))}
      </tbody>
    </table>
  );
};

UsersTable.propTypes = {
  users: PropTypes.array.isRequired,
  onDelete: PropTypes.func,
  toggleBookmark: PropTypes.func,
  onSort: PropTypes.func,
  currentSort: PropTypes.object
};

export default UsersTable;
