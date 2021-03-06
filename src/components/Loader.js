import React from 'react';
import  { connect } from 'react-redux';

class LoaderText extends React.Component {
	render(){
		if (this.props.isLoading===undefined){
			return null
		}
		if (this.props.isLoading === true) {
			return <div className="ui active transition visible inverted dimmer">
						<div className="content">
							<div className="ui inverted text loader centered">Loading</div>
						</div>
					</div>
		}
		else{
			return null
		}
	}
}
const mapStateToProps = (state) =>{
	return {isLoading : state.isLoading}
}
export default connect(mapStateToProps)(LoaderText)