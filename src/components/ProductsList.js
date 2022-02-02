import React from 'react';
import Header from './Header';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchProducts } from '../actions/actions.js'
import Filter from './Filter';
import Card from './Card.js'
import Search from './Search.js'
import NotFound from './NotFound.js'

class ProductsList extends React.Component {
	componentDidMount(){
		this.props.fetchProducts()
	}
	renderProductsList(){
		if (!this.props.products){
			return null
		}
		else if (this.props.products.length === 0){
			return <div><NotFound /></div>
		}
		return this.props.products.map(product => {
				return <div><Card product={product}/></div>
			})
	}
	render(){
		console.log(this.props.products)
		return <div>
					<Header />
					<Filter />
					<Search />
					<div className="products">{this.renderProductsList()}</div>

				</div>
	}
}
const mapStateToProps = (state) => {
	return {
		products: state.products.products
	}
}
export default connect(mapStateToProps, {fetchProducts: fetchProducts})(withRouter(ProductsList))