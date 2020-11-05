import axios from 'axios';
import { verifyTokenAction } from './authDucks';
import { getAuthHeaders } from '../services/utils'

const initData = {
    array : []
}

const USER_SUCCESS = 'USER_SUCCESS'


export default function userReducer(state = initData, action){
    switch(action.type){
        case USER_SUCCESS:
            return {...state, array: action.payload}
        default:
            return state
    }
}


export const getUserAction = () => async (dispatch, getState) => {
    try{
        await dispatch(verifyTokenAction());
        const res = await axios({
            headers: getAuthHeaders(),
            method: 'post',
            url: "http://localhost:8000/api/token/user/"
        })

        dispatch({
            type: USER_SUCCESS,
            payload: res.data
        })
        
    }catch(error){
        console.log(error);
    }
} 