import React from "react";

const TableRow = (props) => {
  return (
    <tr>
      <td>{props.user.name}</td>
      <td>
        {props.user.qualities.map((quality) => (
          <span
            className={"badge " + "bg-" + quality.color + " m-2"}
            key={quality._id}>
            {quality.name}
          </span>
        ))}
      </td>
      <td>{props.user.profession.name}</td>
      <td>{props.user.completedMeetings}</td>
      <td>{props.user.rate}</td>
      <td>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => props.remove(props.user)}>
          Delete
        </button>
      </td>
    </tr>
  );
};
export default TableRow;
