import React from "react";
import useMockData from "../utils/mockData";

const Main = () => {
  const { error, initialize, progress, status } = useMockData();

  return (
    <div className="container mt-5">
      <h1>Main Page</h1>
      <h3>Initialisation data at FireBase</h3>
      <button
        className={"btn btn-primary " + (status === "Ready" && "disabled")}
        onClick={initialize}
      >
        Initializing
      </button>
      <ul>
        <li>Status: {status}</li>
        <li>Progress: {progress}</li>
        {error && <li>Error: {error}</li>}
      </ul>
    </div>
  );
};
export default Main;
