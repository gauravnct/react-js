import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
  NavLink,
  useRouteMatch,
  Link
} from "react-router-dom";
import {checkUserLoggedIn} from './Utils.js';
import logo from "./logo.svg";
import "./App.css";
import HeaderWithLogin from "./HeaderWithLogin";
import HeaderWithoutLogin from "./HeaderWithoutLogin";
import Home from "./Home";
import List from "./List";
import Signup from "./Signup";
import Login from "./Login";
import Nomatchurl from "./Nomatchurl";

export default function App() {

    let HeaderNavigations;
    if (checkUserLoggedIn()) {
      HeaderNavigations = <HeaderWithLogin />;
    } else {
      HeaderNavigations = <HeaderWithoutLogin />;
    }    
    return (
      <Router>
        <div>
          {HeaderNavigations}
          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/list">
              <List/>
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route exact path="/">
              <Home name="Gaurav" />
            </Route>
            <Route component={Nomatchurl} />
          </Switch>
        </div>
      </Router>
    );

}
