import React, { useState, useEffect } from "react";
import Navbar from './Navbar'
import axios from 'axios'
import { Redirect } from 'react-router-dom';
import { MDBContainer,MDBRow,MDBCol,MDBCard,MDBCardBody,MDBIcon,MDBCardHeader,MDBCardTitle } from "mdbreact";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

function AddPost(props){

    const [ formData, setFormData ] = useState({
        title: '',
        text: ''
    })

    const [ isSubmitted, setIsSubmited ] = useState(false)

    useEffect(() => {

        if(props.location.postId) {
            console.log(props.location)
            setFormData({ title: props.location.title, text: props.location.text })
            localStorage.setItem('postId', props.location.postId)
            localStorage.setItem('title', props.location.title)
            localStorage.setItem('text', props.location.text)
        } else if ( localStorage.getItem('title') ) {
            setFormData({ title: localStorage.getItem('title'), text: localStorage.getItem('text') })
        }

        console.log(formData)

    }, [])

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

            if(localStorage.getItem('postId')) {

                const id = localStorage.getItem('postId')
                const res = await axios.put(`/post/my/${id}`, body, config)

                setIsSubmited(true)

                toast.success('Post updated successfully !', { 
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2000
                })

            } else {
                const res = await axios.post('/post/add', body, config)

                setIsSubmited(true)

                toast.success('Post added successfully !', { 
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2000
                })
            }

        } catch (error) {

            console.log(error.response.data.error)

        }

    }

    if(isSubmitted) {
        if(localStorage.getItem('title')) {
            localStorage.removeItem('title')
        } 
        if(localStorage.getItem('text')) {
            localStorage.removeItem('text')
        }
        if(localStorage.getItem('postId')) {
            localStorage.removeItem('postId')
            return <Redirect to='/dashboard/myposts' />
        }
        return <Redirect to='/dashboard' />
    }

    return(
        <>
        <Navbar />
        <MDBContainer className="mb-5 mt-5">
            <MDBRow>
                <MDBCol md="12">
                    <MDBCard>
                        <MDBCardHeader color="cyan darken-3">
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
                                                    data={formData.text}
                                                    onChange={ ( e, editor ) => {
                                                        const data = editor.getData();
                                                        setFormData({...formData, text: data})
                                                    } }
                                                    onReady={ editor => {
                                                        editor.setData(formData.text)
                                                    }}
                                                    config = {{
                                                        removePlugins: ['CKFinderUploadAdapter', 'CKFinder', 'EasyImage', 'Image', 'ImageCaption', 'ImageStyle', 'ImageToolbar', 'ImageUpload', 'MediaEmbed']
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-center"><button className="btn cyan darken-3 w-75 text-white font-weight-bold mt-5" type="submit">Add post<MDBIcon far icon="paper-plane" className="ml-2" /></button></div>
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