import React from 'react'

import { Badge, Modal, Button } from "react-bootstrap";
import { statusBadgesMap } from '../../services/utils';

export default function({ show, order, handleClose }) {

	const detailModal = (order) =>
		order.order_requested_item.map(
			(order_requested_item, index) => (
				<ul>
					<li><b>{order_requested_item.item.name}:</b> {order_requested_item.quantity}</li>
				</ul>
			)
		);
	
  return (
    <Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>{order.title}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<b>Entidad:</b> {order.entity.name} 
				<br />
				<br />
				<b>Estado:</b>
				<Badge variant={statusBadgesMap[order.status]}>{order.status}</Badge>
				<br/>
				<br/>
				<b>Fecha de solicitud:</b> {order.date}
				<br/>
				<br/>
				<b>Productos Solicitados</b>
				<br/>
				{detailModal(order)}
				
			</Modal.Body>

			<Modal.Footer>
				<Button variant="primary" onClick={handleClose}>
					Cerrar
				</Button>
			</Modal.Footer>
		</Modal>
  )
}