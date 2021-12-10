import React, { useCallback, useEffect } from "react";
import { useState } from "react/cjs/react.development";
import api from "../api";
import Table from "./table";

const App = () => {
  const [users, setUsers] = useState(api.users.fetchAll());
  const people = useCallback(
    (number) => {
      number = String(number);
      if (
        (+number[number.length - 1] >= 2 &&
          +number[number.length - 1] <= 4 &&
          +number < 10) ||
        +number > 20
      ) {
        return "человека";
      } else {
        return "человек";
      }
    },
    [users]
  );
  const handleDelete = (user) => {
    setUsers(users.filter((p) => p._id !== user._id));
  };
  const renderPhrase = (number) => {
    return number ? (
      <h2>
        <span className="badge bg-primary">
          {number} {people(number)} тусанет с тобой сегодня
        </span>
      </h2>
    ) : (
      <h2>
        <span className="badge bg-danger">
          Никто не тусанет с тобой сегодня
        </span>
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
export default App;
