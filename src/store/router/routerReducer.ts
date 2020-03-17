import {Route} from "../../Router";
import {createReducer} from "@reduxjs/toolkit";
import {GO_TO} from "./routerActions";
import history from "../../history";

export interface RouterStore {
    currentRoute: Route.LOGIN
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