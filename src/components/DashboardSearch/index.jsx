import React, { useState, useEffect } from 'react'
import { Form, InputGroup, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getOrdersAction } from '../../redux/ordersDucks'
import { getEntitiesAction } from '../../redux/entitiesDucks'

const DashboardSearch = () => {

    const dispatch = useDispatch()
    const entities = useSelector(store => store.entities.array)

    useEffect(() => {
        dispatch(getEntitiesAction())
    }, [dispatch])

    const [formValue, setFormValue] = useState({
        entity: '',
        status: '',
        type: '',
    });

    const handleSelectEntity = (event) =>{
        setFormValue({
            ...formValue,
            entity: event.target.value,
        });
    }

    const handleSelectStatus = (event) =>{
        setFormValue({
            ...formValue,
            status: event.target.value,
        });
    }

    const onSearch = (event) => {
        event.preventDefault();
        dispatch(getOrdersAction(formValue));
    };

    return (
        <Form inline onSubmit={onSearch} className="search-form">
            <InputGroup>
                <Form.Label htmlFor="status">Estado</Form.Label>
                <Form.Control
                as="select"
                className="mx-sm-2"
                id="status"
                custom
                onChange={handleSelectStatus}
                >
                    <option value="">Elegir...</option>
                    <option value="PENDING">Pendiente</option>
                    <option value="INPROGRESS">En progreso</option>
                    <option value="DONE">Completadas</option>
                </Form.Control>
            </InputGroup>

            <Form.Label htmlFor="entity">Entidad</Form.Label>
            <Form.Control
                as="select"
                className="mx-sm-2"
                id="entity"
                onChange={handleSelectEntity}
            >
                <option value="">Elegir...</option>
                {entities.map((entity)=>(
                    <option key={entity.id} value={entity.id}>{entity.properties.name}</option>
                ))}
            </Form.Control>
            <Button type="submit">Buscar</Button>
        </Form>
    )
}

export default DashboardSearch
