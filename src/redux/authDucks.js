import axios from 'axios';
import Cookies from 'js-cookie'

const initData = {
    loading: false,
    active: false,
    error: false
}

const LOADING = 'LOADING'
const USER_SUCCESS = 'USER_SUCCESS'
const USER_ERROR = 'USER_ERROR'
const SING_OUT = 'SING_OUT'

export default function auhReducer (state = initData, action){

    switch(action.type){
        case LOADING:
            return {...state, loading: true, error: false}
        case USER_ERROR:
            return {...state, loading: false, error: true}
        case USER_SUCCESS:
            return {...state, loading: false, active: true, tokens: action.payload, error: false}
        case SING_OUT:
            return {...initData}
        default: 
            return {...state, loading: false}
    }

}

// AUTENTIFICACIÓN DEL USUARIO
export const loginAction = (username, password) => async(dispatch) => {

    dispatch({
        type: LOADING
    })

    try {
        const res = await axios.post("http://localhost:8000/api/token/",{
            username: username,
            password: password
        })

        Cookies.set('jwt_access_token', res.data.access)
        Cookies.set('jwt_refresh_token', res.data.refresh)

        dispatch({
            type: USER_SUCCESS,
            payload: res.data
        })
    } catch (error) {
        console.log(error)
        dispatch({
            type: USER_ERROR
        })
    }
}

//CON EL TOKEN "REFRESH" VUELVE A BUSCAR EL TOKEN DE ACCESO SIN NECESIDAD DE VOLVER A LOGEARSE
export const refreshTokenAction = () => async(dispatch) => {

    dispatch({
        type: LOADING
    })

    try {
        const res = await axios.post("http://localhost:8000/api/token/refresh/",{
            refresh: Cookies.get('jwt_refresh_token')
        })

        dispatch({
            type: USER_SUCCESS,
            payload: {
                access: res.data.access,
                refresh: Cookies.get('jwt_refresh_token')
            }
        })

        Cookies.set('jwt_access_token', res.data.access)

    } catch (error) {
        console.log(error)
        dispatch({
            type: USER_ERROR
        })
    }
}

//REVISA SI EL TOKEN DE ACCESO AÚN ESTA DISPONIBLE
export const verifyTokenAction = () => async(dispatch) => {

    dispatch({
        type: LOADING
    })
    
    if(Cookies.get('jwt_access_token')!=null){
        try {
            const res = await axios.post("http://localhost:8000/api/token/verify/",{
                token: Cookies.get('jwt_access_token')
            })
    
            dispatch({
                type: USER_SUCCESS,
                payload: res.data
            })
           
        } catch (error) {
            console.log(error)
            dispatch(refreshTokenAction())
        }
    }

    
}

