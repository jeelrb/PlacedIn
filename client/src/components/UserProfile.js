import React, { useEffect, useState, useRef } from "react";
import { Link } from 'react-router-dom'
import axios from 'axios'
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import purple from '@material-ui/core/colors/purple';
import { MDBContainer,MDBCol,MDBRow, MDBCard, MDBCardFooter, MDBCardBody, MDBCardTitle, MDBCardText, MDBIcon, MDBBtn } from "mdbreact";

function UserProfile() {

    const [ myProfile, setMyProfile ] = useState({})
    const [ isProfile, setIsProfile ] = useState(true)

    useEffect(() => {

        const fetchMyProfile = async () => {

            try {

                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': localStorage.getItem('token')
                    }
                }

                const res = await axios.get(`http://localhost:5000/profile/me`, config)
    
                setMyProfile(res)
                setIsProfile(true)

            } catch (error) {
                
                setIsProfile(false)

            }

        }

        fetchMyProfile()

    }, [])

    return(
         <MDBCol className="profile pb-4 mt-4 " xl="4">
            { isProfile ? <MDBCard className="profile_container mdb-color darken-1 mb-5">
                <MDBRow>
                    <MDBCol className="text-center">
                          <MDBCardBody className="mt-3">
                            <Avatar src={myProfile.data ? `/images/${myProfile.data.avatar}` : ''} className="red mx-auto" style={{width: '100px', height: '100px'}}>{myProfile.data ? myProfile.data.userId.name[0] : ''}</Avatar>
                            <MDBCardTitle className="text-white font-weight-bold mt-3">{myProfile.data ? myProfile.data.userId.name : ''}</MDBCardTitle>
                            <MDBCardText className="text-white">{myProfile.data ? myProfile.data.company : ''}</MDBCardText>
                            <hr className="hr-text mt-5 mb-5" data-content="Your Education"></hr>
                            <MDBCardText className="text-white">{myProfile.data ? myProfile.data.education[0].college : ''}</MDBCardText>
                            <MDBCardText className="text-white">{myProfile.data ? `${myProfile.data.education[0].degree} in ${myProfile.data.education[0].branch}` : ''}</MDBCardText>
                            <MDBCardText className="text-white">{myProfile.data ? `Batch : ${myProfile.data.education[0].batch}` : ''}</MDBCardText>
                            <hr className="hr-text mt-5 mb-5" data-content="Your Actions"></hr>
                            <MDBRow>
                                <MDBCol>
                                <Link to={{pathname: 'dashboard/myposts'}}><Chip label='Posts' color="secondary" className="mr-2 chips_logo"/></Link>
                                <Link to={{pathname: 'dashboard/myinterviewexperiences'}}><Chip label='Interview Experiences' color="default" className="mr-2 chips_logo"/></Link>
                                <Link to={{ pathname: '/dashboard/profileSettings' }}><Chip label='Profile Settings' color='primary' className='chips_logo'/></Link>
                                </MDBCol>
                            </MDBRow>
                            <hr className="hr-text mt-5" data-content=""></hr>
                            <MDBRow>
                            <MDBCol className="text-center">
                            { myProfile.data && myProfile.data.linkedIn && <a href={myProfile.data.linkedIn} className='px-2 fa-lg li-ic text-white profile_logo'>
                                <MDBIcon fab icon='linkedin-in'></MDBIcon>
                            </a> }
                            { myProfile.data && myProfile.data.instagram && <a href={myProfile.data.instagram} className='px-2 fa-lg fb-ic text-white profile_logo'>
                                <MDBIcon fab icon='instagram'></MDBIcon>
                            </a> }
                            { myProfile.data && myProfile.data.twitter && <a href={myProfile.data.twitter} className='px-2 fa-lg tw-ic text-white profile_logo'>
                                <MDBIcon fab icon='twitter'></MDBIcon>
                            </a> }
                            { myProfile.data && myProfile.data.facebook && <a href={myProfile.data.facebook} className='px-2 fa-lg fb-ic text-white profile_logo'>
                                    <MDBIcon fab icon='facebook-f'></MDBIcon>
                            </a> }
                            </MDBCol>
                            </MDBRow>
                        </MDBCardBody>
                    </MDBCol>
                </MDBRow> 
            </MDBCard> : 
                <Link to={{ pathname: '/dashboard/profileSettings' }}>
                    <MDBBtn  className='chips_logo w-100 h-30 mx-auto' color='info'>Profile Settings</MDBBtn>
                </Link>
             }
        </MDBCol>
    )
}

export default UserProfile