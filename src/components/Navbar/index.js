import React, { useState } from 'react'
import {
  Container,
  Row,
  Col
} from 'react-bootstrap';

export default function Navbar() {
  
  const [show, setShow] = useState("d-flex");
  const SidebarToggle = () => {
    show == "d-flex toggled" ? setShow("d-flex"): setShow("d-flex toggled");
  }

return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom">
      <button class="btn btn-light" id="menu-toggle" onClick={SidebarToggle}>
        <span class="navbar-toggler-icon"></span>
      </button>
    </nav>
  )
}