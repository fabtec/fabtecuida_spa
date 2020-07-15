import React, { useState, useEffect } from 'react'
import { Alert } from 'tabler-react'
import Api from '../../services/api'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import esLocale from '@fullcalendar/core/locales/es'




function DashboardPage (events) {

  const [ordersList, setOrdersList] = useState([])

  useEffect(() => {
    Api.getOrders()
      .then((ordersList_) => {
        setOrdersList(ordersList_)
      })
  }, [])

  return (
    <>
      <Alert type='success'>
        En Dashboard!
      </Alert>
      
      <FullCalendar
        plugins={[ dayGridPlugin ]}
        initialView="dayGridMonth"
        locale="esLocale"
        firstDay="1"
        buttonText={{
            "today":    'Hoy',
            "month":    'Mes',
            "week":     'Semana',
            "day":      'Día',
            "list":     'Lista'
            }}
        events={ordersList}
      />
    </>
  )
}


export default DashboardPage
