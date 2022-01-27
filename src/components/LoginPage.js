import React from 'react';
import "../index.css";
import logo from '../Logo.jpeg';
import {loginUser} from '../actions/actions.js';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";

class Login extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			email: "",
			password: "",
			errorEmail: "",
			errorPassword: "",
		}
	}
	changeHandler = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}
	clickHandler = (e) => {
		e.preventDefault();
		//console.log(creds)
		this.props.loginUser({email: this.state.email, password: this.state.password}).then(() => {
			this.props.history.push('/products')
		})
	}
	validateEmail(value){
   		if (!value) {
     		this.setState({errorEmail: 'Required'})
   		} 
   		else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
     		this.setState({errorEmail: 'Invalid email address'});
   		}
   		else{
   			this.setState({errorEmail: ''})
   		}
	}
	validatePassword(value){
   		if (!value) {
     		this.setState({errorPassword: 'Required'})
   		}
   		else{
   			this.setState({errorPassword: ''})
   		}
   	}
	render(){
		return (<div className="login">
					<div className="logo">
						<img src={logo}/>
					</div>
					<div className="wrong"><p>{this.props.errorMsg}</p></div>
					<form>
						<label for="login">Login</label>
						<input type="text" 
								id="email"
								name="email"
								placeholder="Enter login here" 
								value = {this.state.email}
								onChange = {this.changeHandler}
								onBlur = {()=>this.validateEmail(this.state.email)}
						/>
						<div className="error">{this.state.errorEmail}</div>

						<label for="password" className="password">Password</label>
    					<input type="password" 
    							id="password"
    							value={this.state.password}
    							placeholder="Enter Password" 
    							name="password" 
    							onChange = {this.changeHandler}
    							onBlur = {()=>this.validatePassword(this.state.password)}
    					/>
    					<div className="error">{this.state.errorPassword}</div>
    					<button type="submit" disabled={this.state.errorEmail || this.state.errorPassword} onClick={this.clickHandler}>Login</button>
					</form>
				</div>)
	}

}

const mapStateToProps = (state) => {
	return {
		errorMsg: state.auth.errorMessage,
		isAuth: state.auth.isAuthenticated
	}
}
export default connect(mapStateToProps, {loginUser:loginUser})(withRouter(Login))


