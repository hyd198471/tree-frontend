import React, {Fragment} from 'react';
import Router, {Route} from "../Router";
import LoginForm from '../components/login/LoginForm';
import {connect} from "react-redux";
import {RootStore} from "../store/rootStore";
import {goTo} from "../store/router/routerActions";
import Background from "./Background";


interface Props {
    goTo: (route: Route) => any
    loggedIn: boolean
}

const App: React.FC<Props> = (props) => {
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
    {goTo}
)(App);
