import {TreeReducer, TreeState} from "./tree/TreeReducer";
import {configureStore} from "@reduxjs/toolkit";

export interface RootStore {
    tree: TreeState
}

export default configureStore({
    reducer: {
        tree: TreeReducer
    }
});