import {ThunkDispatch} from "redux-thunk";
import {RootStore} from "../rootStore";
import {AnyAction} from "redux";
import RestClient from "../../http/RestClient";
import {UserInformation} from "./searchUserReducer";
import {extractErrorTags} from "../../http/errors";


export const SEARCH_USER = 'SEARCH_USER';
export const SEARCH_USER_SUCCESS = 'SEARCH_USER_SUCCESS';
export const SEARCH_USER_FAILURE = 'SEARCH_USER_FAILURE';

export function searchUser(searchTerm: string) {
    return async function(dispatch: ThunkDispatch<RootStore, void, AnyAction>) {
        dispatch({type: SEARCH_USER, payload: {searchTerm}});
        try {
            const {data} = await RestClient.get<UserInformation[]>(`api/users/${searchTerm}`);
            dispatch({type: SEARCH_USER_SUCCESS, payload: {data}});
        } catch (error) {
            dispatch({type: SEARCH_USER_FAILURE, payload: {errors: extractErrorTags(error)}});
        }
    }
}

