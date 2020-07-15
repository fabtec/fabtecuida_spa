import React, { useState, useEffect } from 'react'

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Api from '../../services/api'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import esLocale from '@fullcalendar/core/locales/es'


function DashboardPage (events) {

	const [ordersList, setOrdersList] = useState([])
	const [order, setOrder] = useState(
		{
			"title": "",
			"extendedProps":{
				"quantity": 0,
				"order": { 
					"entity": {
						"name": ""
					}
				},
				"item":{
					"name": ""
				},
				"created_at": ""
			}

		}
	)
	const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleEventClick = (arg) => {
  	setOrder({"title": arg.event._def.title, "extendedProps": arg.event._def.extendedProps})
  	handleShow()
  }


	useEffect(() => {
		Api.getOrders()
			.then((ordersList_) => {
				setOrdersList(ordersList_)
			})
	}, [])

	return (
		<>			
			<FullCalendar
				plugins={[ dayGridPlugin ]}
				initialView="dayGridMonth"
				locale="esLocale"
				firstDay="1"
				events={ordersList}
				eventClick={handleEventClick}
				buttonText={{
					"today":    'Hoy',
					"month":    'Mes',
					"week":     'Semana',
					"day":      'Día',
					"list":     'Lista'
				}}
			/>

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
	        <b>Fecha de solicitud:</b> {order.extendedProps.order.created_at}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>

		</>
	)
}

export default DashboardPage
