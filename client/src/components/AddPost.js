import React, { useState } from "react";
import Navbar from './Navbar'
import axios from 'axios'
import { Redirect } from 'react-router-dom';
import { MDBContainer,MDBRow,MDBCol,MDBCard,MDBCardBody,MDBIcon,MDBCardHeader,MDBCardTitle } from "mdbreact";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

function AddPost(){

    const [ formData, setFormData ] = useState({
        title: '',
        text: ''
    })

    const [ isSubmitted, setIsSubmited ] = useState(false)

    const onSubmit = async (e) => {

        e.preventDefault()

        try {

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                }
            }

            const { title, text } = formData

            if(!title) {
                return toast.error('Write title of the post!', { 
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2000
                })
            }

            if(!text) {
                return toast.error('Post cannot be empty!', { 
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2000
                })
            }

            const body = { title, text }

            const res = await axios.post('http://localhost:5000/post/add', body, config)

            setIsSubmited(true)

            toast.success('Post added successfully !', { 
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000
            })

        } catch (error) {

            console.log(error.response.data.error)

        }

    }

    if(isSubmitted) {
        return <Redirect to='/dashboard' />
    }

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
                            <form onSubmit={e => onSubmit(e)}>
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
                                                    data="<p>Write something here....</p>"
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