import axios from 'axios'
import { verifyTokenAction } from './authDucks'
import { getAuthHeaders, API_HOST } from '../services/utils'

const initData = { }

const SUPPLIED_ITEM_SUCCESS = 'SUPPLIED_ITEM_SUCCESS'
const LOADING_ORDERS_SUPPLIED = 'LOADING_ORDERS_SUPPLIED'

export default function OrdersSuppliedReducer(state = initData, action){
    switch(action.type){
        case SUPPLIED_ITEM_SUCCESS:
            return action.payload
        default:
            return state
    }
}

export const getOrdersSuppliedAction=() => async (dispatch, getState) => {
    dispatch({
        type: LOADING_ORDERS_SUPPLIED
    })
}

export const setOrdersSuppliedAction = ({ itemSelected, item_requested }) => async (dispatch, getState) => {
    
    dispatch({
        type: LOADING_ORDERS_SUPPLIED
    })

    try{
        await dispatch(verifyTokenAction());
        const res = await axios({
            headers: getAuthHeaders(),
            method: 'post',
            url: `${API_HOST}/api/supplied-item/`,
            data: {
                'itemSelected': itemSelected, 
                'requested_item': item_requested
            }
        })

        dispatch({
            type: SUPPLIED_ITEM_SUCCESS,
            payload: res
        })
        
    }catch(error){
        //console.log(error);
    }
}