import React, { useState, useEffect } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux'
import MapLayout from "../MapLayout";
import { getEntity } from '../../redux/entitiesDucks'

import "./EntityMapModal.css";

const EntityMapModal = (props) => {
    // const [entity_tmp, setEntity] = useState(null);
    const [coordinates, SetCoordinates]  = useState([-34.809, -70.044])
    const dispatch =  useDispatch()

    const entity = useSelector(store => store.entity)

    useEffect(() => {
        if(props.showModal){        
            dispatch(getEntity(props.idEntity))
        }

    }, [props.showModal, dispatch]);

    useEffect(()=>{
        // console.log(entity)
        if (entity.geometry)
            SetCoordinates([entity.geometry.coordinates[1], entity.geometry.coordinates[0]])
    },[entity])

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
                {entity.id != null ? <MapLayout entitiesList={[entity]} center={coordinates} zoom={17}/>  :<div className="text-center"><Spinner animation="grow" role="status" variant="info" ><span className="sr-only">Cargando Entidades...</span></Spinner></div>}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.handleClose}>
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default EntityMapModal
