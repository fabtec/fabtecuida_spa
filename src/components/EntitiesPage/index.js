import React, { useState, useEffect } from "react";
import Api from "../../services/api";
import {Tabs, Tab, Form, Button, Table} from "react-bootstrap";
import { formatDate } from '../../services/utils';

import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
  } from "use-places-autocomplete";

import useOnclickOutside from "react-cool-onclickoutside";

function EntitiesPage() {

    const [nameEntity, setnameEntity] = useState();
    const [managerEntity, setmanagerEntity] = useState([]);
    const [usersList, setusersList] = useState([]);
    const [entitiesList, setEntitiesList] = useState([]);
    const [coordinates, setCoordinates] = useState([]);
    const [address, setAddress] = useState("");

    //AUTOCOMPLETE
    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
      } = usePlacesAutocomplete({
        requestOptions: {
          /* Define search scope here */
        },
        debounce: 300,
      });
      const ref = useOnclickOutside(() => {
        // When user clicks outside of the component, we can dismiss
        // the searched suggestions by calling this method
        clearSuggestions();
      });
    
      const handleInput = (e) => {
        // Update the keyword of the input element
        setValue(e.target.value);
        setAddress(e.target.value);
      };
    
      const handleSelect = ({ description }) => () => {
        // When user selects a place, we can replace the keyword without request data from API
        // by setting the second parameter to "false"
        setValue(description, false);
        clearSuggestions();
    
        // Get latitude and longitude via utility functions
        getGeocode({ address: description })
          .then((results) => getLatLng(results[0]))
          .then(({ lat, lng }) => {
                console.log("📍 Coordinates: ", { lat, lng });
                setCoordinates([lng, lat])
          })
          .catch((error) => {
            console.log("😱 Error: ", error);
          });
      };
    
      const renderSuggestions = () =>
        data.map((suggestion) => {
          const {
            id,
            structured_formatting: { main_text, secondary_text },
          } = suggestion;
    
          return (
            <li key={id} onClick={handleSelect(suggestion)}>
              <strong>{main_text}</strong> <small>{secondary_text}</small>
            </li>
          );
        });



    //END AUTOCOMPLETE

    
    

    useEffect(() => {
        Api.getEntities()
          .then((entitiesList) => {
            console.log(entitiesList)
            setEntitiesList(entitiesList)
          })
        
        Api.getUsers()
          .then((usersList) => {
            setusersList(usersList)
          })

      }, []);

    const handleChangenameEntity     = (event) => setnameEntity(event.target.value);
    const handleChangeAddress = (event) => setAddress(event.target.value);
    const onSelectedUserChange = (event) => {
        setmanagerEntity([event.target.value])
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        
        Api.createEntity({
            name: nameEntity,
            "location": {
                "type": "Point",
                "coordinates": coordinates
            },
            "manager": managerEntity
        })
          .then((res) => {
                console.log(res);
                alert("Guardado Correctamente")
          })
          .catch((error) =>{
              console.log(error);
          })
          
      };

      const usersOptions = usersList
      .map((user) => (
        <option key={user.id} value={user.id}>
          {user.first_name} {user.last_name}
        </option>)
      );

      const createRows = () =>
        entitiesList.map((entity, index) => (
        <tr
            key={entity.id}
        >
            <td>{entity.properties.name}</td>
            <td>{entity.properties.manager}</td>
            <td>{formatDate(entity.properties.created_at)}</td>
        </tr>
        ));

    return (
        <Tabs defaultActiveKey="addUser" id="uncontrolled-tab-example">
            <Tab eventKey="addUser" title="Añadir Entitdad">
            <Form onSubmit={handleSubmit}>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Representante</Form.Label>
                        <Form.Control
                            as="select"
                            onChange={onSelectedUserChange}
                        >
                            <option key={0} value={0}>---</option>
                            { usersOptions }
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control type="text" onChange={handleChangenameEntity} />
                    </Form.Group>

                    {/* <Form.Group controlId="formBasicPassword">
                        <Form.Label>Dirección</Form.Label>
                        <Form.Control type="text" />
                    </Form.Group> */}

                    <Form.Group controlId="formAddress">
                        <Form.Label>Dirección</Form.Label>
                        <div ref={ref}>
                        <Form.Control
                            value={value}
                            onChange={handleInput}
                            disabled={!ready}
                        />
                        {/* We can use the "status" to decide whether we should display the dropdown or not */}
                        {status === "OK" && <ul>{renderSuggestions()}</ul>}
                    </div>
                    </Form.Group>

                    

                    <Button variant="primary" type="submit" className="float-right">
                        Guardar Entidad
                    </Button>
                </Form>
            </Tab>
            <Tab eventKey="userList" title="Entitdades">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>Nombre</th>
                        <th>Representante</th>
                        <th>Fecha de creación</th>
                        </tr>
                    </thead>
                    <tbody>
                        {createRows()}
                    </tbody>
                </Table>
            </Tab>
        </Tabs>
        
      );
}

export default EntitiesPage;
