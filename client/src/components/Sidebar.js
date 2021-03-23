import React from "react";
import { MDBCol,  MDBNav,  MDBNavLink, MDBIcon } from "mdbreact";

function Sidebar() {
    return(
        <MDBCol className="sidebar mb-4" lg="2">
            <MDBNav className="flex-column font-weight-bold sidebar">
                <MDBNavLink className="dark-grey-text sidebarLink" active to="#!"><MDBIcon icon="home" className="mr-3"/><h6>Home page</h6></MDBNavLink>
                <MDBNavLink className="dark-grey-text sidebarLink" to="#!"><MDBIcon icon="user-friends" className="mr-3"/><h6>Colleagues</h6></MDBNavLink>
                <MDBNavLink className="dark-grey-text sidebarLink" to="#!"><MDBIcon icon="chalkboard-teacher" className="mr-3"/><h6>Add Interview Experience</h6></MDBNavLink>
                <MDBNavLink className="dark-grey-text sidebarLink" to="#!"><MDBIcon icon="pen" className="mr-3"/><h6>Add post</h6></MDBNavLink>
            </MDBNav>
        </MDBCol>
    )
}

export default Sidebar