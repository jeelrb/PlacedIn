import React, { useState } from "react";
import Navbar from './Navbar'
import { MDBContainer,MDBRow,MDBCol,MDBCard,MDBCardBody,MDBIcon,MDBCardHeader,MDBCardTitle } from "mdbreact";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function AddPost(){

    const [ formData, setFormData ] = useState({
        title: '',
        text: ''
    })

    return(
        <>
        <Navbar />
        <MDBContainer className="mb-5 mt-5">
            <MDBRow>
                <MDBCol md="12">
                    <MDBCard>
                        <MDBCardHeader color="blue-grey lighten-1">
                            <MDBCardTitle className="text-center text-white font-weight-bolder mt-2">Compose Your Post</MDBCardTitle>
                        </MDBCardHeader>
                        <MDBCardBody>
                            <form>
                                <div className="pl-lg-4 mb-5">
                                <hr className="hr-text-form mt-5 mb-5" data-content="Title"></hr>
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="form-group focused">
                                                <input type="text" 
                                                    value={formData.title} 
                                                    onChange={e => setFormData({...formData, title: e.target.value})}
                                                    className="form-control form-control-alternative" 
                                                    placeholder="Enter the title" 
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <hr className="hr-text-form mt-5 mb-5" data-content="Content"></hr>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-group focused">
                                                <CKEditor
                                                    editor={ ClassicEditor }
                                                    data="<p>Write your interview experience here....</p>"
                                                    onChange={ ( e, editor ) => {
                                                        const data = editor.getData();
                                                        setFormData({...formData, text: data})
                                                    } }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <button className="btn blue-grey lighten-1 text-white font-weight-bold mt-3" type="submit">Submit <MDBIcon far icon="paper-plane" className="ml-2" /></button>
                                </div>
                            </form>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
        </>
    );
}

export default AddPost;