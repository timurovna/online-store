import React from 'react';
import { filterList, fetchProducts } from '../actions/actions.js';
import { connect } from 'react-redux';
import { validate } from './Validation.js';
import { Icon } from 'semantic-ui-react'

class Filter extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			filters: {gender: "Unisex"},
			available: false,
			gender: "Unisex",
			category: "",
			rating: "",
			priceFrom: "",
			priceTo: "",
			showFilter: false,
			ratingError: "",
			priceError: ""
		}
	}
	availableHandler = (e) => {
		console.log(e.target.checked)
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
						available: ""
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
	blurHandler = (e) => {
		let error = validate(e.target.name, e.target.value, true)
		if (e.target.name === "priceFrom" || e.target.name === "priceTo") {
			this.setState({priceError: error})
		}
		else{
			this.setState({[e.target.name + "Error"]: error})
		}
	}
	applyClickHandler = () => {
		let filters = {}
		for (let key in this.state.filters) {
			if (this.state.filters[key] !== "" && this.state.filters[key]!=="None"){
				filters[key] = this.state.filters[key]
			}
		console.log(filters)
		}
		this.props.filterList(filters)
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
				<div className="expand" onClick={this.showFilters}><button className="ui button"><i className="filter icon"></i>  Expand filters</button></div>
				<div className={this.state.showFilter ? "filterExpand" : "hide"}>

					<div>
						<p>Available only</p>
						<input type="checkbox" onChange={this.availableHandler} checked={this.state.available}/>
					</div>


					<div className="gender">
						<p>Gender</p>
						<select id="gender" name="gender" onChange={this.inputChangeHandler} value={this.state.gender}>
							<option value="None">None</option>
							<option value="Unisex">Unisex</option>
 							<option value="Female">Female</option>
  							<option value="Male">Male</option>
						</select>
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
						<input type="number" min="1" max="5" 
								value={this.state.rating} name="rating" 
								onChange={this.inputChangeHandler}
								onBlur = {this.blurHandler}
						/>
						<p className="error">{this.state.ratingError}</p>
					</div>


					<div>
						<div>
							<p>Price</p>
							<input type="text" 
								placeholder="from" 
								value={this.state.priceFrom} 
								name="priceFrom" 
								onChange={this.inputChangeHandler}
								onBlur = {this.blurHandler}
							/>
							<input type="text" 
								placeholder="to" 
								value={this.state.priceTo} 
								name="priceTo" 
								onChange={this.inputChangeHandler}
								onBlur = {this.blurHandler}
							/>
						</div>
						<p className="error">{this.state.priceError}</p>
					</div>


					<div className="filter-btn">
						<button className="ui button orange" disabled={this.state.rating>5 || this.rating<1 || isNaN(this.state.priceTo) || isNaN(this.state.priceFrom) ? true: false} 
							onClick={this.applyClickHandler}
						>Apply</button>
						<button className="ui button orange" onClick={this.clearClickHandler}>Clear</button>
					</div>
				</div>
			</div>
	}
}

export default connect(null, {filterList:filterList, fetchProducts:fetchProducts})(Filter)




