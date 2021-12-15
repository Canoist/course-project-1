import React, { useState, useEffect } from "react";
import api from "../api";
import Users from "./users";

const App = () => {
  const [users, setUsers] = useState();

  useEffect(() => {
    api.users.fetchAll().then((data) => setUsers(data));
  }, []);

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
      {users && (
        <Users
          users={users}
          onDelete={handleDelete}
          toggleBookmark={handleToggleBookmark}
        />
      )}
    </div>
  );
};
export default App;
