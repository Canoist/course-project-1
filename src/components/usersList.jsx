import React from "react";
import { useState } from "react/cjs/react.development";
import api from "../api";
import Table from "./table";

const UsersList = () => {
  const [users, setUsers] = useState(api.users.fetchAll());
  const handleDelete = (user) => {
    setUsers(users.filter((p) => p._id !== user._id));
  };
  const renderPhrase = (number) => {
    return number ? (
      <h2>
        <span class="badge bg-primary">
          {number} человек тусанет с тобой сегодня
        </span>
      </h2>
    ) : (
      <h2>
        <span class="badge bg-danger">Никто не тусанет с тобой сегодня</span>
      </h2>
    );
  };

  return (
    <div>
      {renderPhrase(users.length)}
      <Table users={users} remove={handleDelete} />
    </div>
  );
};
export default UsersList;
