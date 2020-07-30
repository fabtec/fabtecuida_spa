import React, { useState, Fragment } from "react";
import { Table } from "react-bootstrap";

import "./DashboardTable.css";

function DashboardTable({ orders = [], setOrder }) {

  const createRows = () =>
    orders.map((order, index) => (
      <tr
        key={order.id}
        onClick={() => setOrder(order)}
      >
        <td>{index + 1}</td>
        <td>{order.date}</td>
        <td>{order.status}</td>
        <td>{order.entity.name}</td>
      </tr>
    ));

  return (
    <Fragment>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Fecha</th>
            <th>Estado</th>
            <th>Entidad</th>
          </tr>
        </thead>
        <tbody>{createRows()}</tbody>
      </Table>
    </Fragment>
  );
}

export default DashboardTable;
