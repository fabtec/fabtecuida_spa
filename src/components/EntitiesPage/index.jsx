import React, { useEffect, useState } from "react";
// import Api from "../../services/api";
import { Form, Button, Table, Col, Row } from "react-bootstrap";
import { formatDate } from '../../services/utils';
// import EntitiesList from  '../EntitiesList';

// import usePlacesAutocomplete, {
//     getGeocode,
//     getLatLng,
//   } from "use-places-autocomplete";

// import useOnclickOutside from "react-cool-onclickoutside";
// import { Provider } from "react-redux";
// import generateStore from "../../redux/store";
// import { createStore } from "redux";

import { useDispatch, useSelector } from 'react-redux'
import { getEntitiesAction } from '../../redux/entitiesDucks'
import EntitiesCreateModal from '../EntitiesCreateModal'

function EntitiesPage() {

    // const [nameEntity, setnameEntity] = useState();
    // const [managerEntity, setmanagerEntity] = useState([]);
    // const [usersList, setusersList] = useState([]);
    // const [entitiesList, setEntitiesList] = useState([]);
    // const [coordinates, setCoordinates] = useState([]);
    // const [address, setAddress] = useState("");

    // //AUTOCOMPLETE
    // const {
    //     ready,
    //     value,
    //     suggestions: { status, data },
    //     setValue,
    //     clearSuggestions,
    //   } = usePlacesAutocomplete({
    //     requestOptions: {
    //       /* Define search scope here */
    //     },
    //     debounce: 300,
    //   });
    //   const ref = useOnclickOutside(() => {
    //     // When user clicks outside of the component, we can dismiss
    //     // the searched suggestions by calling this method
    //     clearSuggestions();
    //   });
    
    //   const handleInput = (e) => {
    //     // Update the keyword of the input element
    //     setValue(e.target.value);
    //     setAddress(e.target.value);
    //   };
    
    //   const handleSelect = ({ description }) => () => {
    //     // When user selects a place, we can replace the keyword without request data from API
    //     // by setting the second parameter to "false"
    //     setValue(description, false);
    //     clearSuggestions();
    
    //     // Get latitude and longitude via utility functions
    //     getGeocode({ address: description })
    //       .then((results) => getLatLng(results[0]))
    //       .then(({ lat, lng }) => {
    //             console.log("📍 Coordinates: ", { lat, lng });
    //             setCoordinates([lng, lat])
    //       })
    //       .catch((error) => {
    //         console.log("😱 Error: ", error);
    //       });
    //   };
    
    //   const renderSuggestions = () =>
    //     data.map((suggestion) => {
    //       const {
    //         id,
    //         structured_formatting: { main_text, secondary_text },
    //       } = suggestion;
    
    //       return (
    //         <li key={id} onClick={handleSelect(suggestion)}>
    //           <strong>{main_text}</strong> <small>{secondary_text}</small>
    //         </li>
    //       );
    //     });



    // //END AUTOCOMPLETE

    
    

    // useEffect(() => {
    //     Api.getEntities()
    //       .then((entitiesList) => {
    //         console.log(entitiesList)
    //         setEntitiesList(entitiesList)
    //       })
        
    //     Api.getUsers()
    //       .then((usersList) => {
    //         setusersList(usersList)
    //       })

    //   }, []);

    // const handleChangenameEntity     = (event) => setnameEntity(event.target.value);
    // const handleChangeAddress = (event) => setAddress(event.target.value);
    // const onSelectedUserChange = (event) => {
    //     setmanagerEntity([event.target.value])
    // }

    // const handleSubmit = (event) => {
    //     event.preventDefault();
        
    //     Api.createEntity({
    //         name: nameEntity,
    //         "location": {
    //             "type": "Point",
    //             "coordinates": coordinates
    //         },
    //         "manager": managerEntity
    //     })
    //       .then((res) => {
    //             console.log(res);
    //             alert("Guardado Correctamente")
    //       })
    //       .catch((error) =>{
    //           console.log(error);
    //       })
          
    //   };

    //   const usersOptions = usersList
    //   .map((user) => (
    //     <option key={user.id} value={user.id}>
    //       {user.first_name} {user.last_name}
    //     </option>)
    //   );

  const dispatch = useDispatch();
  const entities = useSelector(store => store.entities.array)

  const createRows = () =>
    entities.map((entity, index) => (
    <tr key={entity.id} >
      <td>{entity.properties.name}</td>
      <td>{entity.properties.manager}</td>
      <td>{formatDate(entity.properties.created_at)}</td>
    </tr>
  ));

  useEffect(()=>{
    dispatch(getEntitiesAction())
  },[dispatch])
  
  const [showModalSingle, setShowModalSingle] = useState(false);

  return (
    <Row>
      <Col xs={12} className="text-center mb-4">
        <Button onClick={()=>setShowModalSingle(true)}>Crear Nueva Entidad</Button>
      </Col>
      <Col xs={12}>
        <Table responsive striped bordered hover>
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
      </Col>
      <EntitiesCreateModal showModal={showModalSingle} handleClose={()=> setShowModalSingle(false)} />
    </Row>
  );
}

export default EntitiesPage;
