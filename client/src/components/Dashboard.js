import React, { useEffect } from "react";
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import Posts from './Posts'
import UserProfile from './UserProfile'
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import { BrowserRouter as Router } from 'react-router-dom';

function Dashboard() {

    useEffect(() => {
        window.scrollTo(0, 0);   
        if(localStorage.getItem('user')){
            localStorage.removeItem('user')
        }
    }, [])

    return (
        <>
            <Navbar />
            <MDBContainer pt="4" fluid className="dashboard_container">
                <MDBRow pt="2">
                    {/* <Sidebar /> */}
                    {/* <MDBCol lg="1"></MDBCol> */}
                    <Posts />
                    <UserProfile />
                    {/* <MDBCol lg="1"></MDBCol> */}
                </MDBRow>
            </MDBContainer>  
        </>
    );
}

export default Dashboard