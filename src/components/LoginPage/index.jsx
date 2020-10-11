import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { loginAction, verifyTokenAction } from '../../redux/authDucks'
import "./LoginPage.css";
import { Card, Form, Button, Image, Alert, Spinner, Col } from "react-bootstrap";

function LoginPage() {

  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleChangePassword = (event) => setPassword(event.target.value);
  const handleChangeUsername = (event) => setUsername(event.target.value);

  const dispatch = useDispatch()
  const store = useSelector(store => store)

  useEffect(()=>{
    dispatch(verifyTokenAction());
  },[])
  
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(loginAction(username,password))
  };

  useEffect(()=>{
    if(store.auth.active)
      window.location.href = "/";
  },[store.auth.active])

  const spinner = () =>{
    if(store.auth.loading){
      return(
        <Spinner animation="border" role="status" size="sm">
          <span className="sr-only"> Cargando...</span>
        </Spinner>
      )
    }    
  }

  const renderAlert = () => {
      return store.auth.error ? (
        <Alert variant="danger" className="text-center" show={store.auth.error}>
          Credenciales Inválidas
        </Alert>
      ):null;
    
  }

  return (
    <div className="body-login center">
      <Card className="shadow card-login">
        <Card.Body className="pt-0">
          <Col className="text-center">
            <Image src="logo.svg" alt="logo" width="140" height="140" />
          </Col>
          
          <Form className="form-signin pt-0" onSubmit={handleSubmit}>            
            <h1 className="h3 mb-3 font-weight-normal text-center">FABTECuida</h1>
            <Form.Group controlId="formUsername">
              <Form.Label className="pb-0 pl-0">Nombre de usuario</Form.Label>
              <Form.Control 
                type="text" 
                icon="user"
                placeholder="Username"
                value={username}
                onChange={handleChangeUsername} />
            </Form.Group>
            
            
            <Form.Group controlId="formPassword" className="mb-4">
              <Form.Label className="pb-0 pl-0">Contraseña</Form.Label>
              <Form.Control 
                type="password"
                icon="lock"
                placeholder="Contraseña"
                value={password}
                onChange={handleChangePassword} 
              />
            </Form.Group>

            {renderAlert()}

            <Button block className="shadow" color="primary" type="submit"> 
              Entrar &nbsp;
              {spinner(store.auth.loading)}
            </Button>
          </Form>
        </Card.Body>
      </Card>
      </div>
  );
}

export default LoginPage;
