import React from "react";
import TableRow from "./tableRow";

const Table = ({ users, remove }) => {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th scope="col">Имя</th>
          <th scope="col">Качества</th>
          <th scope="col">Профессия</th>
          <th scope="col">Встретился раз</th>
          <th scope="col">Оценка</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        {users.map(
          (user, index) =>
          <TableRow user={user} index={index} key={user._id} remove={remove} />
        )}
      </tbody>
    </table>
  );
};
export default Table;
