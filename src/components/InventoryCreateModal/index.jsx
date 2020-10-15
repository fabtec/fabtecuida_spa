import React,{ useState, useEffect } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getEntitiesAction } from '../../redux/entitiesDucks'
import { getItemsAction } from '../../redux/itemDucks'
import { addInventoryAction } from '../../redux/inventoryDucks'

const InventoryCreateModal = ({showModal, handleClose}) => {
    const [suppliers, setSuppliers] = useState([]);
    const [inventory, setInventory] = useState(null);
    const [quantity, setQuantity] = useState(null);
    const [entitiesList, setEntitiesList] = useState([]);
    const [itemsList, setItemsList ]= useState([]);
    const [selectedEntity, setSelectedEntity] = useState(0);
    const [selectedItem, setSelectedItem] = useState(0);
    const [showInventory, setShowInventory] = useState(false);

    const handleChangeQuantity = (event) => setQuantity(event.target.value);
    const handleCloseInventory = () => setShowInventory(false);
    const handleShowInventory = () => setShowInventory(true);

    const onSelectedEntityChange = (event) => {
        setSelectedEntity(event.target.value)
    }

    const onSelectedItemChange = (event) => {
        setSelectedItem(event.target.value)
    }

    const dispatch = useDispatch()
    const entities = useSelector(store => store.entities.array)
    const items = useSelector(store => store.items.array)
    const item_inventory = useSelector(store => store.itemAdded)

    useEffect(()=>{
        dispatch(getEntitiesAction())
        dispatch(getItemsAction())
    },[dispatch])

    

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(addInventoryAction({
            supplier: selectedEntity,
            item: selectedItem,
            quantity: quantity
        }))
      };

    useEffect(()=>{
      if(item_inventory.status === 201){
          handleClose()
      }
    },[item_inventory, handleClose])

    return (        
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header>
                <Modal.Title>Agregando Inventario</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formEntity">
                        <Form.Label>Entidad</Form.Label>
                        <Form.Control
                            as="select"
                            value={selectedEntity}
                            onChange={onSelectedEntityChange}
                        >
                            <option key={0} value={0}>---</option>
                            { entities.map((entity) => (
                                <option key={entity.id} value={entity.id}>
                                    { entity.properties.name }
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formArticle">
                        <Form.Label>Articulo</Form.Label>
                        <Form.Control
                            as="select"
                            value={selectedItem}
                            onChange={onSelectedItemChange}
                        >

                            <option key={0} value={0}>---</option>
                            { items.map((item) => (
                                <option key={item.id} value={item.id}>
                                    { item.name }
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formQuantity">
                        <Form.Label>Cantidad</Form.Label>
                        <Form.Control type="text" onChange={handleChangeQuantity}/>
                    </Form.Group>
                    <Button className="float-right" variant="primary" type="submit">
                        Añadir a inventario
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default InventoryCreateModal
