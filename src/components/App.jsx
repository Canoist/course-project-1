import React, { useState } from "react";
import api from "../api";
import SearchStatus from "./searchStatus";
import Users from "./users";

const App = () => {
  const [users, setUsers] = useState(api.users.fetchAll());
  const handleDelete = (user) => {
    setUsers(users.filter((p) => p._id !== user._id));
  };
  const handleToggleBookmark = (status, id) => {
    const userId = users.findIndex((c) => c._id === id);
    users[userId].bookmark = !status;
    setUsers([...users]);
  };
  return (
    <div>
      <SearchStatus users={users} />
      <Users
        users={users}
        onDelete={handleDelete}
        toggleBookmark={handleToggleBookmark}
      />
    </div>
  );
};
export default App;
