import { combineReducers } from 'redux';
import { requestLogin, receiveLogin, loginError, receiveLogout} from '../actions/actions.js';

const initialState = {
	isAuthenticated: localStorage.getItem('token') ? true : false,
	user: {data: {
			userName: null
		}
	}
}

const authReducer = (state=initialState, action) =>{
	switch(action.type){
		case 'LOGIN_REQUEST':
			return Object.assign({}, state, {
				isAuthenticated: false,
			})
		case 'LOGIN_SUCCESS':
			return Object.assign({}, state, {
				isAuthenticated: true,
				errorMessage: '',
				user: action.payload
			})
		case 'LOGIN_FAILURE':
			return Object.assign({}, state, {
				isAuthenticated: false,
				errorMessage: action.payload
			})
		case 'LOGOUT_SUCCESS':
			return Object.assign({}, state, {
				isAuthenticated: false
			})
		default: 
			return state
	}
}
const productsReducer = (state=[], action) =>{
	switch (action.type){
		case 'FETCH_PRODUCTS':
			return {
				products: action.payload
			}
		case 'SEARCH_ITEM':
			return {
				products: action.payload
			}
		case 'FILTER_LIST':
			return {
				products: action.payload
			}
		default:
			return state
	}
}
const productReducer = (state={}, action) =>{
	switch (action.type){
		case 'GET_PRODUCT_DETAILS':
			return {
				product: action.payload
			}
		default:
			return state
	}
}
const deleteReducer = (state="", action) =>{
	switch (action.type) {
		case 'DELETE':
			return {
				message: action.payload
			}
		default:
			return state
	}
}

export default combineReducers({
	auth: authReducer,
	products: productsReducer,
	product: productReducer
})

