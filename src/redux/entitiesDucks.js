import axios from 'axios';

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
        const res = await axios.get("http://localhost:8000/api/entities/")
        dispatch({
            type: GET_ENTITIES_SUCCESS,
            payload: res.data.results
        })
        
    }catch(error){
        console.log(error);
    }
} 