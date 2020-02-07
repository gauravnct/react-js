import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Switch,
    Redirect,
    Route,
    NavLink,
    useRouteMatch,
    Link
  } from "react-router-dom";

class HeaderWithoutLogin extends React.Component{
	render(){
		return (
            <div className="topnav">
                <NavLink to="/" activeClassName="">
                    Home
                </NavLink>
                <NavLink to="/signup" activeClassName="active">
                    Sign Up
                </NavLink>
                <NavLink to="/login" activeClassName="active">
                    Login
                </NavLink>
            </div>
		);
	}

}

export default HeaderWithoutLogin;
