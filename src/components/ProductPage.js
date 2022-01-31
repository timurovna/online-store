import React from 'react';
import Header from './Header';
import { connect } from 'react-redux';
import { getDetails } from '../actions/actions.js';
import { withRouter } from "react-router";
import full from '../full.png';
import empty from '../empty.png';
import { Link } from 'react-router-dom';


class ProductPage extends React.Component {
	componentDidMount(){
		this.props.getDetails(this.props.location.state.id)
	}
	getRating(rating){
		const rounded = Math.round(rating)
		const array = [1, 2, 3, 4, 5]
		return array.map(item=>{
			return item <= rounded ? <img src={full} /> : <img src={empty} />
		})
	}
	render(){
        if (this.props.product.product === undefined){
        	return null
        }
        else{
        	const rating = this.props.product.product.rating
        	return <div>
			 		<Header />
			 		<div className="details">
			 			<div className="left">
			 				<img className="product-image" src={this.props.product.product.image} />
			 				<div className="rating">{this.getRating(rating)}</div>
			 				<div className="left-bottom">
			 					<p>${this.props.product.product.price}</p>
			 					<p>{this.props.product.product.gender}</p>
			 					<p>{this.props.product.product.category}</p>
			 				</div>
			 			</div>

			 			<div className="right">
			 				<div>{localStorage.getItem("role")==="admin" ? <Link to={{ pathname: '/productdetails/edit', state: {id: this.props.product.product._id, type: "edit"}}}>
									<button>Edit</button>
								</Link>	: null}
							</div>
			 				<h3>{this.props.product.product.title}</h3>
			 				<p>{this.props.product.product.description}</p>
			 			</div>
			 		</div>
			 		<div className="buy-button"><button>BUY</button></div>
				</div>
        }
	}
}
const mapStateToProps = (state) =>{
	console.log(state)
	return {
		product: state.product
	}
}

export default connect(mapStateToProps, {getDetails: getDetails})(withRouter(ProductPage))