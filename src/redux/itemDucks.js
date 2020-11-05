import axios from 'axios';
import { verifyTokenAction } from './authDucks';
import { getAuthHeaders } from '../services/utils'

const initData = {
    array : []
}

const initItem = { }

const GET_ITEM_SUCCESS = 'GET_ITEM_SUCCESS'
const CREATE_ITEM_SUCCESS = 'CREATE_ITEM_SUCCESS'

export default function itemsReducer(state = initData, action){
    switch(action.type){
        case GET_ITEM_SUCCESS:
            return {...state, array: action.payload}
        default:
            return state
    }
}

export function itemReducer(state = initItem, action){
    switch(action.type){
        case CREATE_ITEM_SUCCESS:
            return action.payload
        default:
            return state
    }
}


export const getItemsAction = () => async (dispatch, getState) => {
    try{
        await dispatch(verifyTokenAction());
        const res = await axios({
            headers: getAuthHeaders(),
            method: 'get',
            url: "http://localhost:8000/api/items/"
        })

        dispatch({
            type: GET_ITEM_SUCCESS,
            payload: res.data.results
        })
        
    }catch(error){
       // console.log(error);
    }
}

export const createItemAction = (data) => async (dispatch, getState) => {
    try{
        await dispatch(verifyTokenAction());
        const res = await axios({
            headers: getAuthHeaders(),
            method: 'post',
            url: "http://localhost:8000/api/entities/",
            data: data
        })

        dispatch({
            type: CREATE_ITEM_SUCCESS,
            payload: res
        })
        
    }catch(error){
        //console.log(error);
    }
} 