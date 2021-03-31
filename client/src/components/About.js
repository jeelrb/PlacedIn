import React from 'react'
import Navbar from './Navbar';
import { MDBContainer,MDBCol,MDBRow, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBIcon } from "mdbreact";

function About() {
    return (
        <>
            <Navbar />
            <MDBContainer mt="4" className="mt-5 details_container">
            <MDBCard className="card_container text-center text-white mdb-color darken-1">
                <MDBCardBody>
                    <MDBCardTitle className="white-text mt-5">About</MDBCardTitle>
                    <hr className="hr-text mt-5" data-content=""></hr>
                    <h6 className="white-text text-center mt-5 mx-5 font-weight-bold">This is a full stack web app for college students with full authentication.
                        User can create profile, provide coding platforms username and all relevant details will be fetched using API’s.
                        User can write blogs and can share their interview experiences.
                        Implemented autosearch feature for searching user’s profile.</h6>
                        <hr className="hr-text mt-5" data-content="Developed by"></hr>
                        <h6 className="white-text text-center mt-5 mb-5 mx-5 font-weight-bold">Jeel Baraiya |  Hrujul Thumar</h6>
                </MDBCardBody>
            </MDBCard>
            </MDBContainer>
        </>
    )
}

export default About
