import React, { useState, useEffect } from "react";
import { Tabs, Tab, ListGroup, Button } from "react-bootstrap";

import Api from "../../services/api";
import MatchStockModal from "../MatchStockModal";

import './MatchStockPage.css';

function MatchStockPage() {
  const [orders, setOrders] = useState([]);
  const [tabKey, setTabKey] = useState("pending");
  const [itemSelected, setItemSelected] = useState(null);
  const [showItem, setShowItem] = useState(false);
  const handleCloseModal = () => setShowItem(false);
  const handleShowModal = () => setShowItem(true);

  const getOrders = () =>
    Api.getRequestedOrders()
      .then((ordersList) => {
        setOrders(ordersList);
      });
  const handleAssign = (item) => {
    setItemSelected(item);
    handleShowModal();
  }
  const getItemRow = (order) => order.order_requested_item
    .map((item) => (
      <div className="row order-item">
        <div className="col-sm-4">
          {`${item.quantity} ${item.item.name}`}
        </div>
        <div className="col-sm-4">
          <Button onClick={() => handleAssign(item)}>Asignar</Button>
        </div>
      </div>
    ));

  useEffect(() => {
    getOrders();
  }, []);


  return (
    <div>
      <Tabs activeKey={tabKey} onSelect={(keyName) => setTabKey(keyName)}>
        <Tab eventKey="pending" title="Pendientes">
          <div className="row">
            <h3>Items Solicitados</h3>
            <ListGroup className="col-sm-12">
              {orders
                .map((order) =>
                  <ListGroup.Item>{order.entity.name}
                    { getItemRow(order)}
                  </ListGroup.Item>
                )
              }
            </ListGroup>
          </div>
          {itemSelected ? (
            <MatchStockModal item={itemSelected} show={showItem} handleClose={handleCloseModal} />
          ) : null}
        </Tab>
        <Tab eventKey="completed" title="Completadas">
          <div className="row justify-content-center">
              {orders
                .map((order) =>
                  <ListGroup.Item>{order.entity.name}
                    <ListGroup.Item>100 mascarillas</ListGroup.Item>
                    <ListGroup.Item>200 mascarillas</ListGroup.Item>
                  </ListGroup.Item>
                )
              }
          </div>
        </Tab>
      </Tabs>
    </div>
  );
}

export default MatchStockPage;
