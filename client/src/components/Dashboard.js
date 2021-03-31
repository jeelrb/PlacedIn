import React, { useEffect } from "react";
import Navbar from './Navbar'
import Posts from './Posts'
import UserProfile from './UserProfile'
import { MDBContainer, MDBRow } from "mdbreact";

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
                    <Posts />
                    <UserProfile />
                </MDBRow>
            </MDBContainer>  
        </>
    );
}

export default Dashboard