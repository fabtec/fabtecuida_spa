import axios from 'axios';
import { verifyTokenAction } from './authDucks';
import { getAuthHeaders } from '../services/utils'

const initData = {
    array : []
}

const initOrder = { }

const GET_ORDERS_SUCCESS = 'GET_ORDERS_SUCCESS'
const CREATE_OREDER_SUCCESS = 'CREATE_OREDER_SUCCESS'

export default function ordersReducer(state = initData, action){
    switch(action.type){
        case GET_ORDERS_SUCCESS:
            return {...state, array: action.payload}
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
    try{
        await dispatch(verifyTokenAction());
        const res = await axios({
            headers: getAuthHeaders(),
            method: 'get',
            url: "http://localhost:8000/api/orders/"
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

export const getOrAction = () => async (dispatch, getState) => {
    try{
        await dispatch(verifyTokenAction());
        const res = await axios({
            headers: getAuthHeaders(),
            method: 'get',
            url: "http://localhost:8000/api/entities/"
        })

        dispatch({
            type: GET_ORDERS_SUCCESS,
            payload: res.data.features
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