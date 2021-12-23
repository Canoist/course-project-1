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
      {/* <Router> */}
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/">
          <Main />
        </Route>
      </Switch>
      {/* </Router> */}
    </div>
  );
};
export default App;
