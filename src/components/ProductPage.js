import React from 'react';
import Header from './Header';
import { connect } from 'react-redux';
import { getDetails, buyProduct } from '../actions/actions.js';
import { withRouter } from "react-router";
import full from '../full.png';
import empty from '../empty.png';
import { Link } from 'react-router-dom';
import { Modal, Button} from 'semantic-ui-react';


class ProductPage extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			modal: false
		}
	}
	componentDidMount(){
		this.props.getDetails(this.props.location.state.id)
	}
	getRating(rating){
		const rounded = Math.round(rating)
		const array = [1, 2, 3, 4, 5]
		return array.map((item, index)=>{
			return item <= rounded ? <img key={index} src={full} /> : <img key={index} src={empty} />
		})
	}
	clickHandler = () =>{
		this.props.buyProduct(this.props.product.product._id).then(()=>{
			if (this.props.message === 0){
				this.setState({modal: true})
			}
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
									<button className="ui button tiny">Edit</button>
								</Link>	: null}
							</div>
			 				<h3>{this.props.product.product.title}</h3>
			 				<p>{this.props.product.product.description}</p>
			 			</div>
			 		</div>
			 		<div>
			 			<Modal open={this.state.modal} 
			 					onClose={() => this.setState({modal : false})} 
			 					onOpen={() => this.setState({modal : true})} >
			 				<Modal.Content>
        						<Modal.Description>
          							You purchase is placed.
        						</Modal.Description>
      						</Modal.Content>
      						<Modal.Actions>
        						<button className="ui button" onClick={()=>this.props.history.goBack()}>Go back</button>
      						</Modal.Actions>
			 			</Modal>
			 		</div>
			 		<div className="buy-button" onClick={this.clickHandler}><button className="ui button blue">BUY</button></div>
				</div>
        }
	}
}
const mapStateToProps = (state) =>{
	console.log(state)
	return {
		product: state.product,
		message: state.message
	}
}

export default connect(mapStateToProps, {getDetails: getDetails, buyProduct: buyProduct})(withRouter(ProductPage))


