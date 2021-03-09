import React from "react";
import Navbar from './Navbar';
import { BrowserRouter as Router } from 'react-router-dom';
import { MDBContainer,MDBCol,MDBRow, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText } from "mdbreact";

function Profile(){
    return(
        <Router>
            <Navbar></Navbar>
            <MDBContainer mt="4" className="details_container">
                <MDBRow className="mt-3">
                    <MDBCol md="4">
                        <MDBCard className="text-center">
                            <MDBCardBody>
                            <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" class="rounded-circle" width="150"></img>
                                <MDBCardTitle className="mt-3">Hrujul Thumar</MDBCardTitle>
                                <MDBCardText><h5>Deutsche Bank</h5></MDBCardText>
                                <MDBCardText>Kokilaben Dhirubhai Ambani Vidyamandir</MDBCardText>
                            </MDBCardBody>
                        </MDBCard>
                        <MDBCard className="mt-5 text-center">
                            <MDBCardBody>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                    <h6 class="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-globe mr-2 icon-inline"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>Portfolio Website</h6>
                                    <span class="text-secondary">https://bootdey.com</span>
                                </li>
                                <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                    <h6 class="mb-0"><svg xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" width="1em" height="1em"  preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none" stroke="#626262" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2a2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><path d="M2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></g></svg>      LinkedIn</h6>
                                    <span class="text-secondary">bootdey</span>
                                </li>
                                <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                    <h6 class="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-twitter mr-2 icon-inline text-info"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>Twitter</h6>
                                    <span class="text-secondary">@Hrujul</span>
                                </li>
                                <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                    <h6 class="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-instagram mr-2 icon-inline text-danger"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>Instagram</h6>
                                    <span class="text-secondary">@hrujul</span>
                                </li>
                                <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                    <h6 class="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-facebook mr-2 icon-inline text-primary"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>Facebook</h6>
                                    <span class="text-secondary">@hrujul</span>
                                </li>
                            </ul>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                    <MDBCol md="8">
                        <MDBCard className="text-center">
                            <MDBCardBody>
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <h6 class="mb-0"><img className="profile-img" src="https://lh3.googleusercontent.com/WsR_f03nbqW3qZjCZeXUYmnmhSWXo3hQhLX9hgl9QHydCgbXQi_VJeAwnmtuIgTHKdQ=s200" alt="" width="50"></img> Codeforces</h6>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        @HrujulThumar22
                                    </MDBCol>
                                </MDBRow>
                                <hr></hr>
                                <MDBRow>
                                    <MDBCol sm="3">
                                    <h6 class="mb-0"><img className="profile-img" src="https://res-4.cloudinary.com/crunchbase-production/image/upload/c_lpad,f_auto,q_auto:eco/zruiknbedz8yqafxbazb" alt="" width="50"></img> Codechef</h6>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        @HrujulThumar22
                                    </MDBCol>
                                </MDBRow>
                                <hr></hr>
                                <MDBRow>
                                    <MDBCol sm="3">
                                    <h6 class="mb-0"><img className="profile-img" src="https://image.flaticon.com/icons/png/512/25/25231.png" alt="" width="50"></img> Github</h6>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        @HrujulThumar22
                                    </MDBCol>
                                </MDBRow>
                            </MDBCardBody>
                        </MDBCard>
                        <MDBRow className="mt-3">
                            <MDBCol sm="6">
                                <MDBCard>
                                    <MDBCardBody>
                                        <MDBCardTitle className="mt-3">Skills</MDBCardTitle>
                                        <MDBCardText>   
                                            <div>
                                                C++
                                            </div>
                                            <div>
                                                C
                                            </div>
                                            <div>
                                                Java
                                            </div>
                                            <div>
                                                Javascript
                                            </div>
                                            <div>
                                                Data Structures
                                            </div>
                                            <div>
                                                Algo
                                            </div>
                                        </MDBCardText>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                            <MDBCol sm="6">
                                <MDBCard>
                                    <MDBCardBody>
                                        <MDBCardTitle className="mt-3">Github</MDBCardTitle>
                                        <MDBCardText>   
                                            <div>
                                                C++
                                            </div>
                                            <div>
                                                C
                                            </div>
                                            <div>
                                                Java
                                            </div>
                                            <div>
                                                Javascript
                                            </div>
                                            <div>
                                                Data Structures
                                            </div>
                                            <div>
                                                Algo
                                            </div>
                                        </MDBCardText>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                            <MDBCol sm="12" className="my-3">
                                <MDBCard>
                                    <MDBCardBody>
                                        <MDBCardTitle className="mt-3">Interview Experience</MDBCardTitle>
                                        <MDBCardText>   
                                            <div>
                                                C++
                                            </div>
                                            <div>
                                                C
                                            </div>
                                            <div>
                                                Java
                                            </div>
                                            <div>
                                                Javascript
                                            </div>
                                            <div>
                                                Data Structures
                                            </div>
                                            <div>
                                                Algo
                                            </div>
                                        </MDBCardText>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                        </MDBRow>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </Router>
    );
}

export default Profile;