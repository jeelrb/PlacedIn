import React, { useEffect } from 'react'
import { MDBCard,MDBCardHeader, MDBCardBody, MDBCardTitle, MDBBtn, MDBRow, MDBCol, MDBIcon, MDBContainer, MDBCardFooter} from 'mdbreact';

function CommentItem(props) {
    
    return (
        <>
        <MDBCard className="mt-3">
            <MDBCardBody className="white m-0 p-3">
                <MDBRow>
                    <MDBCol size="12" className="text-left"><h6 className="text-info font-weight-bold m-0 mt-1">{props.name}</h6></MDBCol>
                    <MDBCol className="mt-2"><h6>{props.text}</h6></MDBCol>
                </MDBRow>
            </MDBCardBody>
        </MDBCard>
        
        </>
        
    )
}

export default CommentItem
