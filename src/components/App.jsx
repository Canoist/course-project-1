import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./layouts/login";
import Main from "./layouts/main";
import Users from "./layouts/users";
import NavBar from "./navBar";

const App = () => {
  return (
    <div>
      <NavBar />
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/users" component={Users} />
        <Route path="/" component={Main} />
      </Switch>
    </div>
  );
};
export default App;
