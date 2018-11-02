import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App';
import { BrowserRouter, Route, Switch } from 'react-dom'
import { Provider } from 'react-redux'
import {applyMiddleware, createStore} from 'redux'
import thunk from 'redux-thunk';
import root_reducer from './reducers/root_reducer';
import { AUTHENTICATED } from "./actions/auth";


document.title = '🔥 StudyHour 🔥';  // YEEEEEEEEEET

const store = createStore(root_reducer, applyMiddleware(thunk));
const user = localStorage.getItem('user');

if(user) store.dispatch({type: AUTHENTICATED});

ReactDOM.render(<Provider store={store}>
                    <App/>
                </Provider>, document.getElementById('app'));

