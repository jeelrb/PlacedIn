import React, { useEffect, useState } from "react";
import axios from 'axios'
import Navbar from './Navbar';
import { MDBContainer,MDBCol,MDBRow, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBIcon } from "mdbreact";

function Profile(props){

    const [ userData, setUserData ] = useState({
        name: '',
        company: '',
        twitter: '',
        instagram: '',
        facebook: '',
        linkedIn: '',
        portfolio: '',
        college: '',
        degree: '',
        branch: '',
        batch: '',
        skills: '',
        cfUserName: '',
        cfRating: '',
        cfRank: '',
        cfMaxRating: '',
        cfMaxRank: '',
        cfProfile: '',
        ccUserName: '',
        ccRating: '',
        ccRank: '',
        ccMaxRating: '',
        ccMaxRank: '',
        ccProfile: '',
        githubUserName: '',
        githubRepos: [],
        githubProfile: ''
    })

    useEffect(() => {
        console.log(localStorage.getItem('userData'))
        const fetchUser = async () => {

            if(localStorage.getItem('user')){
                localStorage.removeItem('user')
            }

            try{

                const userId = props.location.userId

                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': localStorage.getItem('token')
                    }
                }

                const res = await axios.get(`http://localhost:5000/profile/${userId}`, config)
                
                const { codeforcesProfile, codechefProfile, education, github, skills, company, portfolio,
                linkedIn, instagram, facebook, twitter } = res.data

                const { college, branch, batch, degree } = education[0]

                const temp = skills.toString()
                let userSkills=''
                for(let i=0;i<temp.length;i++){
                    if(temp[i]===','){
                        userSkills+=', '
                    }else{
                        userSkills+=temp[i]
                    }
                }

                let cfUserName, cfRating, cfMaxRating, cfRank, cfMaxRank, cfProfile, ccUserName, ccRank, ccRating, ccMaxRating, ccMaxRank, ccProfile, githubUserName, githubRepos
                if(codeforcesProfile){
                    cfUserName = codeforcesProfile.cfUserName
                    cfRating = codeforcesProfile.cfRating
                    cfMaxRating = codeforcesProfile.cfMaxRating
                    cfRank = codeforcesProfile.cfRank
                    cfMaxRank = codeforcesProfile.cfMaxRank
                    cfProfile = codeforcesProfile.cfProfile
                }
                if(codechefProfile){
                    ccUserName  = codechefProfile.ccUserName 
                    ccRating = codechefProfile.ccRating 
                    ccMaxRating = codechefProfile.ccMaxRating
                    ccRank = Number(codechefProfile.ccStars[0]) 
                    if(ccMaxRating<=1399)ccMaxRank = 1
                    else if(ccMaxRating<=1599)ccMaxRank = 2
                    else if(ccMaxRating<=1799)ccMaxRank = 3
                    else if(ccMaxRating<=1999)ccMaxRank = 4
                    else if(ccMaxRating<=2199)ccMaxRank = 5
                    else if(ccMaxRating<=2499)ccMaxRank = 6
                    else ccMaxRank = 7
                    ccProfile = codechefProfile.ccProfile 
                }
                if(github){
                    githubUserName = github.githubUserName
                    githubRepos = github.githubRepos.map((repo) => {
                        return { name: repo.name, fullName: repo.full_name, id: repo.id }
                    })
                }

                const githubProfile = `https://github.com/${githubUserName}`

                setUserData({ skills: userSkills, name: res.data.userId.name, company, portfolio, twitter, instagram, linkedIn, facebook, college, degree, branch, batch, cfUserName, ccUserName, cfRating, ccRating, cfRank, ccRank, cfMaxRating, ccMaxRating, cfMaxRank, ccMaxRank, cfProfile, ccProfile, githubUserName, githubRepos, githubProfile })

                localStorage.setItem('user', JSON.stringify({ skills: userSkills, name: res.data.userId.name, company, portfolio, twitter, instagram, linkedIn, facebook, college, degree, branch, batch, cfUserName, ccUserName, cfRating, ccRating, cfRank, ccRank, cfMaxRating, ccMaxRating, cfMaxRank, ccMaxRank, cfProfile, ccProfile, githubUserName, githubRepos, githubProfile }))
                // console.log(userData.githubRepos)
    
            } catch (error) {
                console.log(error.response.data.msg)
            }

        }

        if(props.location.userId) fetchUser()
        else setUserData(JSON.parse(localStorage.getItem('user')))

    }, [])

    return(
        <>
            <Navbar ></Navbar>
            <MDBContainer mt="4" className="mt-4 details_container">
                <MDBRow className="mt-4">
                    <MDBCol md="12">   
                        <MDBCard className="card_container text-center  blue-grey darken-2">
                            <MDBRow className="mb-4">
                                <MDBCol>
                                    <MDBCardBody className="mt-5">
                                        <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" className="rounded-circle white" width="200"></img>
                                        <MDBCardTitle className="white-text mt-3">{userData.name}</MDBCardTitle>
                                        <MDBCardText className="white-text">{userData.company}</MDBCardText>
                                    </MDBCardBody>
                                </MDBCol>
                            </MDBRow>
                            <MDBRow className="mb-4 text-center">
                                <MDBCol className="text-center">
                                    {
                                        userData.twitter && <a href={userData.twitter}>
                                        <MDBIcon size="2x" className="white-text pr-4 profile_logo" fab icon="twitter" />
                                        </a>
                                    }
                                    {
                                        userData.instagram && <a href={userData.instagram}>
                                        <MDBIcon size="2x" className="white-text pr-4 profile_logo" fab icon="instagram" />
                                        </a>
                                    }
                                    {
                                        userData.facebook && <a href={userData.facebook}>
                                        <MDBIcon size="2x" className="white-text pr-4 profile_logo" fab icon="facebook" />
                                        </a>
                                    }
                                    {
                                        userData.linkedIn && <a href={userData.linkedIn}>
                                        <MDBIcon size="2x" className="white-text pr-4 profile_logo" fab icon="linkedin" />
                                        </a>
                                    }
                                </MDBCol>
                            </MDBRow>
                            <hr class="hr-text" data-content="Education"></hr>
                            <MDBRow className="mb-4">
                                <MDBCardBody>
                                    <h6 className="white-text">{ userData.college }</h6>
                                    <h6 className="white-text">{ userData.degree } in { userData.branch }</h6>
                                    <h6 className="white-text">Batch - { userData.batch }</h6>
                                </MDBCardBody>
                            </MDBRow>
                            <hr class="hr-text" data-content="Skills"></hr>
                            <MDBRow className="mb-4">
                                <MDBCardBody>
                                    <h6 className="white-text">
                                        { userData.skills }
                                    </h6>
                                </MDBCardBody>
                            </MDBRow>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>{ (userData.cfUserName || userData.ccUserName) && 
                <MDBRow className="mt-5">{ userData.cfUserName && 
                    <MDBCol className="mb-5" md="6">
                        <MDBCard className="text-center">
                            <MDBCardBody>
                                <MDBRow>
                                    <MDBCol md="12">
                                        <MDBRow>
                                            <MDBCol className="text-center mt-4"><h5 className="font-weight"><img className="profile-img" src="https://lh3.googleusercontent.com/WsR_f03nbqW3qZjCZeXUYmnmhSWXo3hQhLX9hgl9QHydCgbXQi_VJeAwnmtuIgTHKdQ=s200" alt="" width="50"></img>Codeforces</h5></MDBCol>
                                        </MDBRow>
                                        <br/>
                                        <h5 className="text-info font-weight-bolder">{ userData.cfRating }</h5>
                                        <h6 className="text-muted">Codeforces Rating</h6><hr />
                                        <h5 className="text-info font-weight-bolder">{ userData.cfRank }</h5>
                                        <h6 className="text-muted">Codeforces Rank</h6><hr />
                                        <h5 className="text-danger font-weight-bolder">{ userData.cfMaxRating }</h5>
                                        <h6 className="text-muted">Highest Rating</h6><hr></hr>
                                        <h5 className="text-danger font-weight-bolder">{ userData.cfMaxRank }</h5>
                                        <h6 className="text-muted">Highest Rank</h6><br /><br />
                                    </MDBCol>
                                    <MDBCol className="text-muted text-center" md="12">
                                        <a href={userData.cfProfile}>
                                            <h5 className='text-primary'>See profile
                                                <MDBIcon icon='chevron-right' className='ml-2' size='sm'></MDBIcon>
                                            </h5>
                                        </a>    
                                    </MDBCol>
                                </MDBRow>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>}{ userData.ccUserName &&  
                    <MDBCol className="mb-5" md="6">
                        <MDBCard className="text-center">
                            <MDBCardBody>
                                <MDBRow>
                                    <MDBCol md="12">
                                        <MDBRow>
                                            <MDBCol className="text-center mt-4"><h5 className="font-weight"><img className="profile-img" src="https://res-4.cloudinary.com/crunchbase-production/image/upload/c_lpad,f_auto,q_auto:eco/zruiknbedz8yqafxbazb" alt="" width="50"></img>Codechef</h5></MDBCol>
                                        </MDBRow>
                                        <br/>
                                        <h5 className="text-info font-weight-bolder">{ userData.ccRating }</h5>
                                        <h6 className="text-muted">Codechef Rating</h6><hr />
                                        <h5 className="text-info font-weight-bolder">{ userData.ccRank } <MDBIcon icon="star" /></h5>
                                        <h6 className="text-muted">Codechef Rank</h6><hr />
                                        <h5 className="text-danger font-weight-bolder">{ userData.ccMaxRating }</h5>
                                        <h6 className="text-muted">Highest Rating</h6><hr />
                                        <h5 className="text-danger font-weight-bolder">{ userData.ccMaxRank } <MDBIcon icon="star" /></h5>
                                        <h6 className="text-muted">Highest Rank</h6><br /><br />
                                    </MDBCol>
                                    <MDBCol className="text-muted" md="12">
                                        <a href={ userData.cfProfile }>
                                            <h5 className='text-primary'>See profile
                                                <MDBIcon icon='chevron-right' className='ml-2' size='sm'></MDBIcon>
                                            </h5>
                                        </a> 
                                    </MDBCol>
                                </MDBRow>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>}
                </MDBRow>}{ userData.githubUserName &&  
                <MDBRow className="mb-5">
                    <MDBCol>
                        <MDBCard className="blue-grey lighten-5">
                            <MDBCardBody className="mx-5">
                                <MDBRow>
                                    <MDBCol md="12" className="text-center mb-5 mt-5">
                                        <h5 className="mb-0"><img className="profile-img" src="https://image.flaticon.com/icons/png/512/25/25231.png" alt="" width="50"></img> Github</h5>
                                    </MDBCol>
                                </MDBRow>
                                {
                                    userData.githubRepos.map((repo) => {
                                        return (
                                            <div key={repo.id}>
                                                <MDBRow>
                                                    <MDBCol md="6"><h5 className="text-secondary font-weight-bolder text-center">{ repo.name }</h5></MDBCol>
                                                    <MDBCol md="6" className="text-center">
                                                        <a href={`https://github.com/${userData.githubUserName}/${repo.name}`}>
                                                            <h5 className='text-primary'>See Repo
                                                                <MDBIcon icon='chevron-right' className='ml-2' size='sm'></MDBIcon>
                                                            </h5>
                                                        </a>
                                                    </MDBCol>
                                                </MDBRow><hr />
                                            </div>
                                        )
                                    })
                                }
                                <MDBCol className="text-muted text-center mt-5" md="12">
                                        <a href={ userData.githubProfile }>
                                            <h5 className='text-primary'>See profile
                                                <MDBIcon icon='chevron-right' className='ml-2' size='sm'></MDBIcon>
                                            </h5>
                                        </a> 
                                </MDBCol>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>}
            </MDBContainer>
        </>
    );
}

export default Profile;