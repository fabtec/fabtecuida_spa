import React, { useState, useEffect } from 'react'
import * as R from 'ramda'
import { Row, Form, Button } from 'react-bootstrap';
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
    <Form onSubmit={handleSubmit}>
      <fieldset>
        <Form.Group as={Row}>
          <Form.Label as="legend" column sm={2}>
            Nueva Solicitud
          </Form.Label>

          <EntitiesSelector
            list={entitiesList}
            value={selectedEntity}
            onChange={onSelectedEntityChange}
          />
        
          <Button block color='primary' type='submit'>
            Submit
          </Button>
        </Form.Group>
      </fieldset>
    </Form>
    // <Grid.Row cards alignItems='center'>
    //   <Grid.Col>
    //     <Card>
    //       <Card.Header>
    //         <Card.Title>Nueva Solicitud</Card.Title>
    //       </Card.Header>
    //       <Card.Body>

    //         <Form onSubmit={handleSubmit}>
    //           <Form.Group>
    //             <EntitiesSelector list={entitiesList} value={selectedEntity} onChange={onSelectedEntityChange} />

    //             <Button block color='primary' type='submit'>
    //               Submit
    //             </Button>
    //           </Form.Group>
    //         </Form>

    //       </Card.Body>
    //     </Card>
    //   </Grid.Col>
    // </Grid.Row>
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
    <Form.Control as="select" label='Tu Entidad' value={value} onChange={onChange}>
      {entities}
    </Form.Control>
  )
}

export default NewOrderPage
