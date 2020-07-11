import React, { useState } from "react";
import Api from "../../services/api";
import {
  Container,
  Col,
  Row,
  Card,
  Form,
  Button,
  Alert,
} from "react-bootstrap";

function LoginPage() {
  const [password, setPassword] = useState("");
  const handleChangePassword = (event) => setPassword(event.target.value);
  const [username, setUsername] = useState("");
  const handleChangeUsername = (event) => setUsername(event.target.value);

  const [isPerformingLogin, setIsPerformingLogin] = useState(false);
  const [isErrorPresent, setIsErrorPresent] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsPerformingLogin(true);

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
      .finally(() => {
        setIsPerformingLogin(false);
      });
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
    <Container>
      <Row>
        <Col>
        <h1>Hola!</h1>
          <Card>
            <Card.Header>
              <Card.Title>FABTECuida</Card.Title>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group as={Row}>
                  <Form.Control
                    type="text"
                    icon="user"
                    placeholder="Username"
                    value={username}
                    onChange={handleChangeUsername}
                  />
                  <Form.Control
                    type="password"
                    icon="lock"
                    placeholder="Password"
                    value={password}
                    onChange={handleChangePassword}
                  />
                  {renderAlert(isErrorPresent)}
                  
                  {/*
                    TODO: loading when button is pressed. tabler react has loading in buttons  
                    using the prop --> loading={isPerformingLogin}
                  */}
                  <Button
                    block
                    color="primary"
                    type="submit"
                  >
                    Submit
                  </Button>
                </Form.Group>
              </Form> 
            </Card.Body>
          </Card> 
        </Col>
      </Row>
    </Container>
  );
}

export default LoginPage;
