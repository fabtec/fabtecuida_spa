import React, { useEffect, useState } from 'react'
import { Card, ListGroup, ListGroupItem, Button } from "react-bootstrap"
import { useDispatch, useSelector } from 'react-redux'
import { getOrdersAction } from '../../redux/ordersDucks'

const OrederInProgressTab = (tab) => {

    const dispatch = useDispatch();
    const orders = useSelector(store => store.orders.array)

    // useEffect(()=>{
    //     dispatch(getOrdersAction({status:"INPROGRESS"}))
    //     // console.log(tabKey)
    // },[dispatch])

    useEffect(()=>{
        if(tab.tabKey==="inprogress"){
            dispatch(getOrdersAction({status:"INPROGRESS"}))
            
        }
    },[dispatch])

    useEffect(()=>{
        if(!orders.loading)
            if(tab.tabKey==="inprogress"){
                console.log(orders)
            }
    },[tab, orders])

    const handleComplete = () => {

    }
    
    return (
        <div className="row justify-content-center">
            {
            orders.map((order) =>
            <Card key={order.id} className="col-12 p-0 mb-4 shadow">
                <Card.Header as="h5">{order.entity.name}</Card.Header>
                <ListGroup className="list-group-flush">
                    { order.order_supplied_item
                        .map((item,index) => (
                        <ListGroupItem key={item.id+"-"+index}>
                        <div className="row order-item">
                            <div className="col-sm-6">
                            {`${item.quantity} ${item.item.name} en camino desde`} <b>{item.supplier.name}</b>
                            </div>
                            <div className="col-sm-6">
                            <Button onClick={() => handleComplete(item)} disabled={item.status === "DONE"}>Completar</Button>
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
