import React from 'react'

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default function({ show, order, handleClose }) {
  return (
    <Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>{order.title}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				Entrega de {order.extendedProps.quantity} {order.extendedProps.item.name}
				<br />
				<br />
				<b>Lugar:</b> {order.extendedProps.order.entity.name} 
				<br />
				<br />
				<b>Estado:</b> {order.extendedProps.status}
				<br/>
				<br/>
				<b>Fecha de solicitud:</b> {order.extendedProps.order.created_at}
			</Modal.Body>

			<Modal.Footer>
				<Button variant="primary" onClick={handleClose}>
					Cerrar
				</Button>
			</Modal.Footer>
		</Modal>
  )
}