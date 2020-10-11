import axios from 'axios';
import { verifyTokenAction } from './authDucks';
import { getAuthHeaders } from '../services/utils'

const initData = {
    array : []
}

const GET_ENTITIES_SUCCESS = 'GET_ENTITIES_SUCCESS'


export default function entitiesReducer(state = initData, action){
    switch(action.type){
        case GET_ENTITIES_SUCCESS:
            return {...state, array: action.payload}
        default:
            return state
    }
}


export const getEntitiesAction = () => async (dispatch, getState) => {
    try{
        await dispatch(verifyTokenAction());
        const res = await axios({
            headers: getAuthHeaders(),
            method: 'get',
            url: "http://localhost:8000/api/entities/"
        })

        dispatch({
            type: GET_ENTITIES_SUCCESS,
            payload: res.data.results.features
        })
        
    }catch(error){
        console.log(error);
    }
} 