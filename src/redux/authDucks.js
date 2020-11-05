import axios from 'axios';
import Cookies from 'js-cookie'
import { writeCookie } from '../services/utils';

const initData = {
    loading: true,
    active: false,
    error: false,
    haveToken: false,
}

const LOADING_LOGIN = 'LOADING_LOGIN'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGIN_ERROR = 'LOGIN_ERROR'
const SING_OUT = 'SING_OUT'
const NOT_COOKIES = 'NOT_COOKIES'

export default function auhReducer (state = initData, action){

    switch(action.type){
        case LOADING_LOGIN:
            return {...state, loading: true, error: false}
        case LOGIN_ERROR:
            return {...state, loading: false, error: true}
        case LOGIN_SUCCESS:
            return {...state, loading: false, active: true, tokens: action.payload, error: false}
        case SING_OUT:
            return {...initData}
        case NOT_COOKIES:
            return {...state, loading: false, active: false, error: false}
        default: 
            return {...state}
    }

}

// AUTENTIFICACIÓN DEL USUARIO
export const loginAction = (username, password) => async(dispatch) => {

    dispatch({
        type: LOADING_LOGIN
    })

    try {
        const res = await axios.post("http://localhost:8000/api/token/",{
            username: username,
            password: password
        })

        console.log(res.data)

        Cookies.set('jwt_access_token', res.data.access)
        Cookies.set('jwt_refresh_token', res.data.refresh)
        
        writeCookie('jwt_access_token', res.data.access, 90)
        writeCookie('jwt_refresh_token', res.data.refresh, 90)

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })
    } catch (error) {
        console.log(error)
        dispatch({
            type: LOGIN_ERROR
        })
    }
}

//CON EL TOKEN "REFRESH" VUELVE A BUSCAR EL TOKEN DE ACCESO SIN NECESIDAD DE VOLVER A LOGEARSE
export const refreshTokenAction = () => async(dispatch) => {

    dispatch({
        type: LOADING_LOGIN
    })

    try {
        const res = await axios.post("http://localhost:8000/api/token/refresh/",{
            refresh: Cookies.get('jwt_refresh_token')
        })

        dispatch({
            type: LOGIN_SUCCESS,
            payload: {
                access: res.data.access,
                refresh: Cookies.get('jwt_refresh_token')
            }
        })

        Cookies.set('jwt_access_token', res.data.access)

        writeCookie('jwt_access_token', res.data.access, 90)
        writeCookie('jwt_refresh_token', Cookies.get('jwt_refresh_token'), 90)

    } catch (error) {
        console.log(error)
        dispatch({
            type: LOGIN_ERROR
        })
    }
}

//REVISA SI EL TOKEN DE ACCESO AÚN ESTA DISPONIBLE
export const verifyTokenAction = () => async(dispatch) => {
    dispatch({
        type: LOADING_LOGIN
    })
    
    if(Cookies.get('jwt_access_token')!=null){
        try {
            await axios.post("http://localhost:8000/api/token/verify/",{
                token: Cookies.get('jwt_access_token')
            })
    
            dispatch({
                type: LOGIN_SUCCESS,
                payload: {
                    access: Cookies.get('jwt_access_token'),
                    refresh: Cookies.get('jwt_access_token')
                }
            })

            writeCookie('jwt_refresh_token', Cookies.get('jwt_refresh_token'), 90)
           
        } catch (error) {
            console.log(error)
            await dispatch(await refreshTokenAction())
        }
    }else{
        dispatch({
            type: "NOT_COOKIES"
        })
    }
}