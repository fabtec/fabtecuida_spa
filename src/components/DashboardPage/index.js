import React from 'react'
import { Alert } from 'tabler-react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import esLocale from '@fullcalendar/core/locales/es';/**/



function DashboardPage (events) {
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
        events={[
          { title: 'event 1', date: '2020-07-06' },
          { title: 'event 2', date: '2020-07-20' }
        ]}
      />
    </>
  )
}


export default DashboardPage
