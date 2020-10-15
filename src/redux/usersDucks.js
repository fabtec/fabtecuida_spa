import axios from 'axios';
import { verifyTokenAction } from './authDucks';
import { getAuthHeaders } from '../services/utils'

const initData = {
    array : []
}

const USERS_SUCCESS = 'USERS_SUCCESS'


export default function usersReducer(state = initData, action){
    switch(action.type){
        case USERS_SUCCESS:
            return {...state, array: action.payload}
        default:
            return state
    }
}


export const getUsersAction = () => async (dispatch, getState) => {
    try{
        await dispatch(verifyTokenAction());
        const res = await axios({
            headers: getAuthHeaders(),
            method: 'get',
            url: "http://localhost:8000/api/users/"
        })

        dispatch({
            type: USERS_SUCCESS,
            payload: res.data.results
        })
        
    }catch(error){
        console.log(error);
    }
} 