import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.js';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers/reducers.js'

ReactDOM.render(
	<Provider store={createStore(reducers, applyMiddleware(thunk))}>
    	<App />
    </Provider>,
  document.getElementById('root')
);
