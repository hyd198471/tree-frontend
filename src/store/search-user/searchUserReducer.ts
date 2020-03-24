import {ErrorTag} from "../../http/errors";
import {createReducer} from "@reduxjs/toolkit";
import {SEARCH_USER, SEARCH_USER_FAILURE, SEARCH_USER_SUCCESS} from "./searchUserActions";
import {RESET_VIEWS} from "../genericActions";

export interface UserInformation {
    user_id: number
    role: string
    email: string
    type: string
}

export interface SearchUserStore {
    loading: boolean
    searchTerm: string
    errors: ErrorTag[]
    results: UserInformation[]
}

const initialStore: SearchUserStore = {
    results: [],
    loading: false,
    searchTerm: "",
    errors: []
};

export const searchUserReducer = createReducer(initialStore, {
    [RESET_VIEWS]: () => initialStore,
    [SEARCH_USER]: (state, action) => {
        state.loading = true;
        state.errors = [];
        state.searchTerm = action.payload.searchTerm;
    },
    [SEARCH_USER_SUCCESS]: (state, action) => {
        state.results = action.payload.data;
        state.loading = false;
        state.errors = [];
    },
    [SEARCH_USER_FAILURE]: (state, action) => {
        state.loading = false;
        state.errors = action.payload.errors
    }
});