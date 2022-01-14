/* eslint-disable indent */
import React, { useEffect, useState } from "react";
import { paginate } from "../../../utils/paginate";
import Pagination from "../../common/pagination";
import SearchStatus from "../../ui/searchStatus";
import GroupList from "../../common/groupList";
import API from "../../../api";
import _ from "lodash";
import UsersTable from "../../ui/usersTable";

function UsersListPage() {
  const pageSize = 4;
  const [professions, setProfessions] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProf, setSelectedProf] = useState();
  const [sortBy, setSortBy] = useState({
    path: "name",
    order: "asc"
  });

  const [users, setUsers] = useState();
  const [searchedUsers, setSearchedUsers] = useState();

  useEffect(() => {
    API.users.fetchAll().then((data) => setUsers(data));
  }, []);

  const handleDelete = (user) => {
    setUsers(users.filter((p) => p._id !== user._id));
  };
  const handleToggleBookmark = (status, id) => {
    const userId = users.findIndex((c) => c._id === id);
    users[userId].bookmark = !status;
    setUsers([...users]);
  };

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const handleProfessionSelect = (item) => {
    setSelectedProf(item);
  };
  const handleSort = (item) => {
    setSortBy(item);
  };

  const handleSearch = (event) => {
    const value = event.target.value.trim();
    setSelectedProf();
    setSearchedUsers(
      value.length > 0
        ? users.filter((user) => user.name.toLowerCase().includes(value))
        : users
    );
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf]);

  useEffect(() => {
    API.professions.fetchAll().then((data) => {
      setProfessions(data);
    });
  }, []);

  if (users) {
    const clearFilter = () => {
      setSelectedProf();
    };

    const filteredUsers =
      searchedUsers ||
      (selectedProf
        ? users.filter(
            (user) =>
              JSON.stringify(user.profession) === JSON.stringify(selectedProf)
          )
        : users);

    const count = filteredUsers.length;
    const sortedUsers = _.orderBy(filteredUsers, sortBy.path, sortBy.order);
    const userCrop = paginate(sortedUsers, currentPage, pageSize);

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
          <input
            type="text"
            className="form-control"
            placeholder="Search..."
            onChange={handleSearch}
          />
          {users.length > 0 && (
            <UsersTable
              users={userCrop}
              onDelete={handleDelete}
              toggleBookmark={handleToggleBookmark}
              onSort={handleSort}
              selectedSort={sortBy}
            />
          )}
          <div className="d-flex justify-content-center">
            <Pagination
              itemsCount={count}
              pageSize={pageSize}
              onPageChange={handlePageChange}
              currentPage={currentPage}
            />
          </div>
        </div>
      </div>
    );
  }
  return "loading...";
}

export default UsersListPage;
