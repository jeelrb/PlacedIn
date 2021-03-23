import React from 'react'
import { MDBCol, MDBContainer, MDBFormInline, MDBIcon, MDBRow } from "mdbreact";

function Searchbar() {
    return (
        <MDBContainer className="mt-5">
            <MDBRow>
                <MDBCol size="11"><MDBIcon icon="search" className="mt-2"/><input className="form-control form-control w-100" type="text" placeholder="Search" aria-label="Search" /></MDBCol>
            </MDBRow>
        </MDBContainer>
    )
}

export default Searchbar
