import {createStore, combineReducers, compose, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

import entitiesReducer, { entitiyReducer } from './entitiesDucks'
import auhReducer from './authDucks'
import userReducer from './userDucks'
import usersReducer from './usersDucks'
import inventoryReducer, { addItemInventoryReducer } from './inventoryDucks'
import itemsReducer from './itemDucks'
import ordersReducer, { orderReducer } from './ordersDucks'
import OrdersSuppliedReducer from './orderSuppliedDucks'


const rootReducer = combineReducers({
    auth: auhReducer,
    user: userReducer,
    users: usersReducer,
    entities: entitiesReducer,
    entity: entitiyReducer,
    inventory: inventoryReducer,
    itemAdded: addItemInventoryReducer,
    items: itemsReducer,
    order: orderReducer,
    orders: ordersReducer,
    order_supplied: OrdersSuppliedReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore() {
    const store = createStore( rootReducer, composeEnhancers( applyMiddleware(thunk) ) )
    return store
}