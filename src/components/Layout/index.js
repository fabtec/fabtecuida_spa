import React, { useState } from 'react'
import {
  Container,
  Row,
  Col
} from 'react-bootstrap';

import Sidebar from '../Sidebar';

export default function Layout({ children }) {
  
  const [show, setShow] = useState("d-flex");
  const SidebarToggle = () => {
    show == "d-flex toggled" ? setShow("d-flex"): setShow("d-flex toggled");
  }

  return (
    <div className={show} id="wrapper">
      <Sidebar />
      <div id="page-content-wrapper">
        <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom">
          <button class="btn btn-light" id="menu-toggle" onClick={SidebarToggle}>
            <span class="navbar-toggler-icon"></span>
          </button>
        </nav>
        <Container className="mt-4 mb-4">
          { children }
        </Container>
      </div>
    </div>
  )
}