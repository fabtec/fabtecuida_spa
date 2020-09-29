import React, { useState, useEffect } from "react";

import InventoryTable from "../InventoryTable";
import Api from "../../services/api";
import InventoryInfoModal from "../InventoryInfoModal";
import {Tabs, Tab, Form, Button} from "react-bootstrap";

function InventoryPage() {
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

  const getSuppliedInventory = (params) =>
    Api.getSuppliedInventory(params).then((suppliersList) => {
      console.log(suppliersList)
      setSuppliers(suppliersList);
    });

  useEffect(() => {
    getSuppliedInventory();
    
    Api.getEntities()
      .then((entitiesList) => {
        setEntitiesList(entitiesList)
      })

    Api.getItems()
      .then((itemList) => {
        setItemsList(itemList)
      })
  }, []);

  useEffect(() => {
    if (inventory) {
      handleShowInventory();
    }
  }, [inventory]);

  const entitiesOptions = entitiesList
    .map((entity) => (
      <option key={entity.id} value={entity.id}>
        {entity.properties.name}
      </option>)
    );

    const itemsOptions = itemsList
      .map((item) => (
        <option key={item.id} value={item.id}>
          {item.name}
        </option>)
      );
    
    const onSelectedEntityChange = (event) => {
      setSelectedEntity(event.target.value)
    }

    const onSelectedItemChange = (event) => {
      setSelectedItem(event.target.value)
    }

    const handleSubmit = (event) => {
      event.preventDefault();
      console.log({
        supplier: selectedEntity,
        item: selectedItem,
        quantity: quantity
    })
      Api.createSuppliedInventory({
            supplier: selectedEntity,
            item: selectedItem,
            quantity: quantity
        })
        .then((res) => {
          alert("guardado correctamente")
        })
        
    };

  return (
    <Tabs defaultActiveKey="addInventory" id="uncontrolled-tab-example">
      <Tab eventKey="addInventory" title="Agregar a invetario">
      <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicEmail">
          <Form.Label>Entidad</Form.Label>
          <Form.Control
            as="select"
            value={selectedEntity}
            onChange={onSelectedEntityChange}
          >
            <option key={0} value={0}>---</option>
            { entitiesOptions }
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Articulo</Form.Label>
          <Form.Control
            as="select"
            value={selectedItem}
            onChange={onSelectedItemChange}
          >
            <option key={0} value={0}>---</option>
            { itemsOptions }
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Cantidad</Form.Label>
          <Form.Control type="text" onChange={handleChangeQuantity}/>
        </Form.Group>
        <Button className="float-right" variant="primary" type="submit">
          Añadir a inventario
        </Button>
      </Form>
      </Tab>
      <Tab eventKey="viewinVentory" title="Ver inventario">
        <div>
          <InventoryTable suppliers={suppliers} setInventory={setInventory} />
          {inventory ? (
            <InventoryInfoModal inventory={inventory} show={showInventory} handleClose={handleCloseInventory} />
          ) : null}
        </div>
      </Tab>
</Tabs>
    
  );
}

export default InventoryPage;
