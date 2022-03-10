import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import UserEditPage from "../components/page/userEditPage/userEditPage";
import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/usersListPage";
import { useAuth } from "../hooks/useAuth";
import { getDataStatus, loadUsersList } from "../store/users";
const Users = () => {
  const params = useParams();
  const { userId, edit } = params;
  const { currentUser } = useAuth();
  const dataStatus = useSelector(getDataStatus());
  const dispatch = useDispatch();
  useEffect(() => {
    if (!dataStatus) dispatch(loadUsersList());
  }, []);

  if (dataStatus) return "Loading...";

  return (
    <>
      {userId ? (
        edit ? (
          userId === currentUser._id ? (
            <UserEditPage />
          ) : (
            <Redirect to={`/users/${currentUser._id}/edit`} />
          )
        ) : (
          <UserPage userId={userId} />
        )
      ) : (
        <UsersListPage />
      )}
    </>
  );
};

export default Users;
