import React, { useState } from "react";
import Api from "../../services/api";
import "./LoginPage.css";
import {
  Card,
  Form,
  Button,
  Image,
  Alert,
} from "react-bootstrap";

function LoginPage() {
  const [password, setPassword] = useState("");
  const handleChangePassword = (event) => setPassword(event.target.value);
  const [username, setUsername] = useState("");
  const handleChangeUsername = (event) => setUsername(event.target.value);
  const [isErrorPresent, setIsErrorPresent] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    Api.loginUser({ username, password })
      .then((res) => {
        setIsErrorPresent(false);
        const { access, refresh } = res.data;
        Api.setTokens({ access, refresh });
        window.location.href = window.location.pathname;
      })
      .catch(() => {
        setIsErrorPresent(true);
      })
  };

  const renderAlert = (isError) => {
    if (!isError) return null;

    return (
      <Alert variant="danger" show={isErrorPresent}>
        credenciales invalidas
      </Alert>
    );
  };

  return (
    <div className="body-login center">
      <Card className="shadow card-login">
        <Card.Body className="p-0">
          <Form className="form-signin" onSubmit={handleSubmit}>
            <Image src="logo.svg" alt="" width="72" height="72" />
            <h1 className="h3 mb-3 font-weight-normal text-center">FABTECuida</h1>
            <Form.Group controlId="formBasicPassword">
              <Form.Label className="pb-0 pl-0">Nombre de usuario</Form.Label>
              <Form.Control 
                type="text" 
                icon="user"
                placeholder="Username"
                value={username}
                onChange={handleChangeUsername} autofocus />
            </Form.Group>
            
            
            <Form.Group controlId="formBasicPassword" className="mb-4">
              <Form.Label className="pb-0 pl-0">Contraseña</Form.Label>
              <Form.Control 
                type="password"
                icon="lock"
                placeholder="Contraseña"
                value={password}
                onChange={handleChangePassword} 
              />
            </Form.Group>

            {renderAlert(isErrorPresent)}

            <Button block className="shadow" color="primary" type="submit"> Entrar </Button>
          </Form>
        </Card.Body>
      </Card>
      </div>
  );
}

export default LoginPage;
