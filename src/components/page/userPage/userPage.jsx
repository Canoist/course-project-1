/* eslint-disable multiline-ternary */
import React, { useEffect, useState } from "react";
import Qualities from "../../ui/qualities";
import { useHistory, useParams } from "react-router-dom";
import API from "../../../api";

const UserPage = () => {
  const params = useParams();
  const [user, setUser] = useState("");
  useEffect(() => {
    API.users.getById(params.id).then((data) => setUser(data));
  }, []);
  const history = useHistory();
  const handleBackToAllUsers = () => {
    history.push("/users");
  };
  return user ? (
    <div>
      <h1>{user.name}</h1>
      <h2>Профессия: {user.profession.name}</h2>
      <Qualities qualities={user.qualities} />
      <h4>Встретился раз: {user.completedMeetings}</h4>
      <h2>Rate: {user.rate}/5</h2>
      <button className="btn btn-secondary" onClick={handleBackToAllUsers}>
        Все пользователи
      </button>
    </div>
  ) : (
    <h1>Loading...</h1>
  );
};

export default UserPage;
