import React, { useEffect, useState } from 'react'
import { Card, ListGroup, ListGroupItem, Button, Alert } from "react-bootstrap"
import { useDispatch, useSelector } from 'react-redux'
import BeatLoader from 'react-spinners/BeatLoader'
import { getOrdersAction } from '../../redux/ordersDucks'
import MatchStockModal from '../MatchStockModal'

const OrderPendingTab = (tab) => {
    const [showModalassign, setShowModalAssign] = useState(false);
    const [itemSelected, setItemSelected] = useState([]);
    const dispatch = useDispatch();
    const [alertShow, setAlertShow] = useState(false);

    const orders = useSelector(store => store.orders)
    const order = useSelector(store => store.order)
    const order_supplied = useSelector(store => store.order_supplied)
   

    const handleAssing = (item) => {
        setItemSelected(item);
        setShowModalAssign(true);
    }

    useEffect(()=>{
        if(tab.tabKey==="pending"){
            dispatch(getOrdersAction({status:"PENDING"}))
            if(order.status === 201){
                setAlertShow(true)
            }else{
                setAlertShow(false)
            }
        }
    },[order, order_supplied, tab.tabKey, dispatch])
 
    return (
        <div className="mt-4 p-2">
            { alertShow ? (<Alert variant="success" onClose={() => setAlertShow(false)} dismissible>Orden Creada Correctamente</Alert>) : null}
            {orders.loading ? 
            <div className="text-center"> 
                <BeatLoader
                    size={20}
                    margin={6}
                    color='#24426c'
                    loading={orders.loading}
                />
                <p>Cargando...</p>
            </div>
            : orders.array
            .map((order) =>
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
                                        <Button className="shadow" onClick={() => handleAssing(item_desc) }> Asignar </Button>
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
