import React from "react";
import Navbar from './Navbar';
import { BrowserRouter as Router } from 'react-router-dom';
import { MDBContainer, MDBRow,MDBCol,MDBBtn, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBInput } from "mdbreact";

function AddProfile(){
    return (
        <Router>
            <Navbar></Navbar>
            <MDBContainer className="details_container my-4">
                <MDBCard>
                    <MDBCardTitle className="text-center bg-primary text-white py-3">My Details</MDBCardTitle>
                    <MDBCardBody>
                        <MDBCardText>
                            <h6 className="heading-small text-primary">Social information</h6>
                            <div className="container">
                                <MDBRow>
                                    <MDBCol lg="12">
                                        <MDBInput label="Portfolio Website" />
                                    </MDBCol>
                                    <MDBCol lg="6">
                                        <MDBInput label="LinkedIn" />
                                    </MDBCol>
                                    <MDBCol lg="6">
                                        <MDBInput label="Instagram" />
                                    </MDBCol>
                                    <MDBCol lg="6">
                                        <MDBInput label="Twitter" />
                                    </MDBCol>
                                    <MDBCol lg="6">
                                        <MDBInput label="Facebook" />
                                    </MDBCol>
                                </MDBRow>
                            </div>
                        </MDBCardText>
                        <hr className="my-4 bg-primary"></hr>
                        <MDBCardText>
                            <h6 className="heading-small text-primary">Coding Platform Information</h6>
                            <div className="container">
                                <MDBRow>
                                    <MDBCol lg="4">
                                        <MDBInput label="Codeforces Hadle" />
                                    </MDBCol>
                                    <MDBCol lg="4">
                                        <MDBInput label="Codechef Handle" />
                                    </MDBCol>
                                    <MDBCol lg="4">
                                        <MDBInput label="Github Username" />
                                    </MDBCol>
                                </MDBRow>
                            </div>
                        </MDBCardText>
                        <hr className="my-4 bg-primary"></hr>
                        <MDBCardText>
                            <h6 className="heading-small text-primary">Skills</h6>
                            <div className="container">
                                <MDBRow>
                                    <MDBCol lg="4">
                                        <MDBInput label="Skill 1" />
                                    </MDBCol>
                                    <MDBCol lg="4">
                                        <MDBInput label="Skill 2" />
                                    </MDBCol>
                                    <MDBCol lg="4">
                                        <MDBInput label="Skill 3" />
                                    </MDBCol>
                                </MDBRow>
                            </div>
                        </MDBCardText>
                        <hr className="my-4 bg-primary"></hr>
                        <MDBCardText>
                            <h6 className="heading-small text-primary">Education and Professional Details</h6>
                            <div className="container">
                                <MDBRow>
                                    <MDBCol lg="12">
                                        <MDBInput label="Job" />
                                    </MDBCol>
                                    <MDBCol lg="6">
                                        <MDBInput label="12th" />
                                    </MDBCol>
                                    <MDBCol lg="6">
                                        <MDBInput label="10th" />
                                    </MDBCol>
                                </MDBRow>
                            </div>
                        </MDBCardText>
                        <MDBBtn color="blue darken-2" href="#">Submit</MDBBtn>
                    </MDBCardBody>
                </MDBCard>
            </MDBContainer>
        </Router>
    )
}

export default AddProfile;