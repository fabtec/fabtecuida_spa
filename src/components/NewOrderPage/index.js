import React, { useState, useEffect } from 'react'
import { Alert, Form, Button, Card, Row, Col } from 'react-bootstrap';
import Api from '../../services/api'

import './NewOrderPage.css';

function NewOrderPage () {
  const [usersList, setusersList] = useState([]);
  const [entitiesList, setEntitiesList] = useState([]);
  const [selectedEntity, setSelectedEntity] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [itemList, setItemList ]= useState([]);
  const [itemsRequested, setItemsRequested ]= useState([]);
  const [keyItems, setKeyItems] = useState(0)

  useEffect(() => {
    Api.getEntities()
      .then((entitiesList) => {
        setEntitiesList(entitiesList)
      })

    Api.getItems()
      .then((itemList) => {
        setItemList(itemList)
      })

    Api.getUsers()
      .then((usersList) => {
        setusersList(usersList)
      })
  }, [])

  const onSelectedEntityChange = (event) => {
    setSelectedEntity(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    let data_json = []
    for(let i=0; i<event.target.elements.length; i++){
      let name_ = event.target.elements[i].id;
      let value_ = event.target.elements[i].value;
      data_json[i] = {
        name: name_,
        value: value_
      }
    }

    Api.createOrder(data_json)
      .then((res) => {
        setShowAlert(true);
        console.log('res', res)
      })
  };

  const usersOptions = usersList
    .map((user) => (
      <option key={user.id} value={user.id}>
        {user.first_name} {user.last_name}
      </option>)
    );

  const entitiesOptions = entitiesList
    .map((entity) => (
      <option key={entity.id} value={entity.id}>
        {entity.properties.name}
      </option>)
    );

    const addItem = () => {
      let additems =  
      <div key={keyItems}>
        <Form.Group controlId={"item_"+keyItems}>
          <Form.Label>Insumo #{keyItems+1}</Form.Label>
          <Form.Control as="select">
            <option>---</option>
            {itemList
              .map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>)
              )}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId={"quantity_"+keyItems}>
          <Form.Label>Cantidad</Form.Label>
          <Form.Control type="number" placeholder="Ingresa la cantidad de insumos" />
        </Form.Group>
      </div>;
      setKeyItems(keyItems+1)
      setItemsRequested(itemsRequested => [...itemsRequested, additems]);
    }

  const form = (
    <Card className="col-8 shadow">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="manager">
          <Form.Label>Solicitante</Form.Label>
          <Form.Control
            as="select"
            required
          >
            <option key={0} value={0}>---</option>
            { usersOptions }

          </Form.Control>
          
            
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

        {itemsRequested}

        
        <Row className="mb-4">
          <Col>
            <Button className="float-md-right" onClick={addItem} variant="success">AGREAGAR ITEM</Button>
          </Col>
        </Row>

        
        
        <Button className="shadow" block variant="primary" type="submit">
          Enviar
        </Button>
      </Form>
    </Card>
  );

  return (
    <div>
      <Alert
        show={showAlert}
        variant="success"
        onClose={() => setShowAlert(false)} dismissible>
          Solicitud ingresada exitosamente
      </Alert>
      <div className="row justify-content-center">
        { form }
      </div>
    </div>
  )
}

export default NewOrderPage
