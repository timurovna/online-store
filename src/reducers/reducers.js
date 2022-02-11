import { combineReducers } from 'redux';

const initialState = {
	isAuthenticated: localStorage.getItem('token') ? true : false,
	user: {data: {
			userName: null
		}
	}
}
const loadingReducer = (state = false, action) =>{
	switch(action.type){
		case 'LOADING':
			return true
		case 'LOADING_SUCCESS':
			return false
		default:
			return state
	}
}
const authReducer = (state=initialState, action) =>{
	switch(action.type){
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
			return action.payload
		case 'SEARCH_ITEM':
			return action.payload
		case 'FILTER_LIST':
			return action.payload
		default:
			return state
	}
}
const productReducer = (state={}, action) =>{
	switch (action.type){
		case 'GET_PRODUCT_DETAILS':
			return action.payload
		default:
			return state
	}
}
const messageReducer = (state="", action) =>{
	switch (action.type) {
		case 'DELETE':
			return action.payload
		case 'ADD':
			return action.payload
		case 'UPDATE': 
			return action.payload
		case 'BUY':
			return action.payload
		default:
			return state
	}
}
export default combineReducers({
	auth: authReducer,
	products: productsReducer,
	product: productReducer,
	message: messageReducer,
	isLoading: loadingReducer
})

