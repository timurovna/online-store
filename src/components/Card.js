import React from 'react';
import full from '../full.png';
import empty from '../empty.png';
import { Link } from 'react-router-dom';
import { deleteProduct } from '../actions/actions.js';
import { connect } from 'react-redux';


export const getRating = (rating) => {
	const rounded = Math.round(rating)
	const array = [1, 2, 3, 4, 5]
	return array.map(item=>{
		return (item <= rounded ? <img src={full} /> : <img src={empty} />)
	})
}
class ProductCard extends React.Component{
	constructor(props) {
		super(props)
	}
	handleClick = () => {
		if (window.confirm('Are you sure you wish to delete this item?')){
			this.props.deleteProduct(this.props.product._id)
		}
	}

	render(){
		return <div className="product-card">
					<div className="card-img">
						<Link to={{ pathname: '/productdetails/:productId', query: {productId: this.props.product._id}, state: { id: this.props.product._id}}}>
							<img src={this.props.product.image}/>
						</Link>
					</div>
					<div className="rating">{getRating(this.props.product.rating)}</div>
					<h4>{this.props.product.title}</h4>
					<div className="text"><p>{this.props.product.description}</p></div>

					<div className="product-card-bottom">
						<h2>${this.props.product.price}</h2>
						<div>{localStorage.getItem("role")==="admin" ? <button onClick={this.handleClick}>Delete</button> : null} </div>
						<Link to={{ pathname: '/productdetails/:productId', query: {productId: this.props.product._id}, state: { id: this.props.product._id}}}>
							<button>Details</button>
						</Link>	
					</div>
				</div>
	}
}

const mapStateToProps = (state) => {
	return {
		products: state.products.products
	}
}
export default connect(mapStateToProps, {deleteProduct: deleteProduct})(ProductCard)

