import React, { useState, useEffect } from "react";
import { Card, Modal, Button, ListGroup, ListGroupItem, Accordion, Form, Alert } from "react-bootstrap";

import Api from "../../services/api";

export default function ({ show, item, handleClose }) {
	const [orders, setOrders] = useState([]);
  const [isErrorPresent, setIsErrorPresent] = useState(false);
  const [itemSelected, setItemSelected] = useState("");
  const handleChangeUsername = (event) => setItemSelected(event.target.value);
  
  
  const handleSubmit = (event) => {
    event.preventDefault();
    /* setIsPerformingLogin(true);

    Api.loginUser({ username, password })
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
        setIsPerformingLogin(false);
      }); */
  };

  const renderAlert = (isError) => {
    if (!isError) return null;

    return (
      <Alert variant="danger" show={isErrorPresent}>
        Error, algo pasó :(
      </Alert>
    );
  };

  const getOrders = () =>
    Api.getSuppliedOrders().then((ordersList) => {
      setOrders(ordersList);
    });
    
	const handleAssign = (item, order) => {
		setItemSelected({
			...item,
			entity: order.entity,
		});
	};

  const getItemRow = (order) =>
    order.order_supplied_item.map((item) => (
      <ListGroupItem>
          <Form.Check 
              type='checkbox'
              label={`${item.quantity} ${item.item.name}`}
              id={`inline-${item.id}`}
            />
      </ListGroupItem>
    ));

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <Modal size="lg" show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Solicitud - {`${item.quantity} ${item.item.name}`}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5 className="mb-4">Articulos ofrecidos</h5>
          
          {orders.map((order) => (
            <Accordion defaultActiveKey="0">
            <Card className="p-0 mb-4 shadow">
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                {order.entity.name}
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                <ListGroup className="list-group-flush">
                  { getItemRow(order)}
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
          <Button variant="success" onClick={handleClose}>
            Asignar
          </Button>
        </Modal.Footer>
        </Form>
    </Modal>
  );
}
