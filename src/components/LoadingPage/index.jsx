import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import BeatLoader from 'react-spinners/BeatLoader'
import './LoadingPage.css'

const LoginPage = (isLoading = true) => {
  return (
    <div className="d-flex justify-content-center align-items-center page-max">
      <Container>
        <Row>
          <Col className="text-center">
            <BeatLoader
              size={20}
              margin={6}
              color='#24426c'
              loading={isLoading}
            />
            <p>Cargando ...</p>
          </Col>
        </Row>
        
      </Container>
      
      
    </div>
    
  )
}

export default LoginPage