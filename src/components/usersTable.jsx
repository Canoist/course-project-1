import React from "react";
import User from "./user";
import PropTypes from "prop-types";

const UsersTable = ({ users, onDelete, toggleBookmark }) => {
  return (
    <table className="table  table-striped">
      <thead>
        <tr>
          <th scope="col">Имя</th>
          <th scope="col">Качества</th>
          <th scope="col">Профессия</th>
          <th scope="col">Встретился, раз</th>
          <th scope="col">Оценка</th>
          <th scope="col">Избранное</th>
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
  toggleBookmark: PropTypes.func
};

export default UsersTable;
