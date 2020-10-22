import React, { Fragment, useEffect, useState } from 'react'
import { Table, Badge, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { faInfoCircle, faMapMarkedAlt, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { statusBadgesMap, formatDate } from '../../services/utils';
import { getOrdersAction } from '../../redux/ordersDucks'
import CalendarOrderModal from '../CalendarOrderModal';
import ModalMap from '../ModalMap';
import EntityMapModal from '../EntityMapModal';

const DashboardTable = () => {
    const [showOrder, setShowOrder] = useState(false)
    const [showModal, setShowModal] = useState(false);
    const [showModalSingle, setShowModalSingle] = useState(false);
    const [order, setOrder] = useState(null)
    const [idEntity, setIdEntity] = useState(0);
    const dispatch = useDispatch();
    const orders = useSelector(store => store.orders)

    useEffect(()=>{
        dispatch(getOrdersAction())
    },[dispatch])
  
  return (
    <Fragment>
        <Button variant="primary" className="mb-4" onClick={()=>setShowModal(true)}>
            Mostrar Mapa <FontAwesomeIcon icon={faMapMarkedAlt} />
        </Button>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th></th>
                    <th>Número orden</th>
                    <th>Entidad</th>
                    <th>Estado</th>
                    <th>Fecha</th>
                </tr>
            </thead>
            <tbody>{orders.array.map((order, index) => (
                <tr key={order.id} >
                    <td className="text-center">
                        <Button
                            className="mr-2"
                            variant="success"
                            onClick={() => {
                            setOrder(order)
                            setShowOrder(true)
                            }}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                        </Button>
                        <Button 
                            variant="danger"
                            onClick={()=>{
                            setIdEntity(order.entity.id);
                            setShowModalSingle(true);
                            }}>
                            <FontAwesomeIcon icon={faMapMarkerAlt} />
                        </Button>
                    </td>
                    <td>{index + 1}</td>
                    <td>{order.entity.properties.name}</td>
                    <td>
                        <Badge variant={statusBadgesMap[order.status]}>{order.status}</Badge>
                    </td>
                    <td>{formatDate(order.date)}</td>
                </tr>
            ))}
            </tbody>
        </Table>
        { order ? <CalendarOrderModal order={order} show={showOrder} handleClose={()=> setShowOrder(false)} /> : null }
        <ModalMap showModal={showModal} handleClose={()=> setShowModal(false)} />
        <EntityMapModal showModal={showModalSingle} idEntity={idEntity} handleClose={()=> setShowModalSingle(false)} />
    </Fragment>
  );
}

export default DashboardTable
