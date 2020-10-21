import React, { useEffect } from 'react'
import { Card, ListGroup, ListGroupItem } from "react-bootstrap"
import { useDispatch, useSelector } from 'react-redux'
import { getOrdersAction } from '../../redux/ordersDucks'

const OrderCompleteTab = (tab) => {

    const orders = useSelector(store => store.orders.array)
    const dispatch = useDispatch()

    useEffect(()=>{
        if(tab.tabKey==="complete"){
            dispatch(getOrdersAction({status:"DONE"}))
        }
    },[tab.tabKey, dispatch])

    return (
        <div className="mt-4 p-2">
            {orders.map((order) =>
            <Card className="col-12 p-0 mb-4">
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
