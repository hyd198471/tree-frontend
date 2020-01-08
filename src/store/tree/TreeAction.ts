import {AnyAction} from "redux";
import {ThunkDispatch} from "redux-thunk";
import {RootStore} from "../rootStore";
import {AxiosResponse} from "axios";
import RestClient from "../../http/RestClient";
import {TreeNode} from "./TreeReducer";


export const GET_ROOT_NODE= 'GET_ROOT_NODE';
export const GET_ROOT_NODE_SUCCESS= 'GET_ROOT_NODE_SUCCESS';
export const GET_ROOT_NODE_FAILURE= 'GET_ROOT_NODE_FAILURE';

export function getRootNode() {
    return async function (dispatch: ThunkDispatch<RootStore, void, AnyAction>) {
        dispatch({type: 'GET_ROOT_NODE'});
        try{
            const rootNode: AxiosResponse<TreeNode> = await RestClient.get('v1/trees');
            dispatch({type:'GET_ROOT_NODE_SUCCESS', payload: {data: rootNode.data}});
        } catch (error) {
            dispatch({type:'GET_ROOT_NODE_FAILURE', payload: {errors: error}})
        }
    }
}