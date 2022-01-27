//LOG IN ACTIONS
const receiveLogin = (user) => {
	return{
		type: 'LOGIN_SUCCESS',
		isAuthenticated: true,
		payload: user
	}
}
const loginError = (message) => {
	return{
		type: 'LOGIN_FAILURE',
		isAuthenticated: false,
		payload: message
	}
}
export const loginUser = (creds) =>{
	let config = {
		method: 'POST',
		headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: creds.email, password: creds.password})
	}
	return dispatch => {
		return fetch('http://aonlinestore.herokuapp.com/api/login', config)
			.then(response => response.json())
			.then(data => {
				if (data.code === 1){
					dispatch(loginError(data.message))
				}
				else {
					console.log(data)
					localStorage.setItem('token', data.token);
					localStorage.setItem('username', data.data.userName);
					localStorage.setItem('role', data.data.role);
					dispatch(receiveLogin(data))
				}	
			})
	}
}
//LOG OUT ACTIONS
export const logoutUser = () => {
	return dispatch => {
		console.log('bye')
		localStorage.removeItem('token')
		localStorage.removeItem('username')
		dispatch({
			type: "LOGOUT_SUCCESS",
			isAuthenticated: false})
	}
}

// FETCH PRODUCTS 

const getProducts = (data) => {
	return {
		type: "FETCH_PRODUCTS",
		payload: data
	}
}
export const fetchProducts = () => {
	return dispatch => {
		return fetch('http://aonlinestore.herokuapp.com/api/products')
			.then(response => response.json())
			.then(data => {
				console.log("prod")
				//console.log(data)
				dispatch(getProducts(data))
		})
	}
}
// GET ONE PRODUCT
export const getDetails = (id) =>{
	return dispatch => {
		return fetch(`http://aonlinestore.herokuapp.com/api/products/details?id=${id}`)
			.then(response => response.json())
			.then(data=>{
				dispatch({type: "GET_PRODUCT_DETAILS", payload: data})
			})
	}
}
export const searchItem = (text) => {
	let config = {
		method: 'POST',
		headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({config: { title: text}})
	}
	return dispatch =>{
		return fetch('http://aonlinestore.herokuapp.com/api/products/search', config)
			.then(response => response.json())
			.then(data=>{
				console.log(data)
				console.log("search")
				dispatch({type: "SEARCH_ITEM", payload: data})
			})
	}
}
export const filterList = (filters) => {
	let config = {
		method: 'POST',
		headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({formArr : filters})
	}
	return dispatch => {
		return fetch('http://aonlinestore.herokuapp.com/api/products/filter', config)
			.then(response => response.json())
			.then(data=>{
				console.log(data)
				console.log("filter")
				dispatch({type: "FILTER_LIST", payload: data})
			})
	}
}
export const deleteProduct = (product_id) => {
	let config = {
		method: 'POST',
		headers: {authtoken: localStorage.getItem('token'), 'Content-Type': 'application/json'},
        body: JSON.stringify({id : product_id})
     }
	return dispatch => {
		return fetch('http://aonlinestore.herokuapp.com/api/products/delete', config)
		.then(response => response.json())
		.then(data=> {
			if (data.code === 0){
				dispatch(fetchProducts())
			}
		})
			
	}
}

export const updateProduct = (editedProduct, product_id) => {
	let config = {
		method: 'PUT',
		headers: {authtoken: localStorage.getItem('token'), 'Accept': 'application/json', 'Content-Type': 'application/json'},
		body: JSON.stringify({formData: editedProduct})
	}
	return dispatch => {
		return fetch(`http://aonlinestore.herokuapp.com/api/products/update?id=${product_id}`, config)
		.then(response => response.json())
		.then(data=> {
			console.log(data)
		})	
	}
}

export const addProduct = (newProduct) => {
	let config = {
		method: 'POST',
		headers: {authtoken: localStorage.getItem('token'), 'Accept': 'application/json', 'Content-Type': 'application/json'},
		body: JSON.stringify({formData: newProduct})
	}
	return dispatch => {
		return fetch('http://aonlinestore.herokuapp.com/api/products/add', config)
		.then(response => response.json())
		.then(data=> {
			if (data.code === 0){
				dispatch(fetchProducts())
			}
		})	
	}
}









