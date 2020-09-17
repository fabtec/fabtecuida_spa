import React, { Fragment, useState } from "react";
import { Table, Badge, Button } from "react-bootstrap";

import { statusBadgesMap, formatDate } from '../../services/utils';
import ModalMap from '../ModalMap';
import EntityMapModal from '../EntityMapModal';
import "./DashboardTable.css";

function DashboardTable({ orders = [], setOrder }) {
  const [showModal, setShowModal] = useState(false);
  const [showModalSingle, setShowModalSingle] = useState(false);
  const [idEntity, setIdEntity] = useState(0);
  
  const createRows = () =>
    orders.map((order, index) => (
      <tr
        key={order.id}
        
      >
        <td className="text-center">
          <Button
            variant="success"
            onClick={() => setOrder(order)}>
              Ver más detalles
          </Button>
          <Button 
            variant="danger"
            onClick={()=>{
              setIdEntity(order.entity.id);
              setShowModalSingle(true);
            }}>
              Mostrar Ubicación
          </Button>
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
      <EntityMapModal showModal={showModalSingle} idEntity={idEntity} handleClose={()=> setShowModalSingle(false)} />
    </Fragment>
  );
}

export default DashboardTable;
