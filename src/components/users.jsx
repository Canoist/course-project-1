/* eslint-disable indent */
import React, { useEffect, useState } from "react";
import { paginate } from "../utils/paginate";
import Pagination from "./pagination";
import PropTypes from "prop-types";
import SearchStatus from "./searchStatus";
import GroupList from "./groupList";
import API from "../api";
import UsersTable from "./usersTable";

function Users({ users, onDelete, toggleBookmark }) {
  const pageSize = 2;
  const [professions, setProfessions] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProf, setSelectedProf] = useState();

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const handleProfessionSelect = (item) => {
    setSelectedProf(item);
  };
  const handleSort = (item) => {
    console.log(item);
  };

  const clearFilter = () => {
    setSelectedProf();
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf]);

  useEffect(() => {
    API.professions.fetchAll().then((data) => {
      setProfessions(data);
    });
  }, []);

  const filteredUsers = selectedProf
    ? users.filter(
        (user) =>
          JSON.stringify(user.profession) === JSON.stringify(selectedProf)
      )
    : users;

  const count = filteredUsers.length;
  const userCrop = paginate(filteredUsers, currentPage, pageSize);

  return (
    <div className="d-flex">
      {professions && (
        <div className="d-flex flex-column flex-shrink-0 p-3">
          <GroupList
            items={professions}
            onItemSelect={handleProfessionSelect}
            selectedItem={selectedProf}
          />
          <button className="btn btn-secondary mt-2" onClick={clearFilter}>
            Очистить
          </button>
        </div>
      )}
      <div className="d-flex flex-column">
        <SearchStatus users={filteredUsers} />
        {users.length > 0 && (
          <UsersTable
            users={userCrop}
            onDelete={onDelete}
            toggleBookmark={toggleBookmark}
            onSort={handleSort}
          />
        )}
        <div className="d-flex justify-content-center">
          <Pagination
            itemsCount={count}
            pageSize={pageSize}
            onPageChange={handlePageChange}
            currentPage={currentPage}
            userCrop={userCrop}
          />
        </div>
      </div>
    </div>
  );
}

Users.propTypes = {
  users: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  onDelete: PropTypes.func.isRequired,
  toggleBookmark: PropTypes.func.isRequired
};

export default Users;
