import React, { useEffect, useState } from 'react'
import { Card, ListGroup, ListGroupItem, Button } from "react-bootstrap"
import { useDispatch, useSelector } from 'react-redux'
import { getOrdersAction } from '../../redux/ordersDucks'
import MatchStockModal from '../MatchStockModal'

const OrderPendingTab = (tab) => {
    const [showModalassign, setShowModalAssign] = useState(false);
    const [itemSelected, setItemSelected] = useState([]);
    const dispatch = useDispatch();
    const orders = useSelector(store => store.orders)

    const handleAssing = (item) => {
        setItemSelected(item);
        setShowModalAssign(true);
    }

    // useEffect(()=>{
    //     dispatch(getOrdersAction({status:"PENDING"}))
    // },[dispatch, showModalassign])

    useEffect(()=>{
        if(tab.tabKey==="pending"){
            dispatch(getOrdersAction({status:"PENDING"}))
            
        }
    },[dispatch])

    useEffect(()=>{
        if(!orders.loading)
            if(tab.tabKey==="pending"){
                console.log(orders)
            }
    },[tab, orders])

    return (
        <div className="mt-4 p-2">
            {
            orders.array.map((order) =>
                <Card key={order.id} className="col-12 p-0 mb-4">
                    <Card.Header as="h5">{order.title}</Card.Header>
                    <ListGroup className="list-group-flush">
                    {
                        order.order_requested_item
                        .map((item_desc, index) => (
                            <ListGroupItem key={index}>
                                <div className="row order-item">
                                    <div className="col-sm-4">
                                        {`${item_desc.quantity} ${item_desc.item.name}`}
                                    </div>
                                    <div className="col-sm-4">
                                        <Button onClick={() => handleAssing(item_desc) }> Asignar </Button>
                                    </div>
                                </div>
                            </ListGroupItem>
                        ))
                    }
                    </ListGroup>
                </Card>)
            }

            { 
                <MatchStockModal showModal={ showModalassign } handleClose={()=> setShowModalAssign(false) } item={ itemSelected } />
            }
        </div>
    )
}

export default OrderPendingTab
