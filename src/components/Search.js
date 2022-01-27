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
				<div>{localStorage.getItem("role")==="admin" ? <Link to={{ pathname:'/add', state: {type: "add"}}}><button>Add product</button></Link> : null}</div>
				<div>
					<input placeholder="Search input" value={this.state.text} type="text" id="search-text" onChange={this.changeHandler} />
					<button onClick={this.clickHandler}>Search</button>
				</div>
			</div>
	}
}

export default connect(null, {searchItem: searchItem})(Search)