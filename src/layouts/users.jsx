import React from "react";
import { useParams } from "react-router-dom";
import UserEditPage from "../components/page/userEditPage/userEditPage";
import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/usersListPage";
const Users = () => {
  const params = useParams();
  const { userId } = params;
  const { edit } = params;
  return (
    <>
      {userId ? (
        edit ? (
          <UserEditPage userId={userId} />
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
