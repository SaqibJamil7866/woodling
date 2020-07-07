import React from 'react';
import { Nav, Navbar, NavbarBrand, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Navigation(props){

    return(
        <Navbar fixed="top" className="bg-red">
            <Container>
                <Link to='home' className="center">
                    <img
                        src="images/logo-white.png"
                        alt="Woodling"
                    />
                </Link>
            </Container>
        </Navbar>
    )
}

export { Navigation }