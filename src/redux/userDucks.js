import axios from 'axios';
import { verifyTokenAction } from './authDucks';
import { getAuthHeaders, API_HOST } from '../services/utils'

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
            url: `${API_HOST}/api/token/user/`
        })

        dispatch({
            type: USER_SUCCESS,
            payload: res.data
        })
        
    }catch(error){
        console.log(error);
    }
} 