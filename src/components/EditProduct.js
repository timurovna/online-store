import React from 'react';
import { withRouter } from "react-router";
import Header from './Header';
import { connect } from 'react-redux';
import { Modal, Button } from 'semantic-ui-react'
import { getDetails, updateProduct, addProduct, fetchProducts} from '../actions/actions.js';
import { validate } from "./Validation.js";


class EditProduct extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			title: "",
			description: "",
			image: "",
			rating: "",
			price: "",
			gender: "",
			category: "",
			itemsSold: "0",
			available: "",
			modal: false,
			requiredError: "",
			imageError: "",
			ratingError: "",
			priceError: "",
			titleError: "",
			descriptionError: "",
			availableError: "",
			disabled: true,
		}
	}
	componentDidMount(){
		if (this.props.location.state.type === "edit"){
			const product = this.props.product.product
			this.props.getDetails(this.props.location.state.id).then(() => {
				this.setState ({
					title: product.title,
					description: product.description,
					image: product.image,
					price: product.price,
					rating: product.rating,
					gender: product.gender,
					category: product.category,
					itemsSold: product.itemsSold,
					available: product.available,
					disabled: false,
				})
			})
		}
	}
	blurHandler = (e) => {	
		let error = validate(e.target.name, e.target.value, false)
		if (e.target.name==="category" || e.target.name==="gender"){
			this.setState({requiredError: error})
		}
		else{
			this.setState({[e.target.name + "Error"]: error})
		}

		if (this.state.title!=="" && this.state.image!=="" && this.state.description!=="" && this.state.category!=="none" &&
		(this.state.available!=="" && !isNaN(this.state.available)) && this.state.gender!=="none" && (this.state.rating!=="" && this.state.rating>0 && this.state.rating<6) && (this.state.price!=="" && !isNaN(this.state.price))
		&& this.state.titleError===""){
			this.setState({disabled: false})
		}
		else{
			this.setState({disabled: true})
		}
	}
	inputChangeHandler = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}
	clickHandler = () => {
		let editedProduct = {title: this.state.title, 
							image: this.state.image,
							description: this.state.description,
							category: this.state.category,
							available: this.state.available,
							gender: this.state.gender,
							rating: parseInt(this.state.rating),
							price: this.state.price,
							itemsSold: this.state.itemsSold
						}
		if (this.props.location.state.type === "edit"){
			this.props.updateProduct(editedProduct, this.props.product.product._id).then(()=>{
				if (this.props.message === 0){
					this.props.history.goBack()
				}
			})
		}
		else{
			this.props.addProduct(editedProduct).then(()=>{
				if (this.props.message === 0){
					this.setState({modal : true})
				}
			})
		}
	}
	render(){
        	return <div>
			 		<Header />
			 		<div className="details">
			 			<div className="left">
			 				<div>
			 					<p>Image url</p>
			 					<textarea name="image" value={this.state.image} onChange={this.inputChangeHandler} onBlur={this.blurHandler}/>
			 					<p className="error">{this.state.imageError}</p>
			 				</div>
			 				<div className="rating">
			 					<p>Rating</p>
			 					<input type="number" value={this.state.rating} name="rating" onChange={this.inputChangeHandler} onBlur={this.blurHandler}/>
			 					<p className="error">{this.state.ratingError}</p>
			 				</div>
			 				<div>
			 					<p>Price</p>
			 					<input type="text" value={this.state.price} name="price" onChange={this.inputChangeHandler} onBlur={this.blurHandler}/>
			 					<p className="error">{this.state.priceError}</p>
			 				</div>
			 				<div>
			 					<p>Items sold: {this.state.itemsSold}</p>
			 				</div>
			 				<div className="left-bottom">
			 					<div className="left-bottom-input">
			 						<p>Available</p>
			 						<input type="text" 
			 							value={this.state.available} 
			 							name="available" 
			 							onChange={this.inputChangeHandler} 
			 							onBlur={this.blurHandler} 
			 						/>
			 					</div>
			 					<div className="left-bottom-input">
			 						<div>
										<p>Gender</p>
										<select id="category" value={this.state.gender} name="gender" onChange={this.inputChangeHandler} onBlur={this.blurHandler}>
											<option value="none">None</option>
											<option value="Unisex">Unisex</option>
  											<option value="Female">Female</option>
 											<option value="Male">Male</option>
										</select>
									</div>
			 					</div>
			 					<div className="left-bottom-input">
			 						<div>
										<p>Category</p>
										<select id="category" value={this.state.category} name="category" onChange={this.inputChangeHandler} onBlur={this.blurHandler}>
  											<option value="none">None</option>
  											<option value="Expensive">Expensive</option>
 											<option value="Cheap">Cheap</option>
  											<option value="Super cheap">Super cheap</option>
										</select>
									</div>
			 					</div>
			 				</div>
			 				<p className="error">{this.state.availableError}</p>
			 				<p className="error">{this.state.requiredError}</p>
			 			</div>
			 			<div className="right">
			 				<div>
			 					<p>Title</p><input type="text" value={this.state.title} name="title" onChange={this.inputChangeHandler} onBlur={this.blurHandler}/>
			 					<p className="error">{this.state.titleError}</p>
			 				</div>
			 				<div>
			 					<p>Description</p><textarea value={this.state.description} name="description" onChange={this.inputChangeHandler} onBlur={this.blurHandler}/>
			 					<p className="error">{this.state.descriptionError}</p>
			 				</div>
			 			</div>
			 		</div>
			 		<div>
			 			<Modal open={this.state.modal} 
			 					onClose={() => this.setState({modal : false})} 
			 					onOpen={() => this.setState({modal : true})} >
			 				<Modal.Content>
        						<Modal.Description>
          							Your product successfully added!
        						</Modal.Description>
      						</Modal.Content>
      						<Modal.Actions>
        						<button className="ui button" onClick={()=>this.props.history.goBack()}>OK</button>
      						</Modal.Actions>
			 			</Modal>
			 		</div>
			 		<div className="buy-button">
			 			<button className="ui button green" disabled={this.state.disabled} onClick={this.clickHandler}>Save</button>
			 			<button className="ui button" onClick={this.props.history.goBack}>Cancel</button>
			 		</div>
				</div>
        }
	
}
const mapStateToProps = (state) =>{
	console.log(state)
	return {
		product: state.product,
		message: state.message
	}
}

export default connect(mapStateToProps, {getDetails: getDetails, updateProduct: updateProduct, addProduct: addProduct})(withRouter(EditProduct))




