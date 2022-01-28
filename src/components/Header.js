import React from "react";
import logo from '../Logo.jpeg';
import "../index.css";
import { logoutUser } from '../actions/actions.js';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";


class Header extends React.Component {
	render(){
		return <div className="header">
					<div className="header-logo" onClick={()=> this.props.history.push('/products')}><img src={logo}/></div>
					<div className="header-right">
						<p>Hello, {localStorage.getItem("username")}</p> 
						<button onClick={()=>this.props.logoutUser()}>Log out</button>
					</div>
				</div>
	}
}

export default connect(null, {logoutUser: logoutUser})(withRouter(Header))