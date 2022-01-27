import React from 'react';
import { filterList, fetchProducts } from '../actions/actions.js';
import { connect } from 'react-redux';

class Filter extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			filters: {},
			available: false,
			gender: "Unisex",
			category: "",
			rating: "",
			priceFrom: "",
			priceTo: "",
			showFilter: false,
			error: ""
		}
	}
	availableHandler = (e) => {
		if (e.target.checked===true){
			this.setState({
				available: e.target.checked, 
				filters: {...this.state.filters,
						available: "Yes"
				}
			})
		}
		else{
			this.setState({
				available: e.target.checked, 
				filters: {...this.state.filters,
						available: "No"
				}
			})
		}
	}
	inputChangeHandler = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
			filters: {...this.state.filters,
						[e.target.name]: e.target.value
					}
		})
	}
	genderHandler = (e) => {
		this.setState({
				gender: e.target.value, 
				filters: {...this.state.filters,
						gender: e.target.value
				}
			})
	}
	applyClickHandler = () => {
		console.log(this.state.filters)
		this.props.filterList(this.state.filters)
	}
	clearClickHandler = () => {
		this.props.fetchProducts()
		this.setState({
			filters: {},
			available: false,
			gender: "Unisex",
			category: "",
			rating: "",
			priceFrom: "",
			priceTo: ""
		})
	}
	showFilters = () => {
		this.setState({showFilter: this.state.showFilter ? false : true})
	}
	
	render(){
		return 	<div>
				<div className="expand" onClick={this.showFilters}><p>Expand filters</p></div>
				<div className={this.state.showFilter ? "filter" : "hide"}>

					<div>
						<p>Available only</p>
						<input type="checkbox" onChange={this.availableHandler} checked={this.state.available}/>
					</div>


					<div className="gender">
						<p>Gender</p>
						<div name="gender" onChange={this.genderHandler} >
							<input type="radio" name="gender1" value="Male"/><label for="male">Male</label>
							<input type="radio" name="gender1" value="Female"/><label for="female">Female</label>
							<input type="radio" name="gender1" value="Unisex" /><label for="unisex">Unisex</label>
						</div>
					</div>


					<div>
						<p>Category</p>
						<select id="category" name="category" onChange={this.inputChangeHandler} value={this.state.category}>
							<option value="None">None</option>
  							<option value="Expensive">Expensive</option>
 							<option value="Cheap">Cheap</option>
  							<option value="Super cheap">Super cheap</option>
						</select>
					</div>


					<div>
						<p>Rating</p>
						<input type="number" min="1" max="5" value={this.state.rating} name="rating" onChange={this.inputChangeHandler}/>
						<p>{this.state.error}</p>
					</div>


					<div>
						<p>Price</p>
						<input type="text" placeholder="from" value={this.state.priceFrom} name="priceFrom" onChange={this.inputChangeHandler}/>
						<input type="text" placeholder="to" value={this.state.priceTo} name="priceTo" onChange={this.inputChangeHandler}/>
					</div>


					<div className="filter-btn">
						<button onClick={this.applyClickHandler}>Apply</button>
					</div>


					<div className="filter-btn">
						<button onClick={this.clearClickHandler}>Clear</button>
					</div>
				</div>
			</div>
	}
	
}

export default connect(null, {filterList:filterList, fetchProducts:fetchProducts})(Filter)




