import {TreeReducer, TreeState} from "./tree/TreeReducer";
import {configureStore} from "@reduxjs/toolkit";
import {UserStore} from "./user/userReducer";
import {userReducer} from "./user/userReducer";
import {routerReducer} from "./router/routerReducer";
import {searchUserReducer, SearchUserStore} from "./search-user/searchUserReducer";

export interface RootStore {
    tree: TreeState
    user: UserStore
    router: RootStore
    searchUser: SearchUserStore
}

export default configureStore({
    reducer: {
        tree: TreeReducer,
        user: userReducer,
        router: routerReducer,
        searchUser: searchUserReducer
    }
});