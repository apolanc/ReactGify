import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { returnRoute } from "./utils";
import routes from "./routes";

import "./App.css";

const App = () => (
  <Router>
    <Switch>{routes.map((route, key) => returnRoute(route, key))}</Switch>
  </Router>
);

export default App;
