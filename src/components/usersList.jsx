import React from "react";
import { useState } from "react/cjs/react.development";
import api from "../api";
import Table from "./table";

const UsersList = () => {
  const [users, setUsers] = useState(api.users.fetchAll());
  const removeUser = (user) => {
    setUsers(users.filter((p) => p._id !== user._id));
  };
  console.log(users);

  return (
    <div>
      <Table users={users} remove={removeUser} />
    </div>
  );
};
export default UsersList;
