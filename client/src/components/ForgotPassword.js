import React, { useState } from 'react'
import { Redirect } from 'react-router-dom';
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { MDBContainer,MDBRow,MDBCol,MDBCard,MDBCardBody,MDBIcon,MDBCardHeader,MDBCardTitle } from "mdbreact";

function ForgotPassword() {

    const [ formData, setFormdata ] = useState({
        username: '',
        password1: '',
        password2: '',
    })

    const [ isSubmitted, setIsSubmitted ] = useState(false)

    const onSubmit = async (e) => {

        e.preventDefault()

        try {

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                }
            }

            if(formData.username===''){
                return toast.error('Enter username', { 
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2000
                })
            }

            if(formData.password1===''){
                return toast.error('Enter new password', { 
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2000
                })
            }

            if(formData.password1!==formData.password2) {
                return toast.error('Password does not match!', { 
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2000
                })
            }

            const body = { username: formData.username, password: formData.password1 }

            const res = await axios.put('http://localhost:5000/forgot-password', body, config)

            setIsSubmitted(true)

            toast.success('Password changed successfully !', { 
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000
            })

        } catch ( error ) {

            toast.error(`${error.response.data.errors[0].msg}`, { 
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000
            })

        }

    }
    
    if(isSubmitted) {
        return <Redirect to='/' />
    }

    return (
        <MDBContainer className="mb-5 mt-5">
            <MDBRow>
                <MDBCol md="12">
                    <MDBCard>
                        <MDBCardHeader color="cyan darken-3">
                            <MDBCardTitle className="text-center text-white font-weight-bolder mt-2">Forgot Password</MDBCardTitle>
                        </MDBCardHeader>
                        <MDBCardBody>
                            <form onSubmit={e => onSubmit(e)}>
                                <div className="mt-5">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="form-group focused">
                                                <input type="text" 
                                                    value={formData.username} 
                                                    onChange={e => setFormdata({...formData, username: e.target.value})}
                                                    className="form-control form-control-alternative" 
                                                    placeholder="Enter your username" 
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="form-group focused">
                                                <input type="password" 
                                                    value={formData.password1} 
                                                    onChange={e => setFormdata({...formData, password1: e.target.value})}
                                                    className="form-control form-control-alternative" 
                                                    placeholder="Enter new password" 
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="form-group focused">
                                                <input type="password" 
                                                    value={formData.password2} 
                                                    onChange={e => setFormdata({...formData, password2: e.target.value})}
                                                    className="form-control form-control-alternative" 
                                                    placeholder="Confirm new password" 
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-center mb-5"><button className="btn cyan darken-3 w-75 text-white font-weight-bold mt-5" type="submit">Change Password<MDBIcon far icon="paper-plane" className="ml-2" /></button></div>
                                </div>
                            </form>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    )
}

export default ForgotPassword
