import React, { useState, useEffect } from "react";
import { Card, Modal, Button, ListGroup, ListGroupItem, Accordion, Form, Alert } from "react-bootstrap";

import Api from "../../services/api";

export default function ({ show, item, handleClose }) {
	const [inventory, setInventory] = useState([]);
  const [isErrorPresent, setIsErrorPresent] = useState(false);
  const [itemSelected, setItemSelected] = useState([]);
  const [item_requested, setItem_requested] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();
    
    Api.setOrdersSupplied({ itemSelected, item_requested })
      .then((res) => {
        setIsErrorPresent(false);
        const { access, refresh } = res.data;
        Api.setTokens({ access, refresh });
        window.location.href = window.location.pathname;
      })
      .catch(() => {
        setIsErrorPresent(true);
      })
      .finally(() => {
        console.log("Guardado!")
      });
  };

  const renderAlert = (isError) => {
    if (!isError) return null;

    return (
      <Alert variant="danger" show={isErrorPresent}>
        Error, algo pasó :(
      </Alert>
    );
  };

  const getSuppliedInventory = () =>
    Api.getSuppliedInventory({item:item.item.id}).then((inventory) => {
      setInventory(inventory);
    });
    
  
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

  const getItemRow = (inventory) => (
      <ListGroupItem>
          <Form.Check 
              type='checkbox'
              label={`${inventory.quantity} ${inventory.item.name}`}
              id={`inline-${inventory.id}`}
              value={inventory.id}
              onChange={handleChangeClick.bind(this)}
            />
      </ListGroupItem>
    );

  useEffect(() => {
    getSuppliedInventory();
  }, []);

  return (
    <Modal size="lg" show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Solicitud - {`${item.quantity} ${item.item.name}`}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5 className="mb-4">Articulos ofrecidos</h5>
          
          {inventory.map((inventory) => (
            <Accordion defaultActiveKey="0">
            <Card className="p-0 mb-4 shadow">
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                {inventory.supplier.name}
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                <ListGroup className="list-group-flush">
                  { getItemRow(inventory)}
                </ListGroup>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
          ))}        
          
        </Modal.Body>

        <Modal.Footer>
          {renderAlert(isErrorPresent)}
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button type="submit" variant="success" onClick={handleClose}>
            Asignar
          </Button>
        </Modal.Footer>
        </Form>
    </Modal>
  );
}
