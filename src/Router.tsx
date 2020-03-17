import React, {FC} from "react";
import {makeStyles} from "@material-ui/core";
import {Route as ReactRoute, Router as ReactRouter} from 'react-router-dom';
import history from "./history";
import LoginForm from "./components/login/LoginForm";


export enum Route {
    LOGIN = '/login',
}
const useStyles = makeStyles(theme => ({
    router: {
        marginLeft: 250,
        padding: 2,
    }

}));
const Router: FC = () => {
    const classes = useStyles();
    return (
        <div id="Router" className={classes.router}>
            <ReactRouter history={history}>
                <ReactRoute path={Route.LOGIN} exact={true} component={LoginForm}/>
            </ReactRouter>
        </div>
    );
};

export default Router;