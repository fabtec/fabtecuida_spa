import React,{ useState, useEffect } from 'react'
import { Button, Modal, Form, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getUsersAction } from '../../redux/usersDucks'
import { getEntitiesAction } from '../../redux/entitiesDucks'
import { getItemsAction } from '../../redux/itemDucks'
import { createOrderAction } from '../../redux/ordersDucks'

const OrderCreateModal = ({showModal, handleClose}) => {

    const [selectedEntity, setSelectedEntity] = useState(0);
    const [itemsRequested, setItemsRequested ]= useState([]);
    const [keyItems, setKeyItems] = useState(0)

    const dispatch = useDispatch()
    const users = useSelector(store => store.users.array)
    const entities = useSelector(store => store.entities.array)
    const items = useSelector(store => store.items.array)

    const onSelectedEntityChange = (event) => {
        setSelectedEntity(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        let data_json = []
        for(let i = 0; i < event.target.elements.length; i++){
            let name_ = event.target.elements[i].id;
            let value_ = event.target.elements[i].value;
            data_json[i] = {
                name: name_,
                value: value_
            }
        }

        dispatch(createOrderAction(data_json))
        handleClose()
    }

    useEffect(()=>{
        dispatch(getUsersAction())
        dispatch(getEntitiesAction())
        dispatch(getItemsAction())
    },[dispatch])


    const addItem = () => {
        let additems = 
            <div key={keyItems}>
                <Form.Group controlId={"item_"+keyItems}>
                    <Form.Label>Insumo #{keyItems+1}</Form.Label>
                    <Form.Control as="select">
                    <option>---</option>
                    {items
                        .map((item) => (
                        <option key={item.id} value={item.id}>
                            {item.name}
                        </option>)
                        )}
                    </Form.Control>
                </Form.Group>
        
                <Form.Group controlId={"quantity_"+keyItems}>
                    <Form.Label>Cantidad</Form.Label>
                    <Form.Control type="number" placeholder="Ingresa la cantidad de insumos" />
                </Form.Group>
            </div>

        setKeyItems(keyItems+1)
        setItemsRequested(itemsRequested => [...itemsRequested, additems]);
      }

    return (        
        <Modal show={showModal} onHide={()=>handleClose()}>
            <Modal.Header>
                <Modal.Title>Crear Nueva Orden</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={ handleSubmit }>
                    <Form.Group controlId="manager">
                        <Form.Label>Solicitante</Form.Label>
                        <Form.Control
                            as="select"
                            required
                        >
                            <option key={0} value={0}>---</option>
                                { 
                                    users.map((user) => (
                                        <option key={user.id} value={user.id}>
                                            {user.first_name} {user.last_name}
                                        </option>
                                    )) 
                                }
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="entity">
                        <Form.Label>Entidad</Form.Label>
                        <Form.Control
                            as="select"
                            value={selectedEntity}
                            onChange={onSelectedEntityChange}
                        >
                            <option key={0} value={0}>---</option>
                            { 
                                entities.map((entity) => (
                                    <option key={entity.id} value={entity.id}>
                                        {entity.properties.name}
                                    </option>
                                ))
                            }
                        </Form.Control>
                    </Form.Group>
                    { itemsRequested }
                    <Row className="mb-4">
                        <Col>
                            <Button className="float-md-right" onClick={addItem} variant="success">AGREAGAR ITEM</Button>
                        </Col>
                    </Row>
                    <Button className="shadow" block variant="primary" type="submit">
                        Enviar
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
      )
}

export default OrderCreateModal
