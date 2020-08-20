import React, { useState, Fragment } from "react";
import { Table, Badge } from "react-bootstrap";

import { statusBadgesMap } from '../../services/utils';
import "./InventoryTable.css";

function InventoryTable({ suppliers = [], setSupplier }) {
  const createRows = () =>
    suppliers.map((supplier, index) => (
      <tr
        key={supplier.id}
      >
        <td class="text-center">
          <button
            class="btn btn-success"
            onClick={() => setSupplier(supplier)}
          >Ver más detalles</button>
        </td>
        <td>{index + 1}</td>
        <td>{supplier.supplier.name}</td>
        <td>{supplier.quantity}</td>
        <td>
          <Badge variant={statusBadgesMap[supplier.status]}>{supplier.status}</Badge>
        </td>
        <td>{supplier.date}</td>
      </tr>
    ));

  return (
    <Fragment>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th></th>
            <th>Número inventario</th>
            <th>Entidad</th>
            <th>Estado</th>
            <th>Cantidad</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>{createRows()}</tbody>
      </Table>
    </Fragment>
  );
}

export default InventoryTable;
