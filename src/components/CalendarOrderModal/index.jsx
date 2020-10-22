import React from 'react'
import { Badge, Modal, Button } from "react-bootstrap";
import { statusBadgesMap, formatDate } from '../../services/utils';


const CalendarOrderModal = ({ show, order, handleClose }) => {

    const detailModal = (order) =>
		order.order_requested_item.map(
			(order_requested_item, index) => (
				<ul key={index}>
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
                {/* <b>Entidad:</b> {order.entity.properties.name}  */}
                {/* <br />
                <br /> */}
                <b>Estado:</b>
                <Badge variant={statusBadgesMap[order.status]}>{order.status}</Badge>
                <br/>
                <br/>
                <b>Fecha de solicitud:</b> {formatDate(order.date)}
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

export default CalendarOrderModal
