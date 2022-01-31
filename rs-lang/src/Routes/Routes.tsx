import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../Containers/Home/Home";
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
    </Switch>
  );
}
