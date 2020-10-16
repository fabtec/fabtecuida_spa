import React, { useEffect, useState } from 'react'
import { Button, Modal, Form, Accordion, Card, ListGroup, ListGroupItem } from "react-bootstrap";
import { getInventoryAction } from '../../redux/inventoryDucks'
import { useDispatch, useSelector } from 'react-redux'
import {setOrdersSuppliedAction, getOrdersSuppliedAction} from '../../redux/orderSuppliedDucks'

const MatchStockModal  = ({ showModal, handleClose, item }) => {
    
    const [itemSelected, setItemSelected] = useState([]);
    const [item_requested, setItem_requested] = useState();

    const dispatch = useDispatch();
    const inventory = useSelector(store => store.inventory.array)
    const order_supplied = useSelector(store => store.order_supplied)

    useEffect(()=>{
        dispatch(getInventoryAction({item: item.item?.id}))
        dispatch(getOrdersSuppliedAction())
    },[dispatch, showModal])

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(setOrdersSuppliedAction({ itemSelected, item_requested }))
        if(order_supplied.status === 200){
            handleClose()
        }
    }

    const handleChangeClick = (e) =>{
        let index
        const options = itemSelected
    
        if (e.target.checked) {
          // add the numerical value of the checkbox to options array
          options.push(+e.target.value)
        } else {
          // or remove the value from the unchecked checkbox from the array
          index = options.indexOf(+e.target.value)
          options.splice(index, 1)
        }
        setItemSelected(options)
        setItem_requested(item.id)
    }

    return (
        <Modal size="lg" show={ showModal } onHide={()=> handleClose() }>
            <Form onSubmit={ handleSubmit }>
                <Modal.Header closeButton>
                    <Modal.Title>Solicitud - { item.item ? `${item.quantity} ${item.item.name}`: null }</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                {inventory.map((inventory_) => (
                    <Accordion defaultActiveKey="0" key={inventory_.id}>
                    <Card className="p-0 mb-4">
                    <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="0">
                        {inventory_.supplier.properties.name}
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>
                        <ListGroup className="list-group-flush">
                        <ListGroupItem key={inventory_.id}>
                            <Form.Check 
                                type='checkbox'
                                label={`${inventory_.quantity} ${inventory_.item.name}`}
                                id={`inline-${inventory_.id}`}
                                value={inventory_.id}
                                onChange={handleChangeClick.bind(this)}
                            />
                        </ListGroupItem>
                        </ListGroup>
                        </Card.Body>
                    </Accordion.Collapse>
                    </Card>
                    </Accordion>
                ))} 
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={()=> handleClose() }> Cerrar </Button>
                    <Button type="submit" variant="success"> Asignar </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default MatchStockModal
