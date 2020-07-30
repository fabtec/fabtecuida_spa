import React, { useState, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import '@fullcalendar/core/locales/es';
import './DashboardCalendar.css';

function DashboardCalendar ({ orders = [], setOrder }) {
	const handleSelectOrder = (arg) => {
		setOrder({
			...arg.event._def.extendedProps,
			title: arg.event.title,
			// TODO: check ISO String
			date: arg.event.start.toISOString()
		});
	}
	return (
		<>			
			<FullCalendar
				plugins={[ dayGridPlugin ]}
				initialView="dayGridMonth"
				locale="esLocale"
				firstDay="1"
				events={orders}
				eventClick={handleSelectOrder}
				buttonText={{
					"today":    'Hoy',
					"month":    'Mes',
					"week":     'Semana',
					"day":      'Día',
					"list":     'Lista'
				}}
			/>
		</>
	)
}

export default DashboardCalendar;
