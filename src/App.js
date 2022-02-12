import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./layouts/login";
import Main from "./layouts/main";
import Users from "./layouts/users";
import NavBar from "./components/ui/navBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PropfessionProvider } from "./hooks/useProfession";
import { QualitiesProvider } from "./hooks/useQualities";
import AuthProvider from "./hooks/useAuth";

const App = () => {
  return (
    <div style={{ marginLeft: 40 + "px" }}>
      <AuthProvider>
        <NavBar />
        <Switch>
          <PropfessionProvider>
            <QualitiesProvider>
              <Route path="/users/:userId?/:edit?" component={Users} />
              <Route path="/login/:type?" component={Login} />
              <Route path="/" exact component={Main} />
              <Redirect to="/" />
            </QualitiesProvider>
          </PropfessionProvider>
        </Switch>
      </AuthProvider>
      <ToastContainer />
    </div>
  );
};
export default App;
