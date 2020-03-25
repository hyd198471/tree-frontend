import {Route} from "../../Router";
import {GO_TO} from "./routerActions";
import history from "../../app/history";
import {createReducer} from "@reduxjs/toolkit";

export interface RouterStore {
    currentRoute: Route;
}

const initialState: RouterStore = {
    currentRoute: Route.LOGIN
}

export const routerReducer = createReducer(initialState, {
   [GO_TO]:(state: RouterStore, action) => {
       state.currentRoute = action.payload.route;
       history.push(state.currentRoute);
   }
});