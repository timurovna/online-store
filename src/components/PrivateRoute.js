import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import ProductsList from './ProductsList.js';


class PrivateRoute extends React.Component {
	render(){
		return <Route render = { () => (
				this.props.isAuthenticated ? <div>{this.props.component}</div> : <Redirect to="/" /> )
			} /> 
	}
}

const mapStateToProps = (state) => {
	//console.log(state)
	return {
		isAuthenticated: state.auth.isAuthenticated
	}
}

export default connect(mapStateToProps)(PrivateRoute)