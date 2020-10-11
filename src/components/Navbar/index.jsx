import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import {Link, NavLink} from 'react-router-dom'


const Navbar = () => {

    // const dispatch = useDispatch();
    // const store = useSelector(store => store);
    
    // useEffect(()=>{
    //     dispatch(verifyTokenAction());
    // },[])

    return (
        <div className="navbar navbar-dark bg-dark">
            <Link to="/" className="navbar-brand">React Admin</Link>
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
        </div>
    )
}

export default Navbar