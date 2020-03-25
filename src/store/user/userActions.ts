import {User} from "./userReducer";
import {ApiError, ErrorTag, extractErrorTags} from "../../http/errors";
import {LoginCredentials} from "../../components/login/LoginForm";
import {RootStore} from "../rootStore";
import {AnyAction} from "redux";
import {ThunkDispatch} from "redux-thunk";
import RestClient from "../../http/RestClient";
import {goTo} from "../router/routerActions";
import {Route} from "../../Router";

export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const REFRESH_ERROR = 'REFRESH_ERROR';
export const LOGOUT = 'LOGOUT';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_ERROR = 'LOGOUT_ERROR';

export const ME_ENDPOINT = "api/auth/me";
export const ADMIN = 'admin';
export const CUSTOMER = 'customer';
export const DEVELOPER = 'developer';
export const OPS = 'ops';


function loginSuccessAction(data: User) {
    return {type: LOGIN_SUCCESS, payload: {data}};
}

function loginErrorAction(error?: ApiError) {
    const errorTags = error ? extractErrorTags(error) : [ErrorTag.WRONG_CREDENTIALS];
    return {type: LOGIN_ERROR, payload: {errors:errorTags}}
}

function refreshErrorAction(error: ApiError) {
    return {type: REFRESH_ERROR, payload: {error: extractErrorTags(error)}}
}

export function loginAction(credentials: LoginCredentials) {
    return async function (dispatch: ThunkDispatch<RootStore,void, AnyAction>) {
        dispatch({type:LOGIN});
        try {
            await RestClient.post('api/auth/login?rememberme='+credentials.rememberMe , credentials);
            const {data}: { data: User } = await RestClient.get<User>(ME_ENDPOINT);

            validateRoleAfterLogin(data, dispatch);
        }catch (error) {
            dispatch(loginErrorAction(error))

        }
    }
}
function hasSubArray(master :any, sub:any) {
    return sub.every((i => (v: any) => i = master.indexOf(v, i) + 1)(0));
}
function validateRoleAfterLogin(userData: User, dispatch: ThunkDispatch<RootStore, void, AnyAction>) {
    if(hasSubArray([ADMIN, CUSTOMER, DEVELOPER, OPS], userData.roles)) {
        dispatch(loginSuccessAction(userData));
       // dispatch(goTo(Route.SEARCH_USER));
    } else {
        dispatch(loginErrorAction())
    }
}

export function logoutAction() {
    return async function (dispatch: ThunkDispatch<RootStore, void, AnyAction>) {
        dispatch({type: LOGOUT});
        try {
            await RestClient.post('api/auth/me/logout');
            dispatch({type: LOGOUT_SUCCESS});
        } catch (error) {
            console.error("error", error);
            dispatch({type: LOGOUT_ERROR, payload: {errors: extractErrorTags(error)}});
        }
    };
}

export function refreshAuthAction() {
    return async (dispatch: ThunkDispatch<RootStore, void, AnyAction>) => {
        dispatch({type: LOGIN});
        try {
            const {data} = await RestClient.get<User>(ME_ENDPOINT);
            validateRoleAfterLogin(data, dispatch);
        } catch (error) {
            dispatch(refreshErrorAction(error))
        }
    }
}