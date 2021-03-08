import React, { useState, useEffect } from "react";
import axios from 'axios'
import Navbar from './Navbar';
import DisplayError from './DisplayError'
import { BrowserRouter as Router, Redirect, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

toast.configure()
function AddProfile(){
    
    // State as object containing form fields
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
        ccUserName: '',
        githubUserName: '',
    })

    // State as boolean value to check if form is successfully submitted
    const [ isSubmited, setIsSubmited ] = useState(false)

    //State as object containing errors
    const [ errors, setErrors ] = useState({
        cfUserNameError: '',
        ccUserNameError: '',
        githubUserNameError: '',
        batchError: ''
    })

    const history = useHistory()

    // Useeffect ( Behaves as => ComponentDidMount ) to fetch data if user has added profile already and wants to edit
    useEffect(() => {

        //Async function to fetch user profile
        const FetchData = async() => {    
            try {
                //config object containing header with token 
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': localStorage.getItem('token')
                    }
                }

                //Sending get request to mentioned route
                const userProfile = await axios.get('http://localhost:5000/profile/me', config)

                //Destructuring the object returned from the get request
                const { codeforcesProfile, codechefProfile, education, github, skills, company, portfolio,
                linkedIn, instagram, facebook, twitter } = userProfile.data
                let cfUserName, ccUserName, githubUserName
                if(codeforcesProfile) cfUserName = codeforcesProfile.cfUserName
                if(codechefProfile) ccUserName  = codechefProfile.ccUserName 
                if(github) githubUserName = github.githubUserName
                const { college, branch, batch, degree } = education[0]
                
                //Skills is an array in database...so converting it to string to display in appropriate form
                const res = skills.toString()
                let userSkills=''
                for(let i=0;i<res.length;i++){
                    if(res[i]===','){
                        userSkills+=', '
                    }else{
                        userSkills+=res[i]
                    }
                }

                //Updating the state with the values received from get request
                setProfile({ skills: userSkills, company, portfolio, linkedIn, instagram, twitter, facebook, 
                college, degree, branch, batch, cfUserName, ccUserName, githubUserName  })

            } catch (error) {
                console.log(error)
            }

        }

        FetchData()

    }, [])


    //Async function to store / update user profile on submitting the form
    const onSubmit = async (e) => {

        e.preventDefault()

        console.log(profile)

        let cfUserNameError='', ccUserNameError='', githubUserNameError='', batchError=''
        let res1, res2, res3, res4, res5;

        //Sending get requests to third party api for getting cf, cc and github profiles of the user
        toast.info('Please wait', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1500
        })
        try{
            if(profile.cfUserName) {
                res1 = await axios.get(`https://competitive-coding-api.herokuapp.com/api/codeforces/${profile.cfUserName}`)
                if(res1.data.status==='Failed'){
                    cfUserNameError = 'Please enter valid codeforces user handle'
                }
            }
            if(profile.ccUserName) {
                res2 = await axios.get(`https://competitive-coding-api.herokuapp.com/api/codechef/${profile.ccUserName}`)
                if(res2.data.status==='Failed'){
                    ccUserNameError = 'Please enter valid codechef user handle'
                }
            }
            if(profile.githubUserName)
                res3 = await axios.get(`https://api.github.com/users/${profile.githubUserName}/repos`)

        } catch ( error ){
            if(error.response.data.message==='Not Found'){
                githubUserNameError = 'Please enter valid github username'
            }
        }

        // If username is not valid, update errors state
        if( cfUserNameError || ccUserNameError || githubUserNameError ) {
            return setErrors({ cfUserNameError, ccUserNameError, githubUserNameError })
        }
        
        //Destructuring the profile state to include these fields as body in post requests
        const { portfolio, linkedIn, facebook, instagram, twitter, skills, company } = profile
        const { college, branch, batch, degree } = profile

        //Body of the post request 
        const profileInfo = { portfolio, linkedIn, facebook, instagram, twitter, skills, company }

        const eduInfo = { college, branch, batch, degree }

        let cfInfo, ccInfo, githubInfo

        if(profile.cfUserName) {
            cfInfo = {
                cfUserName: profile.cfUserName,
                cfRating: res1.data.rating,
                cfMaxRating: res1['data']['max rating'],
                cfRank: res1.data.rank, 
                cfMaxRank: res1['data']['max rank'],
                cfProfile: `https://codeforces.com/profile/${profile.cfUserName}`,
            }
        }

        if(profile.ccUserName) {
            ccInfo = {
                ccUserName: profile.ccUserName,
                ccRating: res2.data.rating,
                ccMaxRating: res2.data.highest_rating,
                ccStars: res2.data.stars,
                ccProfile: `https://www.codechef.com/users/${profile.ccUserName}`,
            }
        }

        if(profile.githubUserName) {
            githubInfo = {
                githubUserName: profile.githubUserName,
                githubRepos: res3.data
            }
        }

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                }
            }

            //Sending post requests to our REST api to store / update user profile
            res1 = await axios.post('http://localhost:5000/profile', profileInfo, config)
            if(profile.cfUserName)res2 = await axios.put('http://localhost:5000/profile/codeforcesProfile', cfInfo, config)
            if(profile.ccUserName)res3 = await axios.put('http://localhost:5000/profile/codechefProfile', ccInfo, config)
            if(profile.githubUserName)res4 = await axios.put('http://localhost:5000/profile/githubProfile', githubInfo, config)
            res5 = await axios.put('http://localhost:5000/profile/education', eduInfo, config)

            //If no error occured then change isSubmit to true
            setIsSubmited(true)

            toast.success('Profile added successfully!!', { 
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000
             })

        } catch (error) {
            console.log(error.response)
        }
        
    }

    // If form submitted successfully then redirect to dashboard
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
                                    <label className="form-control-label" htmlFor="input-college">College <span className="text-danger">*</span></label>
                                    <input id="input-12" className="form-control form-control-alternative" placeholder="Enter College / University Name" 
                                    type="text" value = { profile.college || '' } onChange={ e => setProfile({...profile, college: e.target.value }) } required />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group focused">
                                    <label className="form-control-label" htmlFor="input-degree">Degree <span className="text-danger">*</span></label>
                                    <input id="input-10" className="form-control form-control-alternative" placeholder="Enter Degree ( Eg. B.Tech )" 
                                    type="text" value = { profile.degree || '' } onChange={ e => setProfile({...profile, degree: e.target.value }) } required />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group focused">
                                    <label className="form-control-label" htmlFor="input-fieldofstudy">Field of Study <span className="text-danger">*</span></label>
                                    <input id="input-job" className="form-control form-control-alternative" placeholder="Enter Field of study" 
                                    type="text" value = { profile.branch || ''} onChange={ e => setProfile({...profile, branch: e.target.value }) } required />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group focused">
                                    <label className="form-control-label" htmlFor="input-batch">Batch <span className="text-danger">*</span></label>
                                    <input id="input-job" className="form-control form-control-alternative" placeholder="Enter your passing year ( Eg. 2022 )" 
                                    type="string" value = { profile.batch || '' } onChange={ e => setProfile({...profile, batch: e.target.value }) } required />
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-group focused">
                                    <label className="form-control-label" htmlFor="input-company">Company</label>
                                    <input id="input-job" className="form-control form-control-alternative" placeholder="Enter name of the company you are placed in" 
                                    type="text" value={ profile.company || '' } onChange={ e => setProfile({...profile, company: e.target.value }) } />
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
                                    <label className="form-control-label" htmlFor="input-skill1">Skills <span className="text-danger">*</span></label>
                                    <input id="input-skill1" className="form-control form-control-alternative" placeholder="Enter comma separated values" 
                                    type="text" value={ profile.skills || '' } onChange={ e => setProfile({...profile, skills: e.target.value }) } required />
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
                                    <label className="form-control-label" htmlFor="input-codeforces">Codeforces</label>
                                    <input id="input-codeforces" className="form-control form-control-alternative" placeholder="Enter Codeforced Handle" 
                                    type="text"  value={ profile.cfUserName || '' } onChange={ e => setProfile({...profile, cfUserName: e.target.value }) } />
                                </div>
                                { errors.cfUserNameError && <DisplayError error={ errors.cfUserNameError }/> }
                            </div>
                            <div className="col-lg-4">
                                <div className="form-group focused">
                                    <label className="form-control-label" htmlFor="input-codechef">Codechef</label>
                                    <input type="text" id="input-codechef" className="form-control form-control-alternative" placeholder="Enter Codechef Handle" 
                                        value={ profile.ccUserName || '' } onChange={ e => setProfile({...profile, ccUserName: e.target.value }) }
                                    />
                                </div>
                                { errors.ccUserNameError && <DisplayError error={ errors.ccUserNameError }/> }
                            </div>
                            <div className="col-lg-4">
                                <div className="form-group focused">
                                    <label className="form-control-label" htmlFor="input-github">Github</label>
                                    <input type="text" id="input-github" className="form-control form-control-alternative" placeholder="Enter Github ID" 
                                        value={ profile.githubUserName || '' } onChange={ e => setProfile({...profile, githubUserName: e.target.value }) }
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
                                    <label className="form-control-label" htmlFor="input-website">Portfolio Website</label>
                                    <input type="text" id="input-website" className="form-control form-control-alternative" placeholder="Enter your Website Here" 
                                     value={ profile.portfolio || '' }   onChange={ e => setProfile({...profile, portfolio: e.target.value }) } />
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="form-group focused">
                                    <label className="form-control-label" htmlFor="input-linkedin">Linkedin</label>
                                    <input type="text" id="input-linkedin" className="form-control form-control-alternative" placeholder="Enter Linkedin ID" 
                                        value={ profile.linkedIn || '' }   onChange={ e => setProfile({...profile, linkedIn: e.target.value }) }
                                    />
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="form-group">
                                    <label className="form-control-label" htmlFor="input-insta">Instagram</label>
                                    <input type="text" id="input-insta" className="form-control form-control-alternative" placeholder="Enter Instagram ID" 
                                        value={ profile.instagram || '' }   onChange={ e => setProfile({...profile, instagram: e.target.value }) }
                                    />
                                </div>
                            </div>
                            
                            <div className="col-lg-6">
                                <div className="form-group focused">
                                    <label className="form-control-label" htmlFor="input-twitter">Twitter</label>
                                    <input type="text" id="input-twitter" className="form-control form-control-alternative" placeholder="Enter Twitter ID" 
                                        value={ profile.twitter || '' }   onChange={ e => setProfile({...profile, twitter: e.target.value }) }
                                    />
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="form-group focused">
                                    <label className="form-control-label" htmlFor="input-facebook">Facebook</label>
                                    <input type="text" id="input-facebook" className="form-control form-control-alternative" placeholder="Enter Facebook ID" 
                                        value={ profile.facebook || '' }   onChange={ e => setProfile({...profile, facebook: e.target.value }) }
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <br></br>
                    <button className="btn btn-1 text-white" type="submit">Submit</button>
                    <button className="btn btn-2 text-black" type="button" >Go back</button>
                </form>
                </div>
            </div>
        </div>
        </Router>
    )
}

export default AddProfile;