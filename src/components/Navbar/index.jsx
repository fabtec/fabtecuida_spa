import React, { useContext } from "react";
import { NavLink } from 'react-router-dom'
import { AppContext } from '../../context/AppContext';


const Navbar = () => {
    const { toggleSidebar } = useContext(AppContext);

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
        <button className="btn btn-light" id="menu-toggle" onClick={toggleSidebar}>
            <span className="navbar-toggler-icon"></span>
        </button>

        <div>
                <div className="d-flex">
                    <NavLink 
                        className="btn btn-dark mr-2" 
                        to="/"
                        exact
                    >
                        Inicio
                    </NavLink>
                    <NavLink 
                        className="btn btn-dark mr-2" 
                        to="/admin"
                    >
                        Admin
                    </NavLink>

                    <NavLink 
                        className="btn btn-dark" 
                        to="/login"
                    >
                        Login
                    </NavLink>

                </div>
            </div>  
        </nav>
    )    
}

export default Navbar