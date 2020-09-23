import React, { Fragment } from "react";
import { Table } from "react-bootstrap";

import { formatDate } from '../../services/utils';
import "./InventoryTable.css";

function InventoryTable({ suppliers = [], setInventory }) {
  const createRows = () =>
    suppliers.map((supplier, index) => (
      <tr
        key={supplier.id}
      >
        <td className="text-center">
          <button
            className="btn btn-success"
            onClick={() => setInventory(supplier)}
          >Ver más detalles</button>
        </td>
        <td>{index + 1}</td>
        <td>{supplier.supplier.name}</td>
        <td>{supplier.quantity}</td>
        <td>{formatDate(supplier.created_at)}</td>
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
