import React, { useState, useEffect } from "react";
import { Card, Modal, Button, ListGroup, Accordion } from "react-bootstrap";

import Api from "../../services/api";

export default function ({ show, item, handleClose }) {
	const [orders, setOrders] = useState([]);
	const [itemSelected, setItemSelected] = useState(null);

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
      <div className="row order-item">
        <div className="col-sm-4">{`${item.quantity} ${item.item.name}`}</div>
        <div className="col-sm-4">
					<Button onClick={() => handleAssign(item, order)}>
						Seleccionar
          </Button>
        </div>
      </div>
    ));

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Asignar Item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Card>
          <b>Item:</b> {`${item.quantity} ${item.item.name}`}
        </Card>
				<Card>
          <b>Item Asignado:</b> 
					{ itemSelected && `${itemSelected.quantity} ${itemSelected.item.name} de ${itemSelected.entity.name}`}
        </Card>
        <Accordion defaultActiveKey="list-open">
          <h3>Seleccione </h3>
          <Accordion.Toggle as={Button} variant="link" eventKey="list-open">
            colapsar
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="list-open">
            <h3>Items ofrecidos</h3>
						<ListGroup className="col-sm-12">
              {orders.map((order) => (
                <ListGroup.Item>
                  {order.entity.name}
                  {getItemRow(order)}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Accordion.Collapse>
        </Accordion>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
				<Button variant="success" onClick={handleClose}>
          Asignar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
