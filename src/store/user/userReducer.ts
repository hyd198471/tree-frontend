import {ErrorTag} from "../../http/errors";
import {
    ADMIN,
    LOGIN,
    LOGIN_ERROR,
    LOGIN_SUCCESS,
    LOGOUT,
    LOGOUT_ERROR,
    LOGOUT_SUCCESS,
    REFRESH_ERROR
} from "./userActions";
import {createReducer} from "@reduxjs/toolkit";



export interface User {
    email: string
    roles: string[]
}

export interface UserStore {
    loggedIn: boolean
    data: User | null
    userIsAdmin: boolean
    loading: boolean
    errors: ErrorTag[]
    rememberMe: boolean
}

const initialState: UserStore = {
    loggedIn: false,
    data: null,
    userIsAdmin: false,
    loading: false,
    errors: [],
    rememberMe:false
};

export const userReducer = createReducer(initialState, {
    [LOGIN] : (state: UserStore) => {
        state.loading = true;
        state.loggedIn = false;
        state.userIsAdmin = false;
        state.data = null;
        state.errors = [];
    },
    [LOGIN_SUCCESS]: (state: UserStore, action) =>{
        state.loading = false;
        state.loggedIn = true;
        state.userIsAdmin = hasSubArray(ADMIN, action.payload.data.roles);
        state.data = action.payload.data;
        state.errors= [];
    },
    [LOGIN_ERROR]: (state: UserStore, action) => {
        state.loading = false;
        state.loggedIn = false;
        state.data = null;
        state.errors = action.payload.errors;
    },
    [REFRESH_ERROR]: (state: UserStore) => {
        state.loading = false;
        state.loggedIn = false;
        state.data = null;
        state.errors = [];
    },
    [LOGOUT]: (state: UserStore) => {
        state.loading = true;
    },
    [LOGOUT_SUCCESS]: (state: UserStore) => {
        state.loading = false;
        state.loggedIn = false;
        state.data = null;
    },
    [LOGOUT_ERROR]: (state: UserStore) => {
        state.loading = false;
    }
});

function hasSubArray(master :any, sub:any) {
    return sub.every((i => (v: any) => i = master.indexOf(v, i) + 1)(0));
}
