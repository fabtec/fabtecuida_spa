import React, { useState } from 'react'
import { Grid, Card, Form, Button, Alert } from 'tabler-react'
import Api from '../../services/api'

function LoginPage () {
  const [password, setPassword] = useState('')
  const handleChangePassword = event => setPassword(event.target.value)
  const [username, setUsername] = useState('')
  const handleChangeUsername = event => setUsername(event.target.value)

  const [isPerformingLogin, setIsPerformingLogin] = useState(false)
  const [isErrorPresent, setIsErrorPresent] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    setIsPerformingLogin(true)

    Api.loginUser({ username, password })
      .then((res) => {
        setIsErrorPresent(false)
        const { access, refresh } = res.data
        Api.setTokens({ access, refresh })
        window.location.href = '/dashboard'
      })
      .catch(() => {
        setIsErrorPresent(true)
      })
      .finally(() => {
        setIsPerformingLogin(false)
      })
  }

  const renderAlert = (isError) => {
    if (!isError) return null

    return (
      <Alert type='danger' hide={isErrorPresent}>
        Credenciales invalidas
      </Alert>
    )
  }

  return (
    <Grid.Row cards alignItems='center'>
      <Grid.Col></Grid.Col>

      <Grid.Col>
        <Card>
          <Card.Header>
            <Card.Title>FABTECuida</Card.Title>
          </Card.Header>
          <Card.Body>

            <Form onSubmit={handleSubmit}>
              <Form.Group label='Login'>
                <Form.Input type='text' icon='user' placeholder='Username' value={username} onChange={handleChangeUsername} />
                <Form.Input type='password' icon='lock' placeholder='Password' value={password} onChange={handleChangePassword} />
                {renderAlert(isErrorPresent)}
                <Button block loading={isPerformingLogin} color='primary' type='submit'>
                  Submit
                </Button>
              </Form.Group>
            </Form>
          </Card.Body>
        </Card>
      </Grid.Col>

      <Grid.Col></Grid.Col>
    </Grid.Row>
  )
}

export default LoginPage
