import React, {Fragment} from 'react';
import './App.css';
import './components/Tree';
import Router, {Route} from "./Router";
import Background from "./Background";
import LoginForm from './components/login/LoginForm';
import {connect, useSelector} from "react-redux";
import {RootStore} from "./store/rootStore";
import {logoutAction, refreshAuthAction} from "./store/user/userActions";
import {goTo} from "./store/router/routerActions";

interface Props {
    refreshAuthAction: () => {}
    logoutAction: () => {}
    goto: (route: Route) => any
    loggedIn: boolean
}

const App: React.FC<Props> = (props) => {
    React.useEffect(() => {
        props.refreshAuthAction();
    });
    const loggedIn = props.loggedIn;

    return (
        <Fragment>
            {!loggedIn && <Background/>}
            {!loggedIn && <LoginForm/>}
            {loggedIn && <Router/>}
        </Fragment>
    );
};

export default connect(
    (store: RootStore) => ({loggedIn: store.user.loggedIn}),
    {refreshAuthAction, logoutAction, goTo}
)(App);
