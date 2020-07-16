import React, { useState, useEffect } from 'react'
import * as R from 'ramda'
import { Form, Button, Card } from 'react-bootstrap';
import Api from '../../services/api'

function NewOrderPage () {
  const [entitiesList, setEntitiesList] = useState([])
  const [selectedEntity, setSelectedEntity] = useState(0)

  useEffect(() => {
    Api.getEntities()
      .then((entitiesList) => {
        setEntitiesList(entitiesList)
      })
  }, [])

  const onSelectedEntityChange = (event) => {
    setSelectedEntity(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    Api.createOrder({
      entity: selectedEntity
    })
      .then((res) => {
        console.log('res', res)
      })
  };

  const entitiesOptions = entitiesList
    .map((entity) => (
      <option key={entity.id} value={entity.id}>
        {entity.name}
      </option>)
    );

  return (
    <div className="row justify-content-center">
       <Card body className="col-12 col-md-6 shadow">

        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="manager">
            <Form.Label>Representante</Form.Label>
            <Form.Control type="text" placeholder="Escribe un nombre" />
          </Form.Group>

          <Form.Group controlId="entity">
            <Form.Label>Entidad</Form.Label>
            <Form.Control
              as="select"
              value={selectedEntity}
              onChange={onSelectedEntityChange}
            >
              <option key={0} value={0}>---</option>
              { entitiesOptions }
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="item">
            <Form.Label>Insumo</Form.Label>
            <Form.Control as="select">
              <option>---</option>
              <option>Mascarillas</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="quantity">
            <Form.Label>Cantidad</Form.Label>
            <Form.Control type="number" placeholder="Ingresa la cantidad de insumos" />
          </Form.Group>

          <Button className="shadow" block variant="primary" type="submit">
            Enviar
          </Button>
        </Form>
      </Card>
    </div>
  )
}

export default NewOrderPage
