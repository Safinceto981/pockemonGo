import React, { Component } from "react";
//import{Link} from 'react-router-dom';
//import styled from 'styled-components';
import {
  Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Container
} from 'reactstrap';

export default class AppNavbar extends Component {

  state = {
    isOpen: false
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen

    });
  };
  render() {
    return (
      <div>
        <Navbar color="dark" dark expand="sm" className="mb-5">
          <Container>
            <NavbarBrand href="/">List</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink href="https://www.youtube.com/watch?v=R54neaLznFA&list=PLillGF-RfqbbiTGgA77tGO426V3hRF9iE&index=3">Login</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="https://www.youtube.com/watch?v=R54neaLznFA&list=PLillGF-RfqbbiTGgA77tGO426V3hRF9iE&index=3">Reg</NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}
