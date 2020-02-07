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

class HeaderWithLogin extends React.Component{

  handleLogoutClick() {
    localStorage.setItem('auth_token', '');
  }

	render(){
		return (
            <div className="topnav">
                <NavLink to="/" activeClassName="">
                Home
                </NavLink>
                <NavLink to="/list" activeClassName="active">
                List
                </NavLink>
                <a href="/" onClick={this.handleLogoutClick}>Logout</a>
            </div>
		);
	}

}

export default HeaderWithLogin;
