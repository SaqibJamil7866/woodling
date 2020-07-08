import React from 'react';
import { Nav, Navbar, NavbarBrand, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Navigation(props){

    return(
        <Navbar fixed="top" className="bg-red">
            <Container>
                <Link to='home' className="center">
                    <img
                        src={require('../../assets/woodlig.svg')}
                        alt="Woodling"
                    />
                </Link>
            </Container>
        </Navbar>
    )
}

export { Navigation }