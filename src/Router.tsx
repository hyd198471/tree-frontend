import React, {FC} from "react";
import {Route as ReactRoute, Router as ReactRouter} from 'react-router-dom';
import history from "./app/history";
import SearchUser from "./components/search-user/SearchUser";
import styles from "./Router.module.css"
export enum Route {
    LOGIN = '/login',
    SEARCH_USER = '/search_user',
}
const Router: FC = () => {
    return (
        <div id="Router" className={styles.router}>
            <ReactRouter history={history}>
                <ReactRoute path={Route.LOGIN} exact component={SearchUser}/>
                <ReactRoute path={Route.SEARCH_USER} exact component={SearchUser}/>
            </ReactRouter>
        </div>
    );
};

export default Router;