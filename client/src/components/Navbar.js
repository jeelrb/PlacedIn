import React, { useState } from "react";
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon, MDBBtn } from "mdbreact";
import { BrowserRouter as Router, Redirect, Link } from 'react-router-dom';

function Navbar() {

    const [ isOpen, setState ] = useState(false)

    const toggleCollapse = () => {
        setState(!isOpen)
    }

    const handleLogout = () => {
        localStorage.removeItem('token')
    }

    return(
        <Router>
            <MDBNavbar color="blue darken-2" dark expand="md">
            <MDBNavbarBrand>
                <strong className="white-text">PlacedIn</strong>
            </MDBNavbarBrand>
            <MDBNavbarToggler onClick={toggleCollapse} />
            <MDBCollapse id="navbarCollapse3" isOpen={isOpen} navbar>
                <MDBNavbarNav left>
                    <MDBNavItem active>
                    <MDBNavLink className="navbar_item" to="#!">Home</MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                    <MDBNavLink className="navbar_item" to="#!">Colleagues</MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                    <MDBNavLink className="navbar_item" to="#!">Interview Experiences</MDBNavLink>
                    </MDBNavItem>
                </MDBNavbarNav>
                <MDBNavbarNav right className="pr-5">
                    <MDBNavItem>
                        <MDBDropdown dropleft>
                            <MDBDropdownToggle nav caret>
                            <MDBIcon icon="user" />
                            </MDBDropdownToggle>
                            <MDBDropdownMenu className="dropdown-default">
                                <MDBDropdownItem href="/dashboard/addprofile">Add profile</MDBDropdownItem>
                                <MDBDropdownItem href="#!">Edit profile</MDBDropdownItem>
                                <MDBDropdownItem href="#!">Your Posts</MDBDropdownItem>
                                <MDBDropdownItem divider/>
                                <MDBDropdownItem href='/'>Logout</MDBDropdownItem>
                            </MDBDropdownMenu>
                        </MDBDropdown>
                    </MDBNavItem>
                </MDBNavbarNav>
            </MDBCollapse>
            </MDBNavbar> 
        </Router>
    )
}

export default Navbar