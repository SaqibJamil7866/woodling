import React from 'react';
import { Nav, Navbar, NavbarBrand } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Navigation(props){

    return(
        <Navbar fixed="top" className="bg-red">
            <NavbarBrand>
                <Link to='home'>
                    <img
                        src="images/logo-white.png"
                        className="center"
                        alt="App logo"
                    />
                </Link>
            </NavbarBrand>
            <span className="navbar-text ml400">
                Woodlig
            </span>
            {/* <Nav className="ml-auto">
                <Nav.Link  title="Logout" className="link-white">Logout</Nav.Link>
            </Nav> */}
        </Navbar>
    )
}

export { Navigation }