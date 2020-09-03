import React, { useState, useEffect } from "react";

import InventoryTable from "../InventoryTable";
import Api from "../../services/api";
import InventoryInfoModal from "../InventoryInfoModal";
import {Tabs, Tab, Form, Button, Table} from "react-bootstrap";
import { formatDate } from '../../services/utils';

function EntitiesPage() {

    const [nameEntity, setnameEntity] = useState();
    const [locationEntity, setlocationEntity] = useState();
    const [managerEntity, setmanagerEntity] = useState([]);
    const [usersList, setusersList] = useState([]);
    const [entitiesList, setEntitiesList] = useState([]);

    useEffect(() => {
        Api.getEntities()
          .then((entitiesList) => {
            setEntitiesList(entitiesList)
          })
        
        Api.getUsers()
          .then((usersList) => {
            setusersList(usersList)
          })

      }, []);

    const handleChangenameEntity     = (event) => setnameEntity(event.target.value);
    const handleChangelocationEntity = (event) => setlocationEntity(event.target.value);
    const onSelectedUserChange = (event) => {
        setmanagerEntity([event.target.value])
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        
        Api.createEntity({
              name: nameEntity,
              location: locationEntity,
              manager: managerEntity
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
            <td>{entity.name}</td>
            <td>{entity.manager}</td>
            <td>{formatDate(entity.created_at)}</td>
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

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Coordenadas</Form.Label>
                        <Form.Control type="text" onChange={handleChangelocationEntity}/>
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
