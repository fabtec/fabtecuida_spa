import React, { useState, useEffect } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";

import Api from "../../services/api";
import MapLayout from "../MapLayout"

import "./ModalMap.css";

function ModalMap(props) {
  
    const [entitiesList, setEntitiesList] = useState([]);

    useEffect(() => {
        if(props.showModal){
            Api.getEntities()
            .then((entitiesList) => {
                setEntitiesList(entitiesList)
            })
        }else{
            setEntitiesList([])
        }
    }, [props.showModal]);

    return (
        <Modal
            show={props.showModal}
            onHide={props.handleClose}
            dialogClassName="modal-90w"
            aria-labelledby="example-custom-modal-styling-title"
        >
            <Modal.Header closeButton>
                <Modal.Title>Mapa de entidades</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {entitiesList.length > 0 ? <MapLayout entitiesList={entitiesList} center={[-34.809, -70.044]} zoom={5}/>  :<div className="text-center"><Spinner animation="grow" role="status" variant="info" ><span className="sr-only">Cargando Entidades...</span></Spinner></div>}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.handleClose}>
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalMap;