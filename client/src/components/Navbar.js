import React, { useState } from "react";
import Tooltip from '@material-ui/core/Tooltip';
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon } from "mdbreact";

function Navbar(props) {

    const [ isOpen, setState ] = useState(false)
    const [ select, setSelect ] = useState({
        home: true,
        colleagues: false,
        interview: false,
    })


    const toggleCollapse = () => {
        setState(!isOpen)
    }

    return(
        <>
            <MDBNavbar color="blue-grey" dark expand="md" className="sticky-top">
            <MDBNavbarBrand>
                <strong className="white-text">PlacedIn</strong>
            </MDBNavbarBrand>
            <MDBNavbarToggler onClick={toggleCollapse} />
            <MDBCollapse id="navbarCollapse3" isOpen={isOpen} navbar>
                <MDBNavbarNav left>
                    <MDBNavItem active={window.location.pathname==='/dashboard'}>
                    <MDBNavLink className="navbar_item" to="/dashboard" >Home</MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem active={window.location.pathname==='/dashboard/profiles'}>
                    <MDBNavLink className="navbar_item" to="/dashboard/profiles" >Colleagues</MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem active={window.location.pathname==='/dashboard/myposts'}>
                    <MDBNavLink className="navbar_item" to="/dashboard/myposts" >My Posts</MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem active={window.location.pathname==='/dashboard/myinterviewexperiences'}>
                    <MDBNavLink className="navbar_item" to="/dashboard/myinterviewexperiences" >My Interview Experiences</MDBNavLink>
                    </MDBNavItem>
                </MDBNavbarNav>
                <MDBNavbarNav right className="pr-5">
                    <MDBNavItem>
                        {/* <MDBDropdown dropleft>
                            <MDBDropdownToggle nav caret>
                            <MDBIcon icon="user" />
                            </MDBDropdownToggle>
                            <MDBDropdownMenu className="dropdown-default">
                                <MDBDropdownItem href="/dashboard/profileSettings">Add profile</MDBDropdownItem>
                                <MDBDropdownItem href="/dashboard/profileSettings">Edit profile</MDBDropdownItem>
                                <MDBDropdownItem href="#!">Your Posts</MDBDropdownItem>
                                <MDBDropdownItem divider/>
                                <MDBDropdownItem href='/'>Logout</MDBDropdownItem>
                            </MDBDropdownMenu>
                        </MDBDropdown> */}
                        
                        <Tooltip title="logout"><a href="/"><MDBIcon icon="sign-out-alt" className="text-white" size="2x"/></a></Tooltip>
                    </MDBNavItem>
                </MDBNavbarNav>
            </MDBCollapse>
            </MDBNavbar> 
        </>
    )
}

export default Navbar