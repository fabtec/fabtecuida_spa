import {createStore, combineReducers, compose, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

import entitiesReducer, {entitiyReducer} from './entitiesDucks'
import auhReducer from './authDucks'
import userReducer from './userDucks'
import usersReducer from './usersDucks'

const rootReducer = combineReducers({
    auth: auhReducer,
    user: userReducer,
    users: usersReducer,
    entities: entitiesReducer,
    entity: entitiyReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore() {
    const store = createStore( rootReducer, composeEnhancers( applyMiddleware(thunk) ) )
    return store
}