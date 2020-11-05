import axios from 'axios';
import { verifyTokenAction } from './authDucks';
import { getAuthHeaders } from '../services/utils'

const initData = {
    array : []
}

const initEntity = { }

const GET_ENTITIES_SUCCESS = 'GET_ENTITIES_SUCCESS'
const GET_ENTITY_SUCCESS = 'GET_ENTITY_SUCCESS'
const CREATE_ENTITIES_SUCCESS = 'CREATE_ENTITIES_SUCCESS'

export default function entitiesReducer(state = initData, action){
    switch(action.type){
        case GET_ENTITIES_SUCCESS:
            return {...state, array: action.payload}
        default:
            return state
    }
}

export function entitiyReducer(state = initEntity, action){
    switch(action.type){
        case CREATE_ENTITIES_SUCCESS:
            return action.payload
        case GET_ENTITY_SUCCESS:
            return action.payload
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
            payload: res.data.features
        })
        
    }catch(error){
       // console.log(error);
    }
}

export const getEntity = (id) => async (dispatch, getState) => {
    try{
        await dispatch(verifyTokenAction());
        const res = await axios({
            headers: getAuthHeaders(),
            method: 'get',
            url: `http://localhost:8000/api/entities/${id}/`
        })

        dispatch({
            type: GET_ENTITY_SUCCESS,
            payload: res.data
        })
        
    }catch(error){
       // console.log(error);
    }
}

export const createEntitiesAction = (data) => async (dispatch, getState) => {
    try{
        await dispatch(verifyTokenAction());
        const res = await axios({
            headers: getAuthHeaders(),
            method: 'post',
            url: "http://localhost:8000/api/entities/",
            data: data
        })

        dispatch({
            type: CREATE_ENTITIES_SUCCESS,
            payload: res
        })
        
    }catch(error){
        //console.log(error);
    }
} 