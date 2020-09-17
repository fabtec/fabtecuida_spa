import React, { useState, useEffect } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";

import Api from "../../services/api";
import MapLayout from "../MapLayout"

import "./EntityMapModal.css";

function EntityMapModal(props) {
  
    const [entity, setEntity] = useState({});
    const [coordinates, SetCoordinates]  = useState([-34.809, -70.044])

    useEffect(() => {
        if(props.showModal){
            Api.getEntity(props.idEntity)
            .then((entity) => {
                SetCoordinates([entity.location.coordinates[1], entity.location.coordinates[0]])
                setEntity(entity)
            })
        }else{
            setEntity()
        }
    }, [props.showModal]);

    return (
        <Modal
            show={props.showModal}
            onHide={props.handleClose}
            dialogClassName="modal-90w modal-dialog-map"
            aria-labelledby="example-custom-modal-styling-title"
        >
            <Modal.Header closeButton>
                <Modal.Title>{entity != null ? entity.name : ""}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {entity != null ? <MapLayout entitiesList={[entity]} center={coordinates} zoom={17}/>  :<div className="text-center"><Spinner animation="grow" role="status" variant="info" ><span className="sr-only">Cargando Entidades...</span></Spinner></div>}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.handleClose}>
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default EntityMapModal;