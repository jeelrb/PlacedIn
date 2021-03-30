import React, { useState, useEffect } from "react";
import axios from 'axios'
import Navbar from './Navbar';
import DisplayError from './DisplayError'
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

toast.configure()
function AddProfile(){
    
    // State as object containing form fields
    const [ profile, setProfile ] = useState({
        skills: '',
        company: '',
        portfolio: '',
        avatar: '',
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
                const { education, skills, company, portfolio,
                linkedIn, instagram, facebook, twitter, cfUserName, ccUserName, githubUserName, avatar } = userProfile.data
                const { college, branch, batch, degree } = education[0]
                
                console.log(avatar)
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
                college, degree, branch, batch, cfUserName, ccUserName, githubUserName, avatar  })

            } catch (error) {
                console.log(error)
            }

        }

        FetchData()

    }, [])


    //Async function to store / update user profile on submitting the form
    const onSubmit = async (e) => {

        e.preventDefault()

        setErrors({ cfUserNameError: '', ccUserNameError: '', githubUserNameError: '' })

        let cfUserNameError='', ccUserNameError='', githubUserNameError=''
        let res1, res2, res3, res5;

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
        const { portfolio, linkedIn, facebook, instagram, twitter, skills, company, avatar, cfUserName, ccUserName, githubUserName } = profile
        const { college, branch, batch, degree } = profile

        //Body of the post request 
        const profileInfo = { portfolio, linkedIn, facebook, instagram, twitter, skills, company, avatar, cfUserName, ccUserName, githubUserName }
        
        const formData = new FormData()
        formData.append('portfolio',profileInfo.portfolio || '')
        formData.append('linkedIn',profileInfo.linkedIn || '')
        formData.append('facebook',profileInfo.facebook || '')
        formData.append('instagram',profileInfo.instagram || '')
        formData.append('twitter',profileInfo.twitter || '') 
        formData.append('skills',profileInfo.skills || '')
        formData.append('company',profileInfo.company || '')
        formData.append('avatar',profileInfo.avatar || '')
        formData.append('cfUserName',profileInfo.cfUserName || '')
        formData.append('ccUserName',profileInfo.ccUserName || '')
        formData.append('githubUserName',profileInfo.githubUserName || '')

        const eduInfo = { college, branch, batch, degree }


        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                }
            }

            
            //Sending post requests to our REST api to store / update user profile
            res1 = await axios.post('http://localhost:5000/profile', formData, config)
            res5 = await axios.put('http://localhost:5000/profile/education', eduInfo, config)

            //If no error occured then change isSubmit to true
            setIsSubmited(true)

            toast.success('Profile Updated !!', { 
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000
             })

        } catch (error) {
            console.log(error.response.data)
        }
        
    }

    // If form submitted successfully then redirect to dashboard
    if(isSubmited) {
        return <Redirect to='/dashboard' />
    }

    return (
        <>
            <Navbar />
                <div className="container mt-4 mb-5">
                <div className="card shadow">
                    <div className="card-header border-0  cyan darken-3 lighten-1">
                        <div className="row">
                            <div className="col-12 text-center">
                                <h4 className="mb-0 text-white font-weight-bold profileForm_header">Profile Settings</h4>
                            </div>
                        </div>
                    </div>
                <div className="card-body">
                <form className="needs-validation" onSubmit={ e => onSubmit(e) } encType='multipart/form-data'>
                <hr className="hr-text-form mt-5 mb-3" data-content="Educational and Professional Details"></hr>
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
                    
                    <hr className="hr-text-form mt-5 mb-3" data-content="Skills"></hr>
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
                    <hr className="hr-text-form mt-5 mb-4" data-content="Coding Platform Information"></hr>
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
                    <hr className="hr-text-form mt-5 mb-3" data-content="Social Information"></hr>
                    <div className="pl-lg-4">
                        <div className="row">
                            <div className="col-lg-12 mb-3">
                            <div className="form-group focused">
                                <label className="form-control-label mr-3" htmlFor="input-profile-photo">Upload profile photo</label>
                                <input 
                                    type="file" 
                                    accept=".png, .jpg, .jpeg"
                                    name="photo"
                                    className="form-control-file"
                                    onChange={ e => setProfile({...profile, avatar: e.target.files[0] }) }
                                />
                            </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="form-group focused">
                                    <label className="form-control-label" htmlFor="input-website">Portfolio / Resume Link</label>
                                    <input type="text" id="input-website" className="form-control form-control-alternative" placeholder="Enter link here" 
                                     value={ profile.portfolio || '' }   onChange={ e => setProfile({...profile, portfolio: e.target.value }) } />
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="form-group focused">
                                    <label className="form-control-label" htmlFor="input-linkedin">Linkedin</label>
                                    <input type="text" id="input-linkedin" className="form-control form-control-alternative" placeholder="Enter Linkedin profile link" 
                                        value={ profile.linkedIn || '' }   onChange={ e => setProfile({...profile, linkedIn: e.target.value }) }
                                    />
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="form-group">
                                    <label className="form-control-label" htmlFor="input-insta">Instagram</label>
                                    <input type="text" id="input-insta" className="form-control form-control-alternative" placeholder="Enter Instagram profile link" 
                                        value={ profile.instagram || '' }   onChange={ e => setProfile({...profile, instagram: e.target.value }) }
                                    />
                                </div>
                            </div>
                            
                            <div className="col-lg-6">
                                <div className="form-group focused">
                                    <label className="form-control-label" htmlFor="input-twitter">Twitter</label>
                                    <input type="text" id="input-twitter" className="form-control form-control-alternative" placeholder="Enter Twitter profile link" 
                                        value={ profile.twitter || '' }   onChange={ e => setProfile({...profile, twitter: e.target.value }) }
                                    />
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="form-group focused">
                                    <label className="form-control-label" htmlFor="input-facebook">Facebook</label>
                                    <input type="text" id="input-facebook" className="form-control form-control-alternative" placeholder="Enter Facebook profile link" 
                                        value={ profile.facebook || '' }   onChange={ e => setProfile({...profile, facebook: e.target.value }) }
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <br></br>
                    <div className="text-center">
                    <button className="btn cyan darken-3 btn-1 text-white w-75 mt-5 mb-5 font-weight-bold" type="submit">Update Profile</button>
                    </div>
                </form>
                </div>
            </div>
        </div>
        </>
    )
}

export default AddProfile;