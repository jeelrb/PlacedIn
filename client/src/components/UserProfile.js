import React from "react";
import { MDBContainer,MDBCol,MDBRow, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBIcon } from "mdbreact";

function UserProfile() {
    return(
        <MDBCol className="profile pr-5 pb-4 mt-5" lg="3">
            <MDBContainer fluid className="profile_container">
                <MDBRow className="mb-4">
                        <MDBCol className="text-center">
                            <MDBCardBody className="mt-5">
                                <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" className="rounded-circle white" width="100"></img>
                                <MDBCardTitle className="text-info font-weight-bold mt-3">Jeel Baraiya</MDBCardTitle>
                                <MDBCardText className="text-info">Google</MDBCardText>
                            </MDBCardBody>
                        </MDBCol>
                </MDBRow>
            </MDBContainer>
        </MDBCol>
    )
}

export default UserProfile