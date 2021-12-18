import React from "react";
import PropTypes from "prop-types";
import Bookmark from "./bookmark";
import QualitiesList from "./qualitiesList";
import Table from "./table";

const UsersTable = ({ users, onDelete, toggleBookmark, onSort, selectedSort, ...rest }) => {
  const columns = {
    name: { path: "name", name: "Имя" },
    qualities: {
      name: "Качества",
      component: (user) => <QualitiesList qualities={user.qualities} />
    },
    professions: { path: "profession.name", name: "Профессия" },
    completedMeetings: {
      path: "completedMeetings",
      name: "Встретился, раз"
    },
    rate: { path: "rate", name: "Оценка" },
    bookmark: {
      path: "bookmark",
      name: "Избранное",
      component: (user) => (
        <Bookmark status={user.bookmark} toggleBookmark={toggleBookmark} id={user._id} />
      )
    },
    delete: {
      component: (user) => (
        <button onClick={() => onDelete(user)} className="btn btn-danger">
          delete
        </button>
      )
    }
  };
  return <Table onSort={onSort} selectedSort={selectedSort} columns={columns} data={users} />;
};

UsersTable.propTypes = {
  users: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  toggleBookmark: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired
};

export default UsersTable;
