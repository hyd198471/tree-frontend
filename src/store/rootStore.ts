import {TreeReducer, TreeStore} from "./tree/TreeReducer";
import {configureStore} from "@reduxjs/toolkit";

export interface RootStore {
    tree: TreeStore
}

export default configureStore({
    reducer: {
        tree: TreeReducer
    }
});