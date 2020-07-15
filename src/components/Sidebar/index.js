import React from 'react';
import { Nav } from 'react-bootstrap';
import './Sidebar.css';

export default function Sidebar() {
  return (
    <div class="bg-light border-right" id="sidebar-wrapper">
      <div class="sidebar-heading">FABTECUIDA </div>
      <div class="list-group list-group-flush">
        <a href="/dashboard" class="list-group-item list-group-item-action bg-light">Inicio</a>
        <a href="/orders/new" class="list-group-item list-group-item-action bg-light">Crear Ordenes</a>
      </div>
    </div>
  );
}
