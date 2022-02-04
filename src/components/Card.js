import React from 'react';
import full from '../full.png';
import empty from '../empty.png';
import { Link } from 'react-router-dom';
import { deleteProduct } from '../actions/actions.js';
import { connect } from 'react-redux';
import { Confirm, Card, Image, Item } from "semantic-ui-react";




const getRating = (rating) => {
	const rounded = Math.round(rating)
	const array = [1, 2, 3, 4, 5]
	return array.map(item=>{
		return (item <= rounded ? <img src={full} /> : <img src={empty} />)
	})
}
class ProductCard extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			showDialog: false
		}
	}
	toggleDialog = () => {
		if (this.state.showDialog===true) {
			this.setState({showDialog: false})
		}
		else{
			this.setState({showDialog: true})
		}
	}
	handleClick = () => {
		this.setState({showDialog: false})
		this.props.deleteProduct(this.props.product._id)
	}

	render(){
		return <div className="product-card">
				<Card>
					<div className="card-img">
						<Link to={{ pathname: '/productdetails', state: { id: this.props.product._id}}}>
							<Image src={this.props.product.image}/>
						</Link>
					</div>
					<div className="rating">{getRating(this.props.product.rating)}</div>
					<h4>{this.props.product.title}</h4>
					<div className="text"><p>{this.props.product.description}</p></div>

					<div className="product-card-bottom">
						<div><p>${this.props.product.price}</p></div>
						<div>
							{localStorage.getItem("role")==="admin" ? <button className="ui button tiny red" onClick={this.toggleDialog}>Delete</button> : null} 
							<div className="ui modal"><Confirm open={this.state.showDialog} onCancel={this.toggleDialog} onConfirm={this.handleClick} /></div>
						</div>
						<Link to={{ pathname: '/productdetails', state: { id: this.props.product._id}}}>
							<button className="ui button tiny">Details</button>
						</Link>	
					</div>
				</Card>
				</div>
	}
}

const mapStateToProps = (state) => {
	return {
		products: state.products.products
	}
}
export default connect(mapStateToProps, {deleteProduct: deleteProduct})(ProductCard)

