import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../Containers/Home/Home";
import Login from "../Containers/Login/Login";
import Signup from "../Containers/Signup/Signup";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/signup">
        <Signup />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
    </Switch>
  );
}
