import React, { useEffect, useState } from "react";
import { Button, Table, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux'
import { getInventoryAction } from '../../redux/inventoryDucks'
import InventoryCreateModal from '../InventoryCreateModal'
import { formatDate } from '../../services/utils';

function InventoryPage() {

  const dispatch = useDispatch();
  const items = useSelector(store => store.inventory.array)
  const [showModalSingle, setShowModalSingle] = useState(false);

  useEffect(()=>{
    dispatch(getInventoryAction())
  },[dispatch, showModalSingle])

  return (
    <Row>
      <Col xs={12} className="text-center mb-4">
        <Button onClick={()=>setShowModalSingle(true)}>Agregar al inventario</Button>
      </Col>
      <Col xs={12}>
        <Table responsive striped bordered hover>
            <thead>
                <tr>
                  <th>Número inventario</th>
                  <th>Entidad</th>
                  <th>Artículo</th>
                  <th>Cantidad</th>
                  <th>Fecha</th>
                </tr>
            </thead>
            <tbody>
              {
                items.length > 0 ? 
                  items.map((inventory) => (
                  
                  <tr key={inventory.id} >
                    <td>{inventory.id}</td>
                    <td>{inventory.supplier.properties.name}</td>
                    <td>{inventory.item.name}</td>
                    <td>{inventory.quantity}</td>
                    <td>{formatDate(inventory.created_at)}</td>
                  </tr> 
                  )):
                  <tr>
                    <td colSpan="6" className="text-center">No existen Entidades</td>
                  </tr>
              }
            </tbody>
        </Table>
      </Col>
      <InventoryCreateModal showModal={showModalSingle} handleClose={()=> setShowModalSingle(false)} />
    </Row>
  )
}

export default InventoryPage;