import React, { useState, useEffect } from "react";
import { Tabs, Tab, ListGroup } from "react-bootstrap";

import Api from "../../services/api";

function MatchStockPage() {
  const [orders, setOrders] = useState([]);
  const [tabKey, setTabKey] = useState("pending");

  const getOrders = () =>
    Api.getOrders()
      .then((ordersList) => {
        setOrders(ordersList);
      });

  useEffect(() => {
    getOrders();
  }, []);


  return (
    <div>
      <Tabs activeKey={tabKey} onSelect={(keyName) => setTabKey(keyName)}>
        <Tab eventKey="pending" title="Pendientes">
          <div className="row">
            <ListGroup>
              {orders
                .map((order) =>
                  <ListGroup.Item>{order.entity.name}
                    <ListGroup.Item>100 mascarillas</ListGroup.Item>
                    <ListGroup.Item>200 mascarillas</ListGroup.Item>
                  </ListGroup.Item>
                )
              }
            </ListGroup>
          </div>
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
