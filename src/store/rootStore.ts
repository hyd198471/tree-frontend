import {userReducer, UserStore} from "./user/userReducer";
import {routerReducer} from "./router/routerReducer";
import {searchUserReducer, SearchUserStore} from "./search-user/searchUserReducer";
import {configureStore} from "@reduxjs/toolkit";

export interface RootStore {
    user: UserStore
    router: RootStore
    searchUser: SearchUserStore
}

export default configureStore({
    reducer: {
        user: userReducer,
        router: routerReducer,
        searchUser: searchUserReducer
    }
});