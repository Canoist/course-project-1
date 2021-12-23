import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./layouts/login";
import Main from "./layouts/main";
import Users from "./layouts/users";
import NavBar from "./navBar";
import UserPage from "./tableComponents/userPage";

const App = () => {
  return (
    <div style={{ marginLeft: 40 + "px" }}>
      <NavBar />
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/login" component={Login} />
        <Route path="/users" exact component={Users} />
        <Route path="/users/:id?" component={UserPage} />
      </Switch>
    </div>
  );
};
export default App;
