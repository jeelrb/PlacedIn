import React, { useState, useEffect } from 'react'
import { Redirect, Link } from 'react-router-dom'
import DisplayError from './DisplayError'
import axios from 'axios'

function Login({ onAuthenticated }) {

    const [ data, setData ] = useState({
        username: '',
        password: ''
    })

    const [ errors, setErrors ] = useState([])

    const [ isAuthenticated, setIsAuthenticated ] = useState(false)

    const [ isLoading, setIsLoading ] = useState(true)

    const { username, password } = data


    const onSubmit = async (e) => {

        e.preventDefault()
        
        // console.log(data)

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const body = { username, password }

        try {

            const res = await axios.post('/', body, config)
            // console.log(res)
            localStorage.setItem('token',res.data.token)
            setIsAuthenticated(true)
            setIsLoading(false)
            onAuthenticated(username, res.data.token, true, false)
            
        } catch ( error ) {

            localStorage.removeItem('token')
            setErrors(error.response.data.errors)
            console.log(error.response.data.errors)
            setIsAuthenticated(false)
            setIsLoading(true)
            onAuthenticated('', '', false, true)

        }

    }

    useEffect(() => {
        if(localStorage.getItem('token')){
            localStorage.removeItem('token') 
        }
        if(localStorage.getItem('user')){
            localStorage.removeItem('user')
        }
        return  () => {
            setIsLoading(!isLoading)
        }
        
    }, [] )

    if(isAuthenticated) {
        return <Redirect to='/dashboard' />
    }

    return (
        <div className="form mt-5">
            <ul className="tab-group">
                <li className="tab active"><a href="/">Log In</a></li>
                <li className="tab"><a href="/signup">Sign Up</a></li>
            </ul>
            { errors.length!==0 && errors.map((error) => <DisplayError error={error.msg}/>) }
            <div className="tab-content">
                <div id="login">   
                    <h1>Welcome Back!</h1>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className="field-wrap">
                            <input 
                                type="text"  
                                value={username}
                                onChange={(e) => setData({ ...data, username: e.target.value })}
                                required 
                                autoComplete="off"                               
                            />
                            <label>
                                Username<span className="req">*</span>
                            </label>
                        </div>
                        <div className="field-wrap">
                            <input 
                                type="password"  
                                value={password}
                                onChange={(e) => setData({ ...data, password: e.target.value })}
                                required 
                                autoComplete="off"                              
                            />
                            <label>
                                Password<span className="req">*</span>
                            </label>
                        </div>
                        <p className="forgot"><Link to='/forgot-password'>Forgot Password?</Link></p>
                        <button type="submit" className="button button-block">Log In</button>                
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
