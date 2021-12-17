import React from "react";
import User from "./user";
import PropTypes from "prop-types";

const UsersTable = ({ users, onDelete, toggleBookmark, onSort }) => {
  return (
    <table className="table  table-striped">
      <thead>
        <tr>
          <th onClick={() => onSort("name")} scope="col">
            Имя
          </th>
          <th scope="col">Качества</th>
          <th onClick={() => onSort("profession.name")} scope="col">
            Профессия
          </th>
          <th onClick={() => onSort("completedMeetings")} scope="col">
            Встретился, раз
          </th>
          <th onClick={() => onSort("rate")} scope="col">
            Оценка
          </th>
          <th onClick={() => onSort("bookmark")} scope="col">
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
  onSort: PropTypes.func
};

export default UsersTable;
