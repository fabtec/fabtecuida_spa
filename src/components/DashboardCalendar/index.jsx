import React,{ useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BeatLoader from 'react-spinners/BeatLoader'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import '@fullcalendar/core/locales/es'
import './DashboardCalendar.css'
import { getOrdersAction } from '../../redux/ordersDucks'
import CalendarOrderModal from '../CalendarOrderModal' 

const DashboardCalendar = () => {

    const [showOrder, setShowOrder] = useState(false)
    const [order, setOrder] = useState(null)

    const dispatch = useDispatch();
    const orders = useSelector(store => store.orders)

    useEffect(()=>{
        dispatch(getOrdersAction())
    },[dispatch])

    const handleSelectOrder = (arg) => {		
		setOrder({
			...arg.event._def.extendedProps,
			title: arg.event.title,
			// TODO: check ISO String
			date: arg.event.start.toISOString()
        });
        setShowOrder(true)
	}

    return (
        <div>
            {orders.loading ? 
            <div className="text-center"> 
                <BeatLoader
                    size={20}
                    margin={6}
                    color='#24426c'
                    loading={orders.loading}
                />
                <p>Cargando...</p>
            </div>
            :
            <FullCalendar
				plugins={[ dayGridPlugin ]}
				initialView="dayGridMonth"
				locale="esLocale"
				firstDay="1"
                events={orders.array}
				eventClick={handleSelectOrder}
				buttonText={{
					"today":    'Hoy',
					"month":    'Mes',
					"week":     'Semana',
					"day":      'Día',
					"list":     'Lista'
				}}
			/>}
            { order ? <CalendarOrderModal order={order} show={showOrder} handleClose={()=> setShowOrder(false)} /> : null }
        </div>
    )
}

export default DashboardCalendar
