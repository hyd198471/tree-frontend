import React, {FC} from "react";
import {makeStyles} from "@material-ui/core";
import {Route as ReactRoute, Router as ReactRouter} from 'react-router-dom';
import history from "./history";
import SearchUser from "./components/search-user/SearchUser";


export enum Route {
    LOGIN = '/login',
    SEARCH_USER = '/search_user',
}
const useStyles = makeStyles(theme => ({
    router: {
        marginLeft: '250px',
        padding: '2em',
    }

}));
const Router: FC = () => {
    const classes = useStyles();
    return (
        <div id="Router" className={classes.router}>
            <ReactRouter history={history}>
                <ReactRoute path={Route.LOGIN} exact={true} component={SearchUser}/>
                <ReactRoute path={Route.SEARCH_USER} exact={true} component={SearchUser}/>
            </ReactRouter>
        </div>
    );
};

export default Router;