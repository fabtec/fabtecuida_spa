import React, { useState, useEffect } from "react";

import Api from "../../services/api";
import {Tabs, Tab, Form, Button, Table} from "react-bootstrap";
import { formatDate } from '../../services/utils';

function UsersPage() {
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [userName, setUserName] = useState();
    const [email, setEmail] = useState();
    const [usersList, setusersList] = useState([]);
    
    const handleChangeFirstName = (event) => setFirstName(event.target.value);
    const handleChangeLastName = (event) => setLastName(event.target.value);
    const handleChangeUsername = (event) => setUserName(event.target.value);
    const handleChangeEmail = (event) => setEmail(event.target.value);

    useEffect(() => {
        
        Api.getUsers()
        .then((usersList) => {
            setusersList(usersList)
        })

    }, []);


    const handleSubmit = (event) => {
        event.preventDefault();
        
        Api.createUser({
            username: userName,
            first_name: firstName,
            last_name: lastName,
            email: email
        })
        .then((res) => {
            console.log(res);
            alert("Guardado Correctamente")
        })
        .catch((error) =>{
            console.log(error);
        })
        
    };

    const createRows = () =>
        usersList.map((user, index) => (
        <tr
            key={user.id}
        >
            <td>{user.first_name}</td>
            <td>{user.last_name}</td>
            <td>{user.email}</td>
        </tr>
        ));


  return (
    <Tabs defaultActiveKey="addUser" id="uncontrolled-tab-example">
        <Tab eventKey="addUser" title="Añadir Usuario">
            <Form onSubmit={handleSubmit}>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Nombres</Form.Label>
                    <Form.Control type="text" onChange={handleChangeFirstName} />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Apellidos</Form.Label>
                    <Form.Control type="text" onChange={handleChangeLastName} />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Nombre de Usuario</Form.Label>
                    <Form.Control type="text" onChange={handleChangeUsername} />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Correo Electrónico</Form.Label>
                    <Form.Control type="text" onChange={handleChangeEmail} />
                </Form.Group>

                <Button variant="primary" type="submit" className="float-right">
                    Guardar Usuario
                </Button>
            </Form>
        </Tab>
        <Tab eventKey="userList" title="Usuarios">
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Nombres</th>
                        <th>Apellidos</th>
                        <th>Correo Electrónico</th>
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

export default UsersPage;
