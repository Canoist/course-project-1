import React, { useEffect, useState } from "react";
import { paginate } from "../../../utils/paginate";
import Pagination from "../../common/pagination";
import SearchStatus from "../../ui/searchStatus";
import GroupList from "../../common/groupList";
import _ from "lodash";
import UsersTable from "../../ui/usersTable";
import { useAuth } from "../../../hooks/useAuth";
import { useSelector } from "react-redux";
import {
  getProfessions,
  getProfessionsLoadingStatus
} from "../../../store/professions";
import { getUsers } from "../../../store/users";

function UsersListPage() {
  const pageSize = 4;
  const professionsLoading = useSelector(getProfessionsLoadingStatus());
  const professions = useSelector(getProfessions());
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProf, setSelectedProf] = useState();
  const [sortBy, setSortBy] = useState({
    path: "name",
    order: "asc"
  });

  const users = useSelector(getUsers());
  const { currentUser } = useAuth();
  const [searchedUsers, setSearchedUsers] = useState();
  const [inputValue, setInputValue] = useState("");

  const handleToggleBookmark = (status, id) => {
    const userId = users.findIndex((c) => c._id === id);
    users[userId].bookmark = !status;
  };

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const handleProfessionSelect = (item) => {
    setSearchedUsers(undefined);
    setInputValue("");
    setSelectedProf(item);
  };
  const handleSort = (item) => {
    setSortBy(item);
  };

  const handleSearch = (event) => {
    const value = event.target.value.trim().toLowerCase();
    setInputValue(event.target.value);
    setSelectedProf();
    setSearchedUsers(
      value.length > 0
        ? users.filter((user) => user.name.toLowerCase().includes(value))
        : users
    );
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf, inputValue]);

  if (users) {
    const clearFilter = () => {
      setSelectedProf();
    };

    function filterUsers(data) {
      const filteredUsers =
        searchedUsers ||
        (selectedProf
          ? data.filter((user) => user.profession === selectedProf._id)
          : data);
      return filteredUsers.filter((user) => user._id !== currentUser._id);
    }

    const filteredUsers = filterUsers(users);
    const count = filteredUsers.length;
    const sortedUsers = _.orderBy(filteredUsers, sortBy.path, sortBy.order);
    const userCrop = paginate(sortedUsers, currentPage, pageSize);

    return (
      <div className="d-flex">
        {!professionsLoading && professions ? (
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
        ) : (
          <p>Loading profession list...</p>
        )}
        <div className="d-flex flex-column">
          <SearchStatus users={filteredUsers} />
          <input
            type="text"
            className="form-control"
            placeholder="Search..."
            onChange={handleSearch}
            value={inputValue}
          />
          {users.length > 0 && (
            <UsersTable
              users={userCrop}
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
