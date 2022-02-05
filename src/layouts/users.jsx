import React from "react";
import { useParams } from "react-router-dom";
import UserEditPage from "../components/page/userEditPage/userEditPage";
import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/usersListPage";
import UserProvider from "../hooks/useUsers";
const Users = () => {
  const params = useParams();
  const { userId } = params;
  const { edit } = params;

  return (
    <>
      <UserProvider>
        {userId ? (
          edit ? (
            <UserEditPage userId={userId} />
          ) : (
            <UserPage userId={userId} />
          )
        ) : (
          <UsersListPage />
        )}
      </UserProvider>
    </>
  );
};

export default Users;
