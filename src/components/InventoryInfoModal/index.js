import React from 'react'

import { Modal, Button } from "react-bootstrap";
import { formatDate } from '../../services/utils';

export default function({ show, inventory, handleClose }) {
  return (
    <Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>{inventory.item.name}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<b>Provisto por:</b> {inventory.supplier.name} 
				<br />
				<br />
				<b>Cantidad:</b> {inventory.quantity}
				<br/>
				<br/>
				<b>Fecha:</b> {formatDate(inventory.created_at)}
				<br/>
				<br/>				
			</Modal.Body>

			<Modal.Footer>
				<Button variant="primary" onClick={handleClose}>
					Cerrar
				</Button>
			</Modal.Footer>
		</Modal>
  )
}