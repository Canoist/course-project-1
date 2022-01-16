import React, { useEffect, useState } from "react";
import Qualities from "../../ui/qualities";
import { useHistory, useParams } from "react-router-dom";
import API from "../../../api";
import PropTypes from "prop-types";
import UserEditPage from "../userEditPage/userEditPage";

const UserPage = ({ userId }) => {
  const params = useParams();
  const { edit } = params;
  const [user, setUser] = useState("");
  const [professions, setProfessions] = useState();
  const [qualities, setQualities] = useState({});

  useEffect(() => {
    API.users.getById(userId).then((data) => setUser(data));
    API.professions.fetchAll().then((data) => {
      setProfessions(data);
    });
    API.qualities.fetchAll().then((data) => {
      setQualities(data);
    });
  }, []);
  const history = useHistory();
  const handleGoToEditUser = () => {
    history.push(`/users/${userId}/edit`);
  };

  return user ? (
    edit ? (
      <UserEditPage
        user={user}
        professions={professions}
        qualities={qualities}
      />
    ) : (
      <div>
        <h1>{user.name}</h1>
        <h2>Профессия: {user.profession.name}</h2>
        <Qualities qualities={user.qualities} />
        <h4>Встретился раз: {user.completedMeetings}</h4>
        <h2>Rate: {user.rate}/5</h2>
        <button className="btn btn-secondary" onClick={handleGoToEditUser}>
          Редактировать
        </button>
      </div>
    )
  ) : (
    <h1>Loading...</h1>
  );
};
UserPage.propTypes = {
  userId: PropTypes.string.isRequired
};

export default UserPage;
