import React from 'react'
import { Alert } from 'tabler-react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

function DashboardPage () {
  return (
    <>
      <Alert type='success'>
        En Dashboard!
      </Alert>
      
      <FullCalendar
        plugins={[ dayGridPlugin ]}
        initialView="dayGridMonth"
      />
    </>
  )
}

export default DashboardPage
