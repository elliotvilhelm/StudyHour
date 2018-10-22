import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App';
import { BrowserRouter, Route, Switch } from 'react-dom'
import { Provider } from 'react-redux'
import {applyMiddleware, createStore} from 'redux'
import reduxThunk from 'redux-thunk';
import root_reducer from './reducers/root_reducer';

// const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStore(root_reducer)
ReactDOM.render(<Provider store={store}>
                    <App/>
                </Provider>, document.getElementById('app'));

