import React from 'react';
import { connect } from 'react-redux';
import { fetchProducts } from '../actions/actions.js'


class NotFound extends React.Component {
	render (){
		return <div className="not-found">
				<h4>Sorry, nothing matches your search terms.</h4>
				<button className="ui button" onClick={()=>this.props.fetchProducts()}>Try again</button>
			</div>
	}
}

export default connect(null, { fetchProducts:fetchProducts })(NotFound)