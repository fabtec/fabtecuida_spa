import React from 'react';

import './Sidebar.css';

export default function Sidebar() {
  return (
    <div className="bg-light border-right" id="sidebar-wrapper">
      <div className="sidebar-heading">FABTECUIDA </div>
      <div className="list-group list-group-flush">
        <a href="/dashboard" className="list-group-item list-group-item-action bg-light">Inicio</a>
        <a href="/orders/new" className="list-group-item list-group-item-action bg-light">Crear Ordenes</a>
        <a href="/orders/match" className="list-group-item list-group-item-action bg-light">Asignar Ordenes</a>
        <a href="/inventory" className="list-group-item list-group-item-action bg-light">Inventario</a>
      </div>
    </div>
  );
}
