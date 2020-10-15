import React,{ useState, useEffect } from 'react'
import { Button, Modal, Form, ListGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import useOnclickOutside from "react-cool-onclickoutside";
import usePlacesAutocomplete, { getGeocode, getLatLng} from "use-places-autocomplete";
import { getUsersAction } from '../../redux/usersDucks'
import { createEntitiesAction } from '../../redux/entitiesDucks'

import './EntitiesCreateModal.css'

const EntitiesCreateModal = ({showModal, handleClose}) => {
    const [nameEntity, setnameEntity] = useState();
    const [managerEntity, setmanagerEntity] = useState([]);
    const [coordinates, setCoordinates] = useState([]);
    const [address, setAddress] = useState("");

    const handleChangenameEntity     = (event) => setnameEntity(event.target.value);
    const onSelectedUserChange = (event) => {
        setmanagerEntity([event.target.value])
    }

    const dispatch = useDispatch()
    const users = useSelector(store => store.users.array)
    const entity = useSelector(store => store.entity)

    useEffect(()=>{
      dispatch(getUsersAction())
  },[dispatch])

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
                setCoordinates([lng, lat])
          })
          .catch((error) => {
            console.log("😱 Error: ", error);
          });
      };
    
      const renderSuggestions = () =>
        data.map((suggestion, index) => {
          const {
            structured_formatting: { main_text, secondary_text },
          } = suggestion;
    
          return (
            <ListGroup.Item action key={index} onClick={handleSelect(suggestion)}>
              <strong>{main_text}</strong> <small>{secondary_text}</small>
            </ListGroup.Item>
          );
        });

    //END AUTOCOMPLETE

    const usersOptions = users
      .map((user) => (
        <option key={user.id} value={user.id}>
          {user.first_name} {user.last_name}
        </option>
      ));

    const handleSubmit = (event) => {
        event.preventDefault();

        dispatch(createEntitiesAction(
          {
            name: nameEntity,
            address: address,
            "location": {
                "type": "Point",
                "coordinates": coordinates
            },
            "manager": managerEntity
          }
        ))
      };

    useEffect(()=>{
      if(entity.status === 201){
          handleClose()
      }
    },[entity, handleClose])

    return (        
      <Modal show={showModal} onHide={handleClose}>
          <Modal.Header>
              <Modal.Title>Crear Nueva Entidad</Modal.Title>
          </Modal.Header>
          <Modal.Body>
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
                      <Form.Control type="text" onChange={ handleChangenameEntity } />
                  </Form.Group>

                  <Form.Group controlId="formAddress">
                      <Form.Label>Dirección</Form.Label>
                      <div ref={ref}>
                      <Form.Control
                          value={value}
                          onChange={handleInput}
                          disabled={!ready}
                          autoComplete="ÑÖaddress"
                      />
                      {status === "OK" && <ListGroup className="address">{renderSuggestions()}</ListGroup>}
                  </div>
                  </Form.Group>
                  <Button variant="primary" type="submit" className="float-right">
                      Guardar Entidad
                  </Button>
              </Form>
          </Modal.Body>
      </Modal>
    )
}

export default EntitiesCreateModal
