import axios from 'axios';
import { verifyTokenAction } from './authDucks';
import { getAuthHeaders, API_HOST } from '../services/utils'

const initData = {
    array : []
}

const initSupplier = { }

const GET_SUPPLIER_SUCCESS = 'GET_SUPPLIER_SUCCESS'
const ADD_ITEM_INVENTORY_SUCCESS = 'ADD_ITEM_INVENTORY_SUCCESS'

export default function inventoryReducer(state = initData, action){
    switch(action.type){
        case GET_SUPPLIER_SUCCESS:
            return {...state, array: action.payload}
        default:
            return state
    }
}

export function addItemInventoryReducer(state = initSupplier, action){
    switch(action.type){
        case ADD_ITEM_INVENTORY_SUCCESS:
            return action.payload
        default:
            return state
    }
}


export const getInventoryAction = (params = null) => async (dispatch, getState) => {
    try{
        await dispatch(verifyTokenAction());
        const res = await axios({
            headers: getAuthHeaders(),
            method: 'get',
            url: `${API_HOST}/api/supplier-inventory/`,
            params: params || {}
        })

        dispatch({
            type: GET_SUPPLIER_SUCCESS,
            payload: res.data
        })
        
    }catch(error){
       // console.log(error);
    }
}

export const addInventoryAction = ({ supplier, item, quantity }) => async (dispatch, getState) => {
    try{
        await dispatch(verifyTokenAction());
        const res = await axios({
            headers: getAuthHeaders(),
            method: 'post',
            url: `${API_HOST}/api/supplier-inventory/`,
            data: { supplier, item, quantity }
        })

        dispatch({
            type: ADD_ITEM_INVENTORY_SUCCESS,
            payload: res
        })
        
    }catch(error){
        //console.log(error);
    }
}