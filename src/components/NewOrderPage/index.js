import React, { useState, useEffect } from 'react'
import * as R from 'ramda'
import { Row, Form, Button, Card } from 'react-bootstrap';
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
  }

  return (
    <div class="row justify-content-center">
       <Card body className="col-12 col-md-6 shadow">

        <Form>
          <Form.Group controlId="entity">
            <Form.Label>Tu Entidad</Form.Label>
            <EntitiesSelector
                  list={entitiesList}
                  value={selectedEntity}
                  onChange={onSelectedEntityChange}
                />
          </Form.Group>

          <Button className="shadow" block variant="primary" type="submit">
          Enviar
          </Button>
        </Form>
      </Card>
    </div>
  )
}

function EntitiesSelector ({ list, value, onChange }) {
  let entities = [
    <option key={0} value={0}>---</option>
  ]

  entities = R.concat(entities, R.map((e) => {
    return (
      <option key={e.id} value={e.id}>
        {e.name}
      </option>
    )
  })(list))

  return (
    <Form.Control as="select" value={value} onChange={onChange}>
      {entities}
    </Form.Control>
  )
}

export default NewOrderPage
