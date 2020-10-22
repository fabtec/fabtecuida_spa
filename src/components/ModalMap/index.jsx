import React, { useState, useEffect } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux'
import { getEntitiesAction } from '../../redux/entitiesDucks'
import MapLayout from "../MapLayout"

import "./ModalMap.css";

const ModalMap = (props) => {
    const [map, setMap] = useState("")
    const dispatch = useDispatch();
    const entities = useSelector(store => store.entities)
  
    useEffect(() => {
        if(props.showModal){
            setMap(<MapLayout entitiesList={entities.array} center={[-34.809, -70.044]} zoom={5}/>)
            dispatch(getEntitiesAction())  
        }
    }, [props.showModal, dispatch]);

    return (
        <Modal
            show={props.showModal}
            onHide={props.handleClose}
            dialogClassName="modal-90w modal-dialog-map"
            aria-labelledby="example-custom-modal-styling-title"
        >
            <Modal.Header closeButton>
                <Modal.Title>Mapa de entidades</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                { !entities.loading ?  map : <div className="text-center"><Spinner animation="grow" role="status" variant="info" ><span className="sr-only">Cargando Entidades...</span></Spinner></div>}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.handleClose}>
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalMap
