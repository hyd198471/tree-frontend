import {createReducer} from "@reduxjs/toolkit";


export interface TreeNode {
    nodeId: number
    data: string
    parent: TreeNode
    children: TreeNode[]
}

export interface TreeStore {
    data: TreeNode | null
    loading: boolean
    errors: string[]
}

const initialState: TreeStore = {
    data: null,
    loading: false,
    errors: []
}

export const TreeReducer= createReducer(initialState, {
    ['GET_ROOT_NODE']: (state: TreeStore) => {
        state.loading = true;
        state.errors= [];
        state.data=null;
    },
    ['GET_ROOT_NODE_SUCCESS']: (state: TreeStore, action) => {
        state.data = action.payload.data;
        state.loading= false;
        state.errors= [];
    },['GET_ROOT_NODE_FAILURE']: (state: TreeStore, action) => {
        state.loading=false;
        state.data= null;
        state.errors= action.payload.errors;
    }
});