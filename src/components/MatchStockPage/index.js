import React, { useState, useEffect } from "react";
import { Tabs, Tab, ListGroup,ListGroupItem, Button, Card } from "react-bootstrap";

import Api from "../../services/api";
import MatchStockModal from "../MatchStockModal";

import './MatchStockPage.css';

function MatchStockPage() {
  const [ordersPending, setOrdersPending] = useState([]);
  const [ordersInProgress, setOrdersInProgress] = useState([]);
  const [ordersDone, setOrdersDone] = useState([]);
  const [tabKey, setTabKey] = useState("pending");
  const [itemSelected, setItemSelected] = useState(null);
  const [showItem, setShowItem] = useState(false);
  const handleCloseModal = () => setShowItem(false);
  const handleShowModal = () => setShowItem(true);

  const getOrdersPending = () =>
  Api.getOrders({status:"PENDING"})
  .then((ordersList) => {
    setOrdersPending(ordersList);
  });

  const getOrdersInProgress = () =>
  Api.getOrders({status:"INPROGRESS"})
  .then((ordersList) => {
    setOrdersInProgress(ordersList);
  });

  const getOrdersDone = () =>
  Api.getOrders({status:"DONE"})
  .then((ordersList) => {
    setOrdersDone(ordersList);
  });

  const handleAssign = (item) => {
    setItemSelected(item);
    handleShowModal();
  }

  const handleComplete = (item_) => {
    //UPDATEAR ITEM SUPPLIED STATUS A DONE
    
    let order_supplied_id = item_.id;
    let params = {"status": "DONE"}
    Api.PutOrdersSupplied(order_supplied_id, params).then((res)=>{
      console.log(res);
      console.log("ACTUALIZADO");
    })
  }
  
  const getItemRow = (order) => order.order_requested_item
    .map((item, index) => (
      <ListGroupItem key={index}>
       <div className="row order-item">
        <div className="col-sm-4">
          {`${item.quantity} ${item.item.name}`}
        </div>
        <div className="col-sm-4">
          <Button onClick={() => handleAssign(item)}>Asignar</Button>
        </div>
      </div>
      </ListGroupItem>
    ));
  
    const getItemRowProgress = (order) => order.order_supplied_item
    .map((item) => (
      <ListGroupItem>
       <div className="row order-item">
        <div className="col-sm-6">
          {`${item.quantity} ${item.item.name} en camino desde`} <b>{item.supplier.name}</b>
        </div>
        <div className="col-sm-6">
          <Button onClick={() => handleComplete(item)} disabled={item.status == "DONE"}>Completar</Button>
        </div>
      </div>
      </ListGroupItem>
    ));

    const getItemRowDone = (order) => order.order_supplied_item
    .map((item) => (
      <ListGroupItem>
       <div className="row order-item">
        <div className="col-sm-12">
        {`${item.quantity} ${item.item.name} suministrado por`} <b>{item.supplier.name}</b>
        </div>
      </div>
      </ListGroupItem>
    ));

    

  useEffect(() => {
    getOrdersPending();
    getOrdersInProgress();
    getOrdersDone();
  }, []);


  return (
    <div>
      <Tabs activeKey={tabKey} onSelect={(keyName) => setTabKey(keyName)}>
        <Tab eventKey="pending" title="Pendientes">
          <div className="row">
          {ordersPending
              .map((order) =>
              <Card className="col-12 p-0 mb-4 shadow">
                <Card.Header as="h5">{order.entity.name}</Card.Header>
                <ListGroup className="list-group-flush">
                  { getItemRow(order)}
                </ListGroup>
              </Card>)
            }
          </div>
          {itemSelected ? (
            <MatchStockModal
              item={itemSelected}
              show={showItem}
              handleClose={handleCloseModal} />
          ) : null}
        </Tab>
        <Tab eventKey="inprogress" title="En Progreso">
          <div className="row justify-content-center">
              {ordersInProgress
                .map((order) =>
                <Card className="col-12 p-0 mb-4 shadow">
                <Card.Header as="h5">{order.entity.name}</Card.Header>
                <ListGroup className="list-group-flush">
                  { getItemRowProgress(order)}
                </ListGroup>
              </Card>
                )
              }
          </div>
        </Tab>
        
        <Tab eventKey="completed" title="Completadas">
          <div className="row justify-content-center">
              {ordersDone
                .map((order) =>
                <Card className="col-12 p-0 mb-4 shadow">
                <Card.Header as="h5">{order.entity.name}</Card.Header>
                <ListGroup className="list-group-flush">
                  { getItemRowDone(order)}
                </ListGroup>
              </Card>
                )
              }
          </div>
        </Tab>
      </Tabs>
    </div>
  );
}

export default MatchStockPage;
