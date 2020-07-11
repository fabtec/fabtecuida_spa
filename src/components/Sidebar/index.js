import React from 'react';
import { Nav } from 'react-bootstrap';
import './Sidebar.css';

export default function Sidebar() {
  return (
    <Nav
      activeKey="/dashboard"
      className="flex-column"
      onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
    >
      <Nav.Item>
        <Nav.Link href="/dashboard">Dashboard</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/orders/new">Crear Ordenes</Nav.Link>
      </Nav.Item>
    </Nav>
  );
}
