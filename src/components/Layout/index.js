import React from 'react'
import {
  Container,
  Row,
  Col
} from 'react-bootstrap';

import Sidebar from '../Sidebar';

export default function Layout({ children }) {
  return (
    <Container>
      <Row>
        <Col xs={3}>
          <Sidebar />
        </Col>
        <Col>
          { children }
        </Col>
      </Row>
    </Container>
  )
}
