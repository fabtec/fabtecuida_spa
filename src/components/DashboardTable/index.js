import React, { Fragment } from "react";
import { Table, Badge } from "react-bootstrap";

import { statusBadgesMap, formatDate } from '../../services/utils';
import "./DashboardTable.css";

function DashboardTable({ orders = [], setInventory }) {

  const createRows = () =>
    orders.map((order, index) => (
      <tr
        key={order.id}
        
      >
        <td className="text-center">
          <button
            className="btn btn-success"
            onClick={() => setInventory(order)}>
              Ver más detalles
          </button>
        </td>
        <td>{index + 1}</td>
        <td>{order.entity.name}</td>
        <td>
          <Badge variant={statusBadgesMap[order.status]}>{order.status}</Badge>
        </td>
        <td>{formatDate(order.date)}</td>
        
        
      </tr>
    ));

  return (
    <Fragment>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th></th>
            <th>Número orden</th>
            <th>Entidad</th>
            <th>Estado</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>{createRows()}</tbody>
      </Table>
    </Fragment>
  );
}

export default DashboardTable;
