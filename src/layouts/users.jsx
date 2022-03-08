import React from "react";
import { Redirect, useParams } from "react-router-dom";
import UserEditPage from "../components/page/userEditPage/userEditPage";
import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/usersListPage";
import { useAuth } from "../hooks/useAuth";
const Users = () => {
  const params = useParams();
  const { userId, edit } = params;
  const { currentUser } = useAuth();

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
