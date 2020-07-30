import React, { useState, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import '@fullcalendar/core/locales/es';

import Api from '../../services/api'
import Modal from '../Modal';

function DashboardPage () {
	const [ordersList, setOrdersList] = useState([])
	const [showOrder, setShowOrder] = useState(false);
	const handleCloseOrder = () => setShowOrder(false);
	const handleShowOrder = () => setShowOrder(true);

	const handleSelectOrder = (arg) => {
		setOrder({
			"title": arg.event._def.title,
			"extendedProps": arg.event._def.extendedProps
		});
		handleShowOrder();
	}

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
				"status": "",
				"item":{
					"name": ""
				},
				"created_at": ""
			}
		}
	)


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
				eventClick={handleSelectOrder}
				buttonText={{
					"today":    'Hoy',
					"month":    'Mes',
					"week":     'Semana',
					"day":      'Día',
					"list":     'Lista'
				}}
			/>
			<Modal
				order={order}
				show={showOrder}
				handleClose={handleCloseOrder}
			/>
		</>
	)
}

export default DashboardPage
