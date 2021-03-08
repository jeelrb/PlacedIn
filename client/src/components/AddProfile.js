import React, { useState, useEffect } from "react";
import axios from 'axios'
import Navbar from './Navbar';
import DisplayError from './DisplayError'
import { BrowserRouter as Router, Redirect } from 'react-router-dom';

function AddProfile(){

    const [ profile, setProfile ] = useState({
        skills: '',
        company: '',
        portfolio: '',
        linkedIn: '',
        instagram: '',
        facebook: '',
        twitter: '',
        college: '',
        degree: '',
        branch: '',
        batch: '',
        cfUserName: '',
        cfRating: '',
        cfMaxRating: '',
        cfRank: '',
        cfMaxRank: '',
        cfProfile: '',
        ccUserName: '',
        ccRating: '',
        ccMaxRating: '',
        ccStars: '',
        ccProfile: '',
        githubUserName: '',
        githubRepos: []
    })

    const [ isSubmited, setIsSubmited ] = useState(false)

    const [ errors, setErrors ] = useState({
        cfUserNameError: '',
        ccUserNameError: '',
        githubUserName: '',
        batchError: ''
    })

    const onSubmit = async (e) => {

        e.preventDefault()
        console.log(profile)

        let cfUserNameError='', ccUserNameError='', githubUserNameError='', batchError=''
        let res1, res2, res3, res4, res5;
        try{
            res1 = await axios.get(`https://competitive-coding-api.herokuapp.com/api/codeforces/${profile.cfUserName}`)
            if(res1.data.status==='Failed'){
                cfUserNameError = 'Please enter valid codeforces user handle'
            }
            res2 = await axios.get(`https://competitive-coding-api.herokuapp.com/api/codechef/${profile.ccUserName}`)
            if(res2.data.status==='Failed'){
                ccUserNameError = 'Please enter valid codechef user handle'
            }
            res3 = await axios.get(`https://api.github.com/users/${profile.githubUserName}/repos`)

        } catch ( error ){
            if(error.response.data.message==='Not Found'){
                githubUserNameError = 'Please enter valid github username'
            }
        }

        if( cfUserNameError || ccUserNameError || githubUserNameError ) {
            return setErrors({ cfUserNameError, ccUserNameError, githubUserNameError })
        }
        
        setProfile({ ...profile, 
            cfRating: res1.data.rating,
            cfMaxRating: res1.data.['max rating'],
            cfRank: res1.data.rank, 
            cfMaxRank: res1.data.['max rank'],
            cfProfile: `https://codeforces.com/profile/${profile.cfUserName}`,
            ccRating: res2.data.rating,
            ccMaxRating: res2.data.highest_rating,
            ccStars: res2.data.stars,
            ccProfile: `https://www.codechef.com/users/${profile.ccUserName}`,
            githubRepos: res3.data
        })

        const { portfolio, linkedIn, facebook, instagram, twitter, skills, company } = profile
        const { cfUserName, cfRating, cfMaxRating, cfRank, cfMaxRank, cfProfile } = profile
        const { ccUserName, ccRating, ccMaxRating, ccStars, ccProfile } = profile
        const { githubUserName, githubRepos } = profile
        const { college, branch, batch, degree } = profile

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                }
            }
            const profileInfo = { portfolio, linkedIn, facebook, instagram, twitter, skills, company }
            const cfInfo = { cfUserName, cfRating, cfMaxRating, cfRank, cfMaxRank, cfProfile }
            const ccInfo = { ccUserName, ccRating, ccMaxRating, ccStars, ccProfile }
            const githubInfo = { githubUserName, githubRepos }
            const eduInfo = { college, branch, batch, degree }

            res1 = await axios.post('http://localhost:5000/profile', profileInfo, config)
            res2 = await axios.put('http://localhost:5000/profile/codeforcesProfile', cfInfo, config)
            res3 = await axios.put('http://localhost:5000/profile/codechefProfile', ccInfo, config)
            res4 = await axios.put('http://localhost:5000/profile/githubProfile', githubInfo, config)
            res5 = await axios.put('http://localhost:5000/profile/education', eduInfo, config)

            console.log(res1)
            console.log(res2)
            console.log(res3)
            console.log(res4)
            console.log(res5)

            setIsSubmited(true)

        } catch (error) {
            console.log(error.response)
        }
        
    }

    if(isSubmited) {
        return <Redirect to='/dashboard' />
    }

    return (
        <Router>
            <Navbar />
                <div className="container mt-4">
                <div className="card shadow">
                    <div className="card-header border-0">
                        <div className="row">
                            <div className="col-12">
                                <h3 className="mb-0 text-white profileForm_header">My account</h3>
                            </div>
                        </div>
                    </div>
                <div className="card-body">
                <form className="needs-validation" onSubmit={ e => onSubmit(e) } >
                <h6 className="heading-small text-muted mb-4">Education and Profesional Details</h6>
                    <div className="pl-lg-4">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group focused">
                                    <label className="form-control-label" for="input-college">College <span className="text-danger">*</span></label>
                                    <input id="input-12" className="form-control form-control-alternative" placeholder="Enter College / University Name" 
                                    type="text" value = {profile.college} onChange={ e => setProfile({...profile, college: e.target.value }) } required />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group focused">
                                    <label className="form-control-label" for="input-degree">Degree <span className="text-danger">*</span></label>
                                    <input id="input-10" className="form-control form-control-alternative" placeholder="Enter Degree ( Eg. B.Tech )" 
                                    type="text" value = {profile.degree} onChange={ e => setProfile({...profile, degree: e.target.value }) } required />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group focused">
                                    <label className="form-control-label" for="input-fieldofstudy">Field of Study <span className="text-danger">*</span></label>
                                    <input id="input-job" className="form-control form-control-alternative" placeholder="Enter Field of study" 
                                    type="text" value = {profile.branch} onChange={ e => setProfile({...profile, branch: e.target.value }) } required />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group focused">
                                    <label className="form-control-label" for="input-batch">Batch <span className="text-danger">*</span></label>
                                    <input id="input-job" className="form-control form-control-alternative" placeholder="Enter your passing year ( Eg. 2022 )" 
                                    type="string" value = {profile.batch} onChange={ e => setProfile({...profile, batch: e.target.value }) } required />
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-group focused">
                                    <label className="form-control-label" for="input-company">Company</label>
                                    <input id="input-job" className="form-control form-control-alternative" placeholder="Enter name of the company you are placed in" 
                                    type="text" value={ profile.company } onChange={ e => setProfile({...profile, company: e.target.value }) } />
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className="my-4 bg-primary" />
                    <h6 className="heading-small text-muted mb-4">Skills</h6>
                    <div className="pl-lg-4">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group focused">
                                    <label className="form-control-label" for="input-skill1">Skills <span className="text-danger">*</span></label>
                                    <input id="input-skill1" className="form-control form-control-alternative" placeholder="Enter comma separated values" 
                                    type="text" value={ profile.skills } onChange={ e => setProfile({...profile, skills: e.target.value }) } required />
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className="my-4 bg-primary"></hr>
                    <h6 className="heading-small text-muted mb-4">Coding Platform information</h6>
                    <div className="pl-lg-4">
                        <div className="row">
                            <div className="col-lg-4">
                                <div className="form-group focused">
                                    <label className="form-control-label" for="input-codeforces">Codeforces</label>
                                    <input id="input-codeforces" className="form-control form-control-alternative" placeholder="Enter Codeforced Handle" 
                                    type="text"  value={ profile.cfUserName } onChange={ e => setProfile({...profile, cfUserName: e.target.value }) } />
                                </div>
                                { errors.cfUserNameError && <DisplayError error={ errors.cfUserNameError }/> }
                            </div>
                            <div className="col-lg-4">
                                <div className="form-group focused">
                                    <label className="form-control-label" for="input-codechef">Codechef</label>
                                    <input type="text" id="input-codechef" className="form-control form-control-alternative" placeholder="Enter Codechef Handle" 
                                        value={ profile.ccUserName } onChange={ e => setProfile({...profile, ccUserName: e.target.value }) }
                                    />
                                </div>
                                { errors.ccUserNameError && <DisplayError error={ errors.ccUserNameError }/> }
                            </div>
                            <div className="col-lg-4">
                                <div className="form-group focused">
                                    <label className="form-control-label" for="input-github">Github</label>
                                    <input type="text" id="input-github" className="form-control form-control-alternative" placeholder="Enter Github ID" 
                                        value={ profile.githubUserName } onChange={ e => setProfile({...profile, githubUserName: e.target.value }) }
                                    />
                                </div>
                                { errors.githubUserNameError && <DisplayError error={ errors.githubUserNameError }/> }
                            </div>
                        </div>
                    </div>
                    <hr className="bg-primary"></hr>
                    <h6 className="heading-small text-muted mb-4">Social information</h6>
                    <div className="pl-lg-4">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="form-group focused">
                                    <label className="form-control-label" for="input-website">Portfolio Website</label>
                                    <input type="text" id="input-website" className="form-control form-control-alternative" placeholder="Enter your Website Here" 
                                     value={ profile.portfolio }   onChange={ e => setProfile({...profile, portfolio: e.target.value }) } />
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="form-group focused">
                                    <label className="form-control-label" for="input-linkedin">Linkedin</label>
                                    <input type="text" id="input-linkedin" className="form-control form-control-alternative" placeholder="Enter Linkedin ID" 
                                        value={ profile.linkedIn }   onChange={ e => setProfile({...profile, linkedIn: e.target.value }) }
                                    />
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="form-group">
                                    <label className="form-control-label" for="input-insta">Instagram</label>
                                    <input type="text" id="input-insta" className="form-control form-control-alternative" placeholder="Enter Instagram ID" 
                                        value={ profile.instagram }   onChange={ e => setProfile({...profile, instagram: e.target.value }) }
                                    />
                                </div>
                            </div>
                            
                            <div className="col-lg-6">
                                <div className="form-group focused">
                                    <label className="form-control-label" for="input-twitter">Twitter</label>
                                    <input type="text" id="input-twitter" className="form-control form-control-alternative" placeholder="Enter Twitter ID" 
                                        value={ profile.twitter }   onChange={ e => setProfile({...profile, twitter: e.target.value }) }
                                    />
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="form-group focused">
                                    <label className="form-control-label" for="input-facebook">Facebook</label>
                                    <input type="text" id="input-facebook" className="form-control form-control-alternative" placeholder="Enter Facebook ID" 
                                        value={ profile.facebook }   onChange={ e => setProfile({...profile, facebook: e.target.value }) }
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <br></br>
                    <button className="btn btn-1 text-white" type="submit">Submit</button>
                    <button className="btn btn-2 text-black" type="submit">Go back</button>
                </form>
                </div>
            </div>
        </div>
        </Router>
    )
}

export default AddProfile;