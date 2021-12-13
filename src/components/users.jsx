import React, { useState } from "react";
import { paginate } from "../utils/paginate";
import Pagination from "./pagination";
import PropTypes from "prop-types";
import User from "./user";

function Users({ users, onDelete, toggleBookmark }) {
  const count = users.length;
  const pageSize = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };
  const userCrop = paginate(users, currentPage, pageSize);
  return (
    <>
      {users.length > 0 && (
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
            {userCrop.map((user) => (
              <User
                user={user}
                key={user._id}
                onDelete={onDelete}
                toggleBookmark={toggleBookmark}
              />
            ))}
          </tbody>
        </table>
      )}
      <Pagination
        itemsCount={count}
        pageSize={pageSize}
        onPageChange={handlePageChange}
        currentPage={currentPage}
        userCrop={userCrop}
      />
    </>
  );
}

Users.propTypes = {
  users: PropTypes.array,
  onDelete: PropTypes.func,
  toggleBookmark: PropTypes.func
};

export default Users;
