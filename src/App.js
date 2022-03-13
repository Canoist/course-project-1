import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./layouts/login";
import Main from "./layouts/main";
import Users from "./layouts/users";
import NavBar from "./components/ui/navBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthProvider from "./hooks/useAuth";
import ProtectedRoute from "./components/common/protectedRoute";
import LogOut from "./layouts/logOut";
import AppLoader from "./components/ui/hoc/appLoader";

const App = () => {
  return (
    <div className="mx-4">
      <AppLoader>
        <AuthProvider>
          <NavBar />
          <Switch>
            <ProtectedRoute path="/users/:userId?/:edit?" component={Users} />
            <Route path="/login/:type?" component={Login} />
            <Route path="/logout" component={LogOut} />
            <Route path="/" exact component={Main} />
            <Redirect to="/" />
          </Switch>
        </AuthProvider>
        <ToastContainer />
      </AppLoader>
    </div>
  );
};
export default App;
