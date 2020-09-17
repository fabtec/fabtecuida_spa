import React, { Fragment, useState } from "react";
import { Table, Badge, Button } from "react-bootstrap";

import { statusBadgesMap, formatDate } from '../../services/utils';
import ModalMap from '../ModalMap';
import "./DashboardTable.css";

function DashboardTable({ orders = [], setOrder }) {
  const [showModal, setShowModal] = useState(false);

  const createRows = () =>
    orders.map((order, index) => (
      <tr
        key={order.id}
        
      >
        <td className="text-center">
          <button
            className="btn btn-success"
            onClick={() => setOrder(order)}>
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
      <Button variant="primary" className="mb-4" onClick={()=>setShowModal(true)}>
          Mostrar Mapa
      </Button>
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
      <ModalMap showModal={showModal} handleClose={()=> setShowModal(false)} />
      
    </Fragment>
  );
}

export default DashboardTable;
