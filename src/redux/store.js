import {createStore, combineReducers, compose, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

import entitiesReducer from './entitiesDucks'
import auhReducer from './authDucks'
import userReducer from './userDucks'

const rootReducer = combineReducers({
    auth: auhReducer,
    user: userReducer,
    entities: entitiesReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore() {
    const store = createStore( rootReducer, composeEnhancers( applyMiddleware(thunk) ) )
    return store
}