import React, { useEffect, useState } from "react";
import { Button, Table, Col, Row } from "react-bootstrap";
import { formatDate } from '../../services/utils';

import { useDispatch, useSelector } from 'react-redux'
import { getEntitiesAction } from '../../redux/entitiesDucks'
import EntitiesCreateModal from '../EntitiesCreateModal'

function EntitiesPage() {

  const dispatch = useDispatch();
  const entities = useSelector(store => store.entities.array)
  const [showModalSingle, setShowModalSingle] = useState(false);

  useEffect(()=>{
    dispatch(getEntitiesAction())
  },[dispatch, showModalSingle])

  return (
    <Row>
      <Col xs={12} className="text-center mb-4">
        <Button onClick={()=>setShowModalSingle(true)}>Crear Nueva Entidad</Button>
      </Col>
      <Col xs={12}>
        <Table responsive striped bordered hover>
            <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Representante</th>
                  <th>Fecha de creación</th>
                </tr>
            </thead>
            <tbody>
              {
                entities.length > 0 ? 
                  entities.map((entity) => (
                  <tr key={entity.id} >
                    <td>{entity.properties.name}</td>
                    <td>
                    {entity.properties.manager.map((manager)=>(
                      <p key={manager.id}>{manager.first_name} {manager.last_name}</p>
                    ))}
                    </td>
                    <td>{formatDate(entity.properties.created_at)}</td>
                  </tr> 
                  )):
                  <tr>
                    <td colSpan="3" className="text-center">No existen Entidades</td>
                  </tr>
              }
            </tbody>
        </Table>
      </Col>
      <EntitiesCreateModal showModal={showModalSingle} handleClose={()=> setShowModalSingle(false)} />
    </Row>
  )
}

export default EntitiesPage;
