import React, { useContext, useEffect } from "react";
import { AppContext } from '../../context/AppContext';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAction } from '../../redux/userDucks';
import { Dropdown, Nav, Button } from 'react-bootstrap';
import { signOut } from '../../services/utils'

const Navbar = () => {
    const { toggleSidebar } = useContext(AppContext);

    const dispatch = useDispatch();
    const user = useSelector(store => store.user.array)  

    useEffect(()=>{
        dispatch(getUserAction())
    },[dispatch])

    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
        <a
          href="./"
          ref={ref}
          className="nav-link dropdown-toggle" 
          onClick={(e) => {
            e.preventDefault();
            onClick(e);
          }}
        >
           { user.first_name } { user.last_name }
        </a>
      ));

      const logOut = () =>{
        signOut();
        window.location.href = '/'
      }
      

    return (
        <Nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
            <Button variant="light" id="menu-toggle" onClick={toggleSidebar}>
                <span className="navbar-toggler-icon"></span>
            </Button>
            <ul className="nav navbar-nav ml-auto">
                <Nav.Item className="dropdown">
                    <Dropdown>
                        <Dropdown.Toggle as={CustomToggle} id="dropdown-basic"></Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="/profile">Perfil</Dropdown.Item>
                            <Dropdown.Item onClick={()=>logOut()}>Cerrar Sesión</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Nav.Item>
            </ul>     
        </Nav>
    )    
}


export default Navbar
