import React from "react";
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import Posts from './Posts'
import UserProfile from './UserProfile'
import { MDBContainer, MDBRow } from "mdbreact";
import { BrowserRouter as Router } from 'react-router-dom';

function Dashboard() {
    return (
        <Router>
            <Navbar />
            <MDBContainer pt="4" fluid className="dashboard_container">
                <MDBRow pt="2">
                    <Sidebar />
                    <Posts />
                    <UserProfile />
                </MDBRow>
            </MDBContainer>  
        </Router>
    );
}

export default Dashboard