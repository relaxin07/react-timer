import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app';
import {Provider} from 'react-redux';
import {BrowserRouter as Router } from 'react-router-dom';
import store from './store';



ReactDOM.render(
    <Provider store={store}>
        <Router basename={'timer-task'}>
            <App/>
        </Router>
    </Provider>,
document.getElementById('root'))
