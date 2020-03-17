import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from "react-redux";
import store from './store/rootStore';
import {LOGIN} from "./store/user/userActions";

ReactDOM.render(
    <Provider store={store}>
        <App goto={() => {}}/>
    </Provider>,
    document.getElementById('root')
);