import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "../layouts/login";
import Main from "../layouts/main";
import Users from "../layouts/users";
import NavBar from "../components/ui/navBar";
import UserPage from "./page/userPage/index";

const App = () => {
  return (
    <div style={{ marginLeft: 40 + "px" }}>
      <NavBar />
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/login" component={Login} />
        <Route path="/users" exact component={Users} />
        <Route path="/users/:id?" component={UserPage} />
        <Redirect to="/" />
      </Switch>
    </div>
  );
};
export default App;
