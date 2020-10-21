import React, { useEffect } from 'react'
import { Card, ListGroup, ListGroupItem, Button } from "react-bootstrap"
import { useDispatch, useSelector } from 'react-redux'
import { getOrdersAction, suppliedOrderAction } from '../../redux/ordersDucks'

const OrederInProgressTab = (tab) => {

    const dispatch = useDispatch();
    const orders = useSelector(store => store.orders.array)
    const order = useSelector(store => store.order)

    const handleComplete = (item) => {
        dispatch(suppliedOrderAction(item.id, {"status": "DONE"}))
    }

    useEffect(()=>{
        if(tab.tabKey==="inprogress"){
            dispatch(getOrdersAction({status:"INPROGRESS"}))
        }
    },[tab.tabKey, order, dispatch])
    
    return (
        <div className="mt-4 p-2">
            {
            orders.map((order) =>
            <Card key={order.id} className="col-12 p-0 mb-4">
                <Card.Header as="h5">{order.entity.properties.name}</Card.Header>
                <ListGroup className="list-group-flush">
                    { order.order_supplied_item
                        .map((item,index) => (
                        <ListGroupItem key={item.id+"-"+index}>
                        <div className="row order-item">
                            <div className="col-sm-6">
                            {`${item.quantity} ${item.item.name} en camino desde`} <b>{item.supplier.properties.name}</b>
                            </div>
                            <div className="col-sm-6">
                            <Button className="shadow" onClick={() => handleComplete(item) } disabled={item.status === "DONE"}>Completar</Button>
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

export default OrederInProgressTab
