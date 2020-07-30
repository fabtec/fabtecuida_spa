import React, { useContext } from 'react'

import { AppContext } from '../../context/AppContext';

export default function Navbar() {  
  const { toggleSidebar } = useContext(AppContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
      <button className="btn btn-light" id="menu-toggle" onClick={toggleSidebar}>
        <span className="navbar-toggler-icon"></span>
      </button>
    </nav>
  )
}