import {createReducer} from "@reduxjs/toolkit";
import {GET_ROOT_NODE, GET_ROOT_NODE_FAILURE, GET_ROOT_NODE_SUCCESS} from "./TreeAction";


export interface TreeNode {
    nodeId: number
    data: string
    parent: TreeNode
    children: TreeNode[]
}

export interface TreeState {
    treeNode: TreeNode | null
    loading: boolean
    errors: string[]
}

const initialState: TreeState = {
    treeNode: null,
    loading: false,
    errors: []
}

export const TreeReducer= createReducer(initialState, {
    [GET_ROOT_NODE]: (state: TreeState) => {
        state.loading = true;
        state.errors= [];
        state.treeNode=null;
    },
    [GET_ROOT_NODE_SUCCESS]: (state: TreeState, action) => {
        state.treeNode = action.payload.data;
        state.loading= false;
        state.errors= [];
    },[GET_ROOT_NODE_FAILURE]: (state: TreeState, action) => {
        state.loading=false;
        state.treeNode= null;
        state.errors= action.payload.errors;
    }
});