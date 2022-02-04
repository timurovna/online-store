import React from 'react';
import { connect } from 'react-redux';
import { searchItem } from '../actions/actions.js';
import { Link } from 'react-router-dom';

class Search extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			text: ""
		}
	}
	changeHandler = (e) =>{
		this.setState({text: e.target.value})
	}
	clickHandler = (e) =>{
		e.preventDefault();
		this.props.searchItem(this.state.text)
		this.setState({text: ""})
	}
	render (){
		return <div className="search">
				<div>{localStorage.getItem("role")==="admin" ? <Link to={{ pathname:'/add', state: {type: "add"}}}><button className="ui button"><i className="icon add"></i>Add product</button></Link> : null}</div>
				<div className="ui action input">
					<input placeholder="Search input" value={this.state.text} type="text" id="search-text" onChange={this.changeHandler} />
					<button className="ui button" onClick={this.clickHandler}><i className="icon search"></i>Search</button>
				</div>
			</div>
	}
}

export default connect(null, {searchItem: searchItem})(Search)