import React, { Fragment, useState, useEffect } from "react";
import { Table, Badge, Button, Modal } from "react-bootstrap";

import Api from "../../services/api";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";

import { statusBadgesMap, formatDate } from '../../services/utils';

import "./DashboardTable.css";

function DashboardTable({ orders = [], setOrder }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [entitiesList, setEntitiesList] = useState([]);

  useEffect(() => {
    Api.getEntities()
    .then((entitiesList) => {
        setEntitiesList(entitiesList)
    })

  }, []);

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
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
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

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Map center={[45.4, -75.7]} zoom={12}>
            <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            {entitiesList.map(entity => (
            <Marker
                key={entity.id}
                position={[
                entity.location.coordinates[1], 
                entity.location.coordinates[0]]
                }
                >
                <Popup>{entity.name}</Popup>
                </Marker>
            ))}
        </Map>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

    </Fragment>
  );
}

export default DashboardTable;
