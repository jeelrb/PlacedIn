import React, { useEffect, useState } from "react";
import Avatar from '@material-ui/core/Avatar';
import axios from 'axios'
import Navbar from './Navbar';
import Chip from '@material-ui/core/Chip';
import LinearProgress from '@material-ui/core/LinearProgress';
import { MDBContainer,MDBCol,MDBRow, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBIcon } from "mdbreact";

function Profile(props){

    const [ userData, setUserData ] = useState({
        name: '',
        avatar: '',
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

    const [ isLoading, setIsLoading ] = useState(true)

    useEffect(() => {

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

                const res = await axios.get(`/profile/${userId}`, config)
                
                const { cfUserName, ccUserName, githubUserName, education, skills, company, portfolio,
                linkedIn, instagram, facebook, twitter, avatar } = res.data

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

                let res1, res2, res3
                let  cfRating, cfMaxRating, cfRank, cfMaxRank, cfProfile, ccRank, ccRating, ccMaxRating, ccMaxRank, ccProfile, githubRepos

                await Promise.all([
                    cfUserName && await axios.get(`https://competitive-coding-api.herokuapp.com/api/codeforces/${cfUserName}`),
                    ccUserName && await axios.get(`https://competitive-coding-api.herokuapp.com/api/codechef/${ccUserName}`),
                    githubUserName && await axios.get(`https://api.github.com/users/${githubUserName}/repos`)
                ])
                .then( async ([cf, cc, github]) => {
                    res1 = cf
                    res2 = cc
                    res3 = github
                })
                .catch(error => {
                    console.log(error)
                }) 

    
                if(typeof res1 !== 'undefined') {
                    cfRating =  res1.data.rating
                    cfMaxRating =  res1['data']['max rating']
                    cfRank =  res1.data.rank
                    cfMaxRank = res1['data']['max rank']
                    cfProfile =  `https://codeforces.com/profile/${cfUserName}`
                }
                
                if(typeof res2 !== 'undefined') {
                    ccRating = res2.data.rating
                    ccMaxRating =  res2.data.highest_rating
                    ccRank =  Number(res2.data.stars[0])
                    ccProfile =  `https://www.codechef.com/users/${ccUserName}`
                    if(ccMaxRating<=1399)ccMaxRank = 1
                    else if(ccMaxRating<=1599)ccMaxRank = 2
                    else if(ccMaxRating<=1799)ccMaxRank = 3
                    else if(ccMaxRating<=1999)ccMaxRank = 4
                    else if(ccMaxRating<=2199)ccMaxRank = 5
                    else if(ccMaxRating<=2499)ccMaxRank = 6
                    else ccMaxRank = 7
                }
                
                let githubProfile
                if(typeof res3 !== 'undefined') {
                    githubRepos = res3.data.map((repo) => {
                        return { name: repo.name, fullName: repo.full_name, id: repo.id }
                    })
    
                    githubProfile = `https://github.com/${githubUserName}`
                }

                setUserData({ skills: userSkills, name: res.data.userId.name, company, portfolio, twitter, instagram, linkedIn, facebook, college, degree, branch, batch, cfUserName, ccUserName, cfRating, ccRating, cfRank, ccRank, cfMaxRating, ccMaxRating, cfMaxRank, ccMaxRank, cfProfile, ccProfile, githubUserName, githubRepos, githubProfile, avatar })
                setIsLoading(false)

                localStorage.setItem('user', JSON.stringify({ skills: userSkills, name: res.data.userId.name, avatar, company, portfolio, twitter, instagram, linkedIn, facebook, college, degree, branch, batch, cfUserName, ccUserName, cfRating, ccRating, cfRank, ccRank, cfMaxRating, ccMaxRating, cfMaxRank, ccMaxRank, cfProfile, ccProfile, githubUserName, githubRepos, githubProfile }))
    
            } catch (error) {
                console.log(error)
            }

        }

        if(localStorage.getItem('user')){
            setUserData(JSON.parse(localStorage.getItem('user')))
            setIsLoading(false)
        }
        else fetchUser()

        return () => {
            setIsLoading(true)
        }

    }, [])

    return(
        <>
            <Navbar ></Navbar>
            { isLoading && userData ?  <LinearProgress /> : <MDBContainer mt="4" className="mt-4 details_container">
                <MDBRow className="mt-4">
                    <MDBCol md="12">   
                        <MDBCard className="card_container text-center  mdb-color darken-1">
                            <MDBRow className="mb-4">
                                <MDBCol>
                                    <MDBCardBody className="mt-5">
                                    <Avatar src={userData.avatar ? `/images/${userData.avatar}` : ''} className="red mx-auto" style={{width: '200px', height: '200px'}}>{userData.name ? userData.name[0] : ''}</Avatar>
                                        <MDBCardTitle className="white-text mt-3">{userData.name}</MDBCardTitle>
                                        <MDBCardText className="white-text">{userData.company}</MDBCardText>
                                    </MDBCardBody>
                                </MDBCol>
                            </MDBRow>
                            { userData.portfolio && <MDBRow className="text-center mb-4">
                                <MDBCol>
                                     <a href={userData.portfolio} className="text-white"><Chip label='My Resume' color="secondary" className="mr-2 chips_logo"/></a>
                                </MDBCol>
                            </MDBRow> }
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
                            <hr className="hr-text" data-content="Education"></hr>
                            <MDBRow className="mb-4">
                                <MDBCardBody>
                                    <h6 className="white-text">{ userData.college }</h6>
                                    <h6 className="white-text">{ userData.degree } in { userData.branch }</h6>
                                    <h6 className="white-text">Batch - { userData.batch }</h6>
                                </MDBCardBody>
                            </MDBRow>
                            <hr className="hr-text" data-content="Skills"></hr>
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
                                        <a href={ userData.ccProfile }>
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
            </MDBContainer>}
        </>
    );
}

export default Profile;