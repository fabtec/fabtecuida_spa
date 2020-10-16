import axios from 'axios';
import { verifyTokenAction } from './authDucks';
import { getAuthHeaders } from '../services/utils'

const initData = {
    loading: true,
    array : []
}

const initOrder = { }

const GET_ORDERS_SUCCESS = 'GET_ORDERS_SUCCESS'
const CREATE_OREDER_SUCCESS = 'CREATE_OREDER_SUCCESS'
const LOADING_ENTITIES = 'LOADING_ENTITIES'

export default function ordersReducer(state = initData, action){
    switch(action.type){
        case LOADING_ENTITIES:
            return {...state, loading: true}
        case GET_ORDERS_SUCCESS:
            return {...state, array: action.payload, loading: false}
        default:
            return state
    }
}

export function orderReducer(state = initOrder, action){
    switch(action.type){
        case CREATE_OREDER_SUCCESS:
            return action.payload
        default:
            return state
    }
}


export const getOrdersAction = (params = null) => async (dispatch, getState) => {
    
    dispatch({
        type: LOADING_ENTITIES
    })

    try{
        await dispatch(verifyTokenAction());
        const res = await axios({
            headers: getAuthHeaders(),
            method: 'get',
            url: "http://localhost:8000/api/orders/",
            params: params || {}
        })

        dispatch({
            type: GET_ORDERS_SUCCESS,
            payload: res.data
                .map(order => ({
                    ...order,
                    title: `${order.entity.properties.name}`
                }))
        })
        
    }catch(error){
       // console.log(error);
    }
}

export const createOrderAction = (data) => async (dispatch, getState) => {
    try{
        await dispatch(verifyTokenAction());
        const res = await axios({
            headers: getAuthHeaders(),
            method: 'post',
            url: "http://localhost:8000/api/create-orders/",
            data: data
        })

        dispatch({
            type: CREATE_OREDER_SUCCESS,
            payload: res
        })
        
    }catch(error){
        //console.log(error);
    }
}