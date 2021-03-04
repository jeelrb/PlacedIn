import React, { useState } from 'react' 
import { Redirect } from 'react-router-dom'
import DisplayError from './DisplayError'
import axios from 'axios'

function Signup({ onAuthenticated }) {

    const [ data, setData ] = useState({
        name: '',
        username: '',
        email: '',
        password1: '',
        password2: ''
    })

    const [ errors, setErrors ] = useState([])

    const [ isAuthenticated, setIsAuthenticated ] = useState(false) 

    const [ isLoading, setIsLoading ] = useState(true)

    const { name, username, email, password1, password2 } = data

    const onSubmit = async (e) => {
        e.preventDefault()
        if(password1 !== password2) {
            setErrors([{msg: 'Passwords do not match'}])
        } else {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const body = { name, username, email, password: password1 }

            try {

                const res = await axios.post('http://localhost:5000/register', body, config)
                console.log(res)
                localStorage.setItem('token',res.data.token)
                setIsAuthenticated(true)
                setIsLoading(false)
                onAuthenticated(res.data.token, true, false)

            } catch ( error ) {

                localStorage.removeItem('token')
                setErrors(error.response.data.errors)
                console.log(error.response.data.errors)
                setIsAuthenticated(false)
                setIsLoading(true)
                onAuthenticated('', false, true)

            }

        }
    }

    if(isAuthenticated) {
        return <Redirect to='/dashboard' />
    }

    return (
        <div className="form">
            <ul className="tab-group">
                <li className="tab"><a href="/">Log In</a></li>
                <li className="tab active"><a href="/signup">Sign Up</a></li>
            </ul>
            { errors.length!==0 && errors.map((error) => <DisplayError error={error.msg}/>) }
            <div className="tab-content">
                <div id="signup">   
                    <h1>Sign Up for Free</h1>
                    <form  onSubmit={(e) => onSubmit(e)}>
                        <div className="top-row">
                            <div className="field-wrap">
                                <input 
                                    type="text" 
                                    value={name}
                                    onChange={(e) => setData({ ...data, name: e.target.value })}
                                    required 
                                    autocomplete="off" 
                                />
                                <label>
                                    Name<span class="req">*</span>
                                </label>
                            </div>
                            <div className="field-wrap">
                                <input 
                                    type="text"
                                    value={username}
                                    onChange={(e) => setData({ ...data, username: e.target.value })}
                                    required 
                                    autocomplete="off"    
                                />
                                <label>
                                    User Name<span className="req">*</span>
                                </label>
                            </div>
                        </div>
                        <div className="field-wrap">
                            <input 
                                type="email"
                                value={email}
                                onChange={(e) => setData({ ...data, email: e.target.value })}
                                required 
                                autocomplete="off"
                            />
                            <label>
                                Email Address<span className="req">*</span>
                            </label>
                        </div>
                    
                        <div className="field-wrap">
                            <input 
                                type="password"
                                value={password1}
                                onChange={(e) => setData({ ...data, password1: e.target.value })}
                                required 
                                autocomplete="off"
                            />
                            <label>
                                Enter Password<span className="req">*</span>
                            </label>
                        </div>

                        <div className="field-wrap">
                            <input 
                                type="password"
                                value={password2}
                                onChange={(e) => setData({ ...data, password2: e.target.value })}
                                required 
                                autocomplete="off"
                            />
                            <label>
                                Confirm Password<span className="req">*</span>
                            </label>
                        </div>
                        <button type="submit" className="button button-block">Get Started</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup;