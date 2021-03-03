import React from "react";
import {MDBContainer, MDBBtn,  MDBRow, MDBCol } from "mdbreact";

function Post() {
    return(
        <MDBCol className="post pr-3 pb-4" md="7">
            <MDBContainer fluid className="post_container">
                <MDBRow>
                    <MDBCol className="post_buttons">
                        <MDBBtn className="post_button" href="#" color="default" size="lg">
                            Add Post
                        </MDBBtn>
                        <MDBBtn className="post_button" href="#" color="default" size="lg">
                            Add Interview Experience
                        </MDBBtn>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </MDBCol>
    )
}

export default Post