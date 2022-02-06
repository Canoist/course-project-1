import React, { useEffect, useState } from "react";
import { paginate } from "../../../utils/paginate";
import Pagination from "../../common/pagination";
import SearchStatus from "../../ui/searchStatus";
import GroupList from "../../common/groupList";
import _ from "lodash";
import UsersTable from "../../ui/usersTable";
import { useUsers } from "../../../hooks/useUsers";
import { useProfessions } from "../../../hooks/useProfession";

function UsersListPage() {
  const pageSize = 4;
  const { professions, isLoading } = useProfessions();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProf, setSelectedProf] = useState();
  const [sortBy, setSortBy] = useState({
    path: "name",
    order: "asc"
  });

  const { users } = useUsers();
  const [searchedUsers, setSearchedUsers] = useState();
  const [inputValue, setInputValue] = useState("");

  const handleDelete = (user) => {
    // setUsers(users.filter((p) => p._id !== user._id));
    console.log(user);
  };
  const handleToggleBookmark = (status, id) => {
    const userId = users.findIndex((c) => c._id === id);
    users[userId].bookmark = !status;
    // setUsers([...users]);
    console.log(users);
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

    const filteredUsers =
      searchedUsers ||
      (selectedProf
        ? users.filter((user) => user.profession === selectedProf._id)
        : users);

    const count = filteredUsers.length;
    const sortedUsers = _.orderBy(filteredUsers, sortBy.path, sortBy.order);
    const userCrop = paginate(sortedUsers, currentPage, pageSize);

    return (
      <div className="d-flex">
        {!isLoading ? (
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
