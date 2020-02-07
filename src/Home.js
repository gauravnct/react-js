import React from 'react';
import ReactDOM from 'react-dom';
import {Helmet} from "react-helmet";

class Home extends React.Component{
	render(){
		  return (
				<div>
					<Helmet>
						<meta charSet="utf-8" />
						<title>Home</title>
						<meta name="keywords" content="Home" />
						<meta name="description" content="Home" />
					</Helmet>
					<h1>Welcome to react js demo of {this.props.name}.</h1>
				</div>
		  );
	}
}

export default Home;
