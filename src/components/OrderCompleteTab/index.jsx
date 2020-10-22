import React, { useEffect } from 'react'
import { Card, ListGroup, ListGroupItem } from "react-bootstrap"
import { useDispatch, useSelector } from 'react-redux'
import BeatLoader from 'react-spinners/BeatLoader'
import { getOrdersAction } from '../../redux/ordersDucks'

const OrderCompleteTab = (tab) => {

    const orders = useSelector(store => store.orders)
    const dispatch = useDispatch()

    useEffect(()=>{
        if(tab.tabKey==="complete"){
            dispatch(getOrdersAction({status:"DONE"}))
        }
    },[tab.tabKey, dispatch])

    return (
        <div className="mt-4 p-2">
            { 
            orders.loading ? 
            <div className="text-center"> 
                <BeatLoader
                    size={20}
                    margin={6}
                    color='#24426c'
                    loading={orders.loading}
                />
                <p>Cargando...</p>
            </div>
            :
             orders.array
            .length === 0 ? <div className="text-center"> 
                <h6> No Existen Ordenes Completadas</h6> 
            </div> : 
            orders.array.map((order) =>
            <Card key={order.id} className="col-12 p-0 mb-4">
            <Card.Header as="h5">{order.entity.properties.name}</Card.Header>
            <ListGroup className="list-group-flush">
                {order.order_supplied_item
                    .map((item) => (
                    <ListGroupItem>
                    <div className="row order-item">
                        <div className="col-sm-12">
                        {`${item.quantity} ${item.item.name} suministrado por`} <b>{item.supplier.name}</b>
                        </div>
                    </div>
                    </ListGroupItem>
                    ))}
            </ListGroup>
            </Card>
            )
            }
        </div>
    )
}

export default OrderCompleteTab
