import React, { useState, useEffect } from "react";
import { Tabs, Tab } from "react-bootstrap";
import DashboardCalendar from "../DashboardCalendar";
import DashboardTable from "../DashboardTable";
import DashboardSearch from "../DashboardSearch";
import Api from "../../services/api";
import Modal from "../Modal";

function DashboardPage() {
  const [orders, setOrders] = useState([]);
  const [tabKey, setTabKey] = useState("calendar");
  const [orderSearch, setOrderSearch] = useState({});
  const [showOrder, setShowOrder] = useState(false);
  const handleCloseOrder = () => setShowOrder(false);
  const handleShowOrder = () => setShowOrder(true);

  const [order, setOrder] = useState(null);

  const getOrders = (params) =>
    Api.getOrders(params).then((ordersList) => {
      setOrders(ordersList);
    });

  useEffect(() => {
    getOrders(orderSearch);
  }, [orderSearch]);

  useEffect(() => {
    if (order) {
      handleShowOrder();
    }
  }, [order]);

  return (
    <div>
      <DashboardSearch setSearch={setOrderSearch} />
      <Tabs activeKey={tabKey} onSelect={(keyName) => setTabKey(keyName)}>
        <Tab eventKey="calendar" title="Calendario">
          <div className="row">
            <DashboardCalendar orders={orders} setOrder={setOrder} />
          </div>
        </Tab>
        <Tab eventKey="table" title="Tabla">
          <div className="row justify-content-center">
            <DashboardTable orders={orders} setOrder={setOrder} />
          </div>
        </Tab>
      </Tabs>
      {/* TODO: Cambiar nombre de este Modal o que modal sea wrapper que dibuje un detalle de forma dinámica */}
      {order ? (
        <Modal order={order} show={showOrder} handleClose={handleCloseOrder} />
      ) : null}
    </div>
  );
}

export default DashboardPage;
