import React from 'react';
import './Sidebar.css';

const Sidebar = () => {
    return (
        <div className="bg-light border-right" id="sidebar-wrapper">
            <div className="sidebar-heading">FABTECUIDA </div>
            <div className="list-group list-group-flush">
                <a href="/" className="list-group-item list-group-item-action bg-light">Inicio</a>
                <a href="/orders" className="list-group-item list-group-item-action bg-light">Ordenes</a>
                <a href="/inventory" className="list-group-item list-group-item-action bg-light">Inventario</a>
                <a href="/entities" className="list-group-item list-group-item-action bg-light">Entidades</a>
                <a href="/users" className="list-group-item list-group-item-action bg-light">Usuarios</a>
            </div>
        </div>
    )
}

export default Sidebar
