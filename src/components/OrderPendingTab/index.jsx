import React, { useEffect } from 'react'
import { Card, ListGroup, ListGroupItem, Button } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux'
import { getOrdersAction } from '../../redux/ordersDucks'

const OrderPendingTab = ({ showModal }) => {

    const dispatch = useDispatch();
    const orders = useSelector(store => store.orders.array)

    useEffect(()=>{
        dispatch(getOrdersAction({status:"PENDING"}))
    },[dispatch, showModal])

    const getItemRow = (order) => order.order_requested_item
    .map((item, index) => (
        <ListGroupItem key={index}>
            <div className="row order-item">
                <div className="col-sm-4">
                    {`${item.quantity} ${item.item.name}`}
                </div>
                <div className="col-sm-4">
                    <Button>Asignar</Button>
                    {/* <Button onClick={() => handleAssign(item)}>Asignar</Button> */}
                </div>
            </div>
        </ListGroupItem>
    ));

    return (
        <div className="mt-4 p-2">
            {
            orders.map((order) =>
                <Card className="col-12 p-0 mb-4">
                    <Card.Header as="h5">{order.title}</Card.Header>
                    <ListGroup className="list-group-flush">
                        { getItemRow(order)}
                    </ListGroup>
                </Card>)
            }
            {/* {itemSelected ? (
            <MatchStockModal
              item={itemSelected}
              show={showItem}
              handleClose={handleCloseModal} />
          ) : null} */}
        </div>
    )
}

export default OrderPendingTab
